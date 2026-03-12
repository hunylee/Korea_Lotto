
import { LottoRound } from '@/lib/statistics';

export interface WinningCheckResult {
    rank1: string[];
    rank2: string[];
    rank3: string[];
    rank4: string[];
    rank5: string[];
}

/**
 * 생성된 번호들이 과거 당첨 이력에서 몇 등이었는지 확인합니다.
 * 정적 export 환경에서는 history를 외부에서 주입합니다.
 */
export function checkPastWinnings(games: number[][], history: LottoRound[]): WinningCheckResult[] {
    return games.map(game => {
        const rank1: string[] = [];
        const rank2: string[] = [];
        const rank3: string[] = [];
        const rank4: string[] = [];
        const rank5: string[] = [];

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

            const matchString = `${round.drwNo}회 (${winningNumbers.join(', ')} + ${bonusNumber})`;

            if (matchCount === 6) {
                rank1.push(matchString);
            } else if (matchCount === 5 && game.includes(bonusNumber)) {
                rank2.push(matchString);
            } else if (matchCount === 5) {
                rank3.push(matchString);
            } else if (matchCount === 4) {
                rank4.push(matchString);
            } else if (matchCount === 3) {
                rank5.push(matchString);
            }
        }

        return { rank1, rank2, rank3, rank4, rank5 };
    });
}
