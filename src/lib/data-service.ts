
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

    // 2. Try to fetch the live data for this round from dhlottery API
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

export function calculateCurrentRound(): number {
    const startDate = new Date('2002-12-07T20:45:00+09:00'); // 1회차 추첨일
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    const weeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
    return weeks + 1;
}

async function fetchLottoData(drwNo: number): Promise<LottoRound | null> {
    const API_URL = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(API_URL, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API response status: ${response.status}`);
        }

        const text = await response.text();

        // API가 HTML을 반환하면 차단된 것
        if (text.trim().startsWith('<')) {
            console.warn(`API returned HTML instead of JSON. Likely blocked.`);
            return null;
        }

        const data = JSON.parse(text);

        if (data && data.returnValue === 'success') {
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
    const startDate = new Date('2002-12-07T20:45:00+09:00');
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
