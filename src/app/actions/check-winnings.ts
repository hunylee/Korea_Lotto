'use server';

import fs from 'fs';
import path from 'path';

export async function checkPastWinnings(games: number[][]) {
    try {
        // Read directly from the JSON file to avoid Vercel Prisma SQLite serverless issues
        const jsonPath = path.join(process.cwd(), 'src/data/lotto-history.json');
        const fileData = fs.readFileSync(jsonPath, 'utf8');
        const history = JSON.parse(fileData);

        // Evaluate each generated game
        const results = games.map(game => {
            // Store the round numbers where the game won
            const rank1: number[] = [];
            const rank2: number[] = [];
            const rank3: number[] = [];
            const rank4: number[] = [];
            const rank5: number[] = [];

            for (const round of history) {
                const winningNumbers = [
                    round.drwtNo1, round.drwtNo2, round.drwtNo3,
                    round.drwtNo4, round.drwtNo5, round.drwtNo6
                ];
                const bonusNumber = round.bnusNo;

                let matchCount = 0;
                for (const num of game) {
                    if (winningNumbers.includes(num)) {
                        matchCount++;
                    }
                }

                if (matchCount === 6) {
                    rank1.push(round.drwNo);
                } else if (matchCount === 5 && game.includes(bonusNumber)) {
                    rank2.push(round.drwNo);
                } else if (matchCount === 5) {
                    rank3.push(round.drwNo);
                } else if (matchCount === 4) {
                    rank4.push(round.drwNo);
                } else if (matchCount === 3) {
                    rank5.push(round.drwNo);
                }
            }

            return { rank1, rank2, rank3, rank4, rank5 };
        });

        return results;
    } catch (error) {
        console.error("Error checking past winnings:", error);
        throw new Error("Failed to check past winnings");
    }
}
