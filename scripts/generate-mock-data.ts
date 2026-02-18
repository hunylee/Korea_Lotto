
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const FILE_PATH = path.join(DATA_DIR, 'lotto-history.json');
const LAST_ROUND = 1202;

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLottoNumbers() {
    const numbers = new Set<number>();
    while (numbers.size < 7) {
        numbers.add(getRandomInt(1, 45));
    }
    const sorted = Array.from(numbers).sort((a, b) => a - b);
    const bonus = sorted.pop(); // Take one out as bonus (strictly speaking bonus is drawn separately but this is fine for mock)
    // Actually bonus is drawn from remaining balls. 
    // Let's do: 6 main numbers + 1 bonus.

    const main = new Set<number>();
    while (main.size < 6) {
        main.add(getRandomInt(1, 45));
    }
    const mainArr = Array.from(main).sort((a, b) => a - b);

    let bonusNum = getRandomInt(1, 45);
    while (main.has(bonusNum)) {
        bonusNum = getRandomInt(1, 45);
    }

    return { main: mainArr, bonus: bonusNum };
}

function generateMockData() {
    const data = [];
    let currentDate = new Date('2002-12-07'); // Date of 1st round

    for (let i = 1; i <= LAST_ROUND; i++) {
        const { main, bonus } = generateLottoNumbers();

        data.push({
            drwNo: i,
            drwNoDate: currentDate.toISOString().split('T')[0],
            totSellamnt: getRandomInt(50000000000, 100000000000),
            firstWinamnt: getRandomInt(1000000000, 3000000000),
            firstPrzwnerCo: getRandomInt(5, 15),
            drwtNo1: main[0],
            drwtNo2: main[1],
            drwtNo3: main[2],
            drwtNo4: main[3],
            drwtNo5: main[4],
            drwtNo6: main[5],
            bnusNo: bonus,
            returnValue: 'success'
        });

        // Add 7 days
        currentDate.setDate(currentDate.getDate() + 7);
    }

    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    console.log(`Generated ${data.length} mock records.`);
}

generateMockData();
