
import fs from 'fs';
import path from 'path';
import { LottoRound } from './statistics';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'lotto-history.json');

export async function getLottoHistory(): Promise<LottoRound[]> {
    try {
        const fileContents = await fs.promises.readFile(DATA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContents);
        return data;
    } catch (error) {
        console.error("Failed to load lotto history:", error);
        return [];
    }
}


export async function getLatestRound(): Promise<LottoRound | null> {
    // 1. Calculate the expected latest round based on the current date
    const calculatedRound = calculateCurrentRound();

    // 2. Try to fetch the live data for this round
    try {
        const liveData = await fetchLottoData(calculatedRound);
        if (liveData) {
            return liveData;
        }
    } catch (e) {
        console.warn(`Failed to fetch live data for round ${calculatedRound}, falling back to local history.`);
    }

    // 3. Fallback to local history
    const history = await getLottoHistory();
    return history.length > 0 ? history[history.length - 1] : null;
}

function calculateCurrentRound(): number {
    const startDate = new Date('2002-12-07T20:00:00+09:00'); // 1st draw date
    const now = new Date();

    // Adjust to KST if running in a different timezone, though relying on system time is usually enough for simple logic
    // A week is 604800000 ms
    const diff = now.getTime() - startDate.getTime();
    const weeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));

    // The result is 1-based index (1st draw is index 0 in time diff, but round 1)
    // Wait, if 0 weeks passed, it's round 1.
    return weeks + 1;
}

async function fetchLottoData(drwNo: number): Promise<LottoRound | null> {
    const API_URL = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;

    try {
        // Set a timeout to avoid hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(API_URL, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API response status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.returnValue === 'success') {
            // Validate that the data structure matches LottoRound
            // The API returns strings for numbers sometimes, so we might need to parse.
            // Based on sample data in history, they are numbers.
            return {
                drwNo: data.drwNo,
                drwNoDate: data.drwNoDate,
                totSellamnt: data.totSellamnt,
                firstWinamnt: data.firstWinamnt,
                firstPrzwnerCo: data.firstPrzwnerCo,
                drwtNo1: data.drwtNo1,
                drwtNo2: data.drwtNo2,
                drwtNo3: data.drwtNo3,
                drwtNo4: data.drwtNo4,
                drwtNo5: data.drwtNo5,
                drwtNo6: data.drwtNo6,
                bnusNo: data.bnusNo,
                returnValue: data.returnValue,
            } as LottoRound;
        }
    } catch (error) {
        console.error("Error fetching external lotto data:", error);
    }
    return null;
}
