
import fs from 'fs';
import path from 'path';

// Define types based on our data structure
export interface LottoRound {
    drwNo: number;
    drwNoDate: string;
    totSellamnt: number;
    firstWinamnt: number;
    firstPrzwnerCo: number;
    drwtNo1: number;
    drwtNo2: number;
    drwtNo3: number;
    drwtNo4: number;
    drwtNo5: number;
    drwtNo6: number;
    bnusNo: number;
    returnValue: string;
}

// Helper to get all numbers from a round (excluding bonus for main stats usually, but adjustable)
export function getRoundNumbers(round: LottoRound, includeBonus: boolean = false): number[] {
    const numbers = [
        round.drwtNo1,
        round.drwtNo2,
        round.drwtNo3,
        round.drwtNo4,
        round.drwtNo5,
        round.drwtNo6,
    ];
    if (includeBonus) {
        numbers.push(round.bnusNo);
    }
    return numbers;
}

// 1. Frequency Analysis
export function getFrequencyMap(data: LottoRound[], limit: number = 0): Record<number, number> {
    const dataset = limit > 0 ? data.slice(-limit) : data;
    const frequency: Record<number, number> = {};

    // Initialize
    for (let i = 1; i <= 45; i++) frequency[i] = 0;

    dataset.forEach(round => {
        const numbers = getRoundNumbers(round);
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });
    });

    return frequency;
}

// 2. Odd/Even Ratio
export function getOddEvenAnalysis(data: LottoRound[], limit: number = 50) {
    const dataset = limit > 0 ? data.slice(-limit) : data;

    return dataset.map(round => {
        const numbers = getRoundNumbers(round);
        const oddCount = numbers.filter(n => n % 2 !== 0).length;
        const evenCount = numbers.length - oddCount;
        return {
            drwNo: round.drwNo,
            odd: oddCount,
            even: evenCount,
            ratio: `${oddCount}:${evenCount}`
        };
    });
}

// 3. Sum Distribution
export function getSumDistribution(data: LottoRound[], limit: number = 50) {
    const dataset = limit > 0 ? data.slice(-limit) : data;

    return dataset.map(round => {
        const numbers = getRoundNumbers(round);
        const sum = numbers.reduce((a, b) => a + b, 0);
        return {
            drwNo: round.drwNo,
            sum
        };
    });
}

// 4. Hot & Cold Numbers (Top 5 / Bottom 5 over last N rounds)
export function getHotColdNumbers(data: LottoRound[], limit: number = 20) {
    const freq = getFrequencyMap(data, limit);
    const sorted = Object.entries(freq)
        .map(([num, count]) => ({ number: parseInt(num), count }))
        .sort((a, b) => b.count - a.count);

    return {
        hot: sorted.slice(0, 5),
        cold: sorted.slice(-5).reverse(), // Least frequent
    };
}
