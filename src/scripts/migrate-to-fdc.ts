import fs from 'fs';
import path from 'path';
import { upsertLottoRound } from '../lib/dataconnect';
import { initializeApp, getApps } from 'firebase/app';
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';

// Initialize Firebase if not already
const firebaseConfig = {
    projectId: "korealotto-db", // placeholder, Data Connect emulator doesn't strictly need accurate config if local
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// In a real app we might connect to local emulator for the migration first
// connectDataConnectEmulator(getDataConnect(app, { location: "us-east4", serviceId: "korealotto" }), '127.0.0.1', 9399);

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'lotto-history.json');

async function migrateData() {
    try {
        const fileContents = await fs.promises.readFile(DATA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContents);
        console.log(`Found ${data.length} records to migrate.`);

        for (const record of data) {
            console.log(`Migrating round ${record.drwNo}...`);
            await upsertLottoRound({
                drwNo: record.drwNo,
                drwNoDate: record.drwNoDate,
                totSellamnt: Number(record.totSellamnt),
                firstWinamnt: Number(record.firstWinamnt),
                firstPrzwnerCo: Number(record.firstPrzwnerCo),
                drwtNo1: Number(record.drwtNo1),
                drwtNo2: Number(record.drwtNo2),
                drwtNo3: Number(record.drwtNo3),
                drwtNo4: Number(record.drwtNo4),
                drwtNo5: Number(record.drwtNo5),
                drwtNo6: Number(record.drwtNo6),
                bnusNo: Number(record.bnusNo),
                returnValue: record.returnValue || 'success',
            });
        }
        console.log("Migration completed.");
    } catch (error) {
        console.error("Migration failed:", error);
    }
}

migrateData();
