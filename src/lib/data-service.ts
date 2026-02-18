
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
    const history = await getLottoHistory();
    return history.length > 0 ? history[history.length - 1] : null;
}
