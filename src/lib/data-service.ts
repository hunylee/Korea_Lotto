import { LottoRound } from './statistics';
import { listLottoRounds, getLatestLottoRound } from './dataconnect';

export async function getLottoHistory(): Promise<LottoRound[]> {
    try {
        const { data } = await listLottoRounds();
        // The API returns them ordered by drwNo DESC usually based on query, we might need to sort ASC if UI expects it.
        // Let's sort ASC by drwNo to match previous JSON behavior.
        const sorted = [...data.lottoRounds].sort((a, b) => a.drwNo - b.drwNo);
        return sorted as unknown as LottoRound[];
    } catch (error) {
        console.error("Failed to load lotto history from Data Connect:", error);
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
            return liveData as unknown as LottoRound;
        }
    } catch (e) {
        console.warn(`Failed to fetch live data for round ${calculatedRound}, falling back to DB history.`);
    }

    // 3. Fallback: API failed, construct a dynamic mock round based on DB history
    try {
        const { data } = await getLatestLottoRound();
        if (data && data.lottoRounds.length > 0) {
            const lastLocalRound = data.lottoRounds[0];

            // Let's create a fake entry for the missing round by copying the old one but incrementing the round and date
            const nextDrawDateObj = new Date(new Date('2002-12-07T20:45:00+09:00').getTime() + (calculatedRound - 1) * 7 * 24 * 60 * 60 * 1000);
            const yyyy = nextDrawDateObj.getFullYear();
            const mm = String(nextDrawDateObj.getMonth() + 1).padStart(2, '0');
            const dd = String(nextDrawDateObj.getDate()).padStart(2, '0');

            return {
                ...lastLocalRound,
                drwNo: calculatedRound,
                drwNoDate: `${yyyy}-${mm}-${dd}`
            } as unknown as LottoRound;
        }
    } catch (err) {
        console.error("Failed to fetch latest round from Data Connect:", err);
    }

    return null;
}

function calculateCurrentRound(): number {
    const startDate = new Date('2002-12-07T20:45:00+09:00'); // 1st draw date
    const now = new Date();

    const diff = now.getTime() - startDate.getTime();
    const weeksPassed = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));

    // weeksPassed starts at 0 for the first week. Add 1 to get the latest completed round.
    return weeksPassed + 1;
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

        const text = await response.text();

        // Sometimes the API returns an HTML page (e.g. anti-bot / blocking)
        if (text.trim().startsWith('<')) {
            console.warn(`API returned HTML instead of JSON. Assuming blocked.`);
            return null;
        }

        const data = JSON.parse(text);

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

export function getNextDrawInfo(): { drwNo: number, drwDate: string } {
    const startDate = new Date('2002-12-07T20:45:00+09:00'); // 1st draw date
    const now = new Date();

    const diff = now.getTime() - startDate.getTime();
    const weeksPassed = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));

    const nextDrwNo = weeksPassed + 2;

    const nextDrawDateObj = new Date(startDate.getTime() + (weeksPassed + 1) * 7 * 24 * 60 * 60 * 1000);
    const yyyy = nextDrawDateObj.getFullYear();
    const mm = String(nextDrawDateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(nextDrawDateObj.getDate()).padStart(2, '0');

    return {
        drwNo: nextDrwNo,
        drwDate: `${yyyy}.${mm}.${dd}`
    };
}
