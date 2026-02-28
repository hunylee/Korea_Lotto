import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding (TS)...');
    const jsonPath = path.join(process.cwd(), 'src/data/lotto-history.json');
    const fileData = fs.readFileSync(jsonPath, 'utf8');
    const history = JSON.parse(fileData);

    for (const round of history) {
        await prisma.lottoRound.upsert({
            where: { drwNo: round.drwNo },
            update: {},
            create: {
                drwNo: round.drwNo,
                drwNoDate: round.drwNoDate,
                totSellamnt: BigInt(round.totSellamnt || 0),
                firstWinamnt: BigInt(round.firstWinamnt || 0),
                firstPrzwnerCo: round.firstPrzwnerCo,
                drwtNo1: round.drwtNo1,
                drwtNo2: round.drwtNo2,
                drwtNo3: round.drwtNo3,
                drwtNo4: round.drwtNo4,
                drwtNo5: round.drwtNo5,
                drwtNo6: round.drwtNo6,
                bnusNo: round.bnusNo,
                returnValue: round.returnValue,
            },
        });
    }
    console.log(`Seeded ${history.length} lotto rounds successfully.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
