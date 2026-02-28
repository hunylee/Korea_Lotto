'use server';

import { PrismaClient } from '@prisma/client';

// Prevent multiple instances in dev
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function checkPastWinnings(games: number[][]) {
    try {
        // Fetch all historical draws
        const history = await prisma.lottoRound.findMany();

        // Evaluate each generated game
        const results = games.map(game => {
            let rank1 = 0;
            let rank2 = 0;
            let rank3 = 0;
            let rank4 = 0;
            let rank5 = 0;

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
                    rank1++;
                } else if (matchCount === 5 && game.includes(bonusNumber)) {
                    rank2++;
                } else if (matchCount === 5) {
                    rank3++;
                } else if (matchCount === 4) {
                    rank4++;
                } else if (matchCount === 3) {
                    rank5++;
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
