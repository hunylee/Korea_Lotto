
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const FILE_PATH = path.join(DATA_DIR, 'lotto-history.json');
const LAST_ROUND = 1202; // Update this as needed or make it dynamic

async function fetchLottoData(round: number) {
    const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`;
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            }
        });

        if (!response.ok) {
            console.error(`Failed to fetch round ${round}: ${response.status} ${response.statusText}`);
            return null;
        }

        // The API returns JSON but sometimes with text/html content-type, or it might be actual HTML if blocked
        const text = await response.text();

        try {
            const data = JSON.parse(text);
            if (data.returnValue === 'fail') {
                console.warn(`Round ${round}: API returned fail`);
                return null;
            }
            return data;
        } catch (e) {
            console.error(`Round ${round}: Response was not JSON. Preview: ${text.substring(0, 50)}...`);
            return null;
        }

    } catch (error) {
        console.error(`Error fetching round ${round}:`, error);
        return null;
    }
}

async function main() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let existingData: any[] = [];
    if (fs.existsSync(FILE_PATH)) {
        existingData = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
        console.log(`Loaded ${existingData.length} existing records.`);
    }

    // Find gaps or just fetch all if missing
    // For now, let's fetch a small range to test, or fill up to LAST_ROUND
    // We can optimize to only fetch missing rounds later

    // Test range:
    // const start = 1200;
    // const end = 1202;

    // Full range:
    const start = 1;
    const end = LAST_ROUND;

    const results = [...existingData];
    const existingRounds = new Set(results.map((r: any) => r.drwNo));

    console.log(`Starting fetch from ${start} to ${end}...`);

    for (let i = start; i <= end; i++) {
        if (existingRounds.has(i)) {
            continue;
        }

        console.log(`Fetching round ${i}...`);
        const data = await fetchLottoData(i);

        if (data) {
            results.push(data);
        }

        // Sleep to be polite (100ms)
        await new Promise(r => setTimeout(r, 100));
    }

    // Sort by round number
    results.sort((a, b) => a.drwNo - b.drwNo);

    fs.writeFileSync(FILE_PATH, JSON.stringify(results, null, 2));
    console.log(`Saved ${results.length} rounds to ${FILE_PATH}`);
}

main().catch(console.error);
