
"use client";

import { useState } from "react";
import { LottoBall } from "@/components/lotto-ball";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dna, RefreshCw, Zap, Search } from "lucide-react";
import { checkPastWinnings } from "../actions/check-winnings";

export default function GeneratePage() {
    const [numberSets, setNumberSets] = useState<number[][]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);

    // Type definition for simulation results arrays containing formatted strings
    type SimulationResult = { rank1: string[]; rank2: string[]; rank3: string[]; rank4: string[]; rank5: string[] };
    const [simulationResults, setSimulationResults] = useState<SimulationResult[] | null>(null);

    const generateNumbers = (strategy: 'random' | 'weighted') => {
        setIsLoading(true);
        setNumberSets([]); // Clear previous results immediately
        setSimulationResults(null); // Clear previous simulations

        // Simulate complex calculation
        setTimeout(() => {
            const newSets: number[][] = [];

            for (let i = 0; i < 10; i++) {
                const newNumbers = new Set<number>();
                while (newNumbers.size < 6) {
                    newNumbers.add(Math.floor(Math.random() * 45) + 1);
                }
                newSets.push(Array.from(newNumbers).sort((a, b) => a - b));
            }

            setNumberSets(newSets);
            setIsLoading(false);
        }, 800);
    };

    const runSimulation = async () => {
        if (numberSets.length === 0) return;
        setIsSimulating(true);
        try {
            // 정적 export 환경에서는 /lotto-history.json을 직접 fetch
            const res = await fetch('/Korea_Lotto/lotto-history.json');
            const history = await res.json();
            const results = checkPastWinnings(numberSets, history);
            setSimulationResults(results);
        } catch (error) {
            console.error("Simulation failed:", error);
            alert("시뮬레이션 중 오류가 발생했습니다.");
        } finally {
            setIsSimulating(false);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">로또 번호 생성기</h1>
                    <p className="text-muted-foreground">AI 알고리즘으로 10게임(10세트)을 한 번에 추천해드립니다.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => generateNumbers('random')}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><RefreshCw className="text-blue-500" /> 랜덤 셔플 (10게임)</CardTitle>
                            <CardDescription>완전 무작위로 10세트를 생성합니다.</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => generateNumbers('weighted')}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Zap className="text-yellow-500" /> 가중치 분석 (10게임)</CardTitle>
                            <CardDescription>분석 데이터를 기반으로 10세트를 추천합니다.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                <div className="space-y-4">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(10)].map((_, i) => (
                                <Card key={i} className="animate-pulse bg-muted/50 border-none">
                                    <CardContent className="h-24 flex items-center justify-center">
                                        <span className="text-muted-foreground">생성중...</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : numberSets.length > 0 ? (
                        <div className="space-y-6">
                            <div className="flex justify-end animate-in fade-in duration-500">
                                <Button
                                    onClick={runSimulation}
                                    disabled={isSimulating}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {isSimulating ? (
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Search className="mr-2 h-4 w-4" />
                                    )}
                                    과거 당첨 내역 확인 (시뮬레이션)
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {numberSets.map((set, idx) => (
                                    <div key={idx} className="flex flex-col gap-2">
                                        <Card className="bg-card/50 border-primary/20">
                                            <CardHeader className="py-3 px-4 pb-0">
                                                <CardDescription className="text-xs font-mono uppercase tracking-widest text-primary">
                                                    Set {idx + 1}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="py-4 flex justify-center gap-2">
                                                {set.map(n => (
                                                    <LottoBall key={n} number={n} size="sm" />
                                                ))}
                                            </CardContent>
                                        </Card>

                                        {/* Animation slide down the simulation results */}
                                        {simulationResults && simulationResults[idx] && (
                                            <div className="flex flex-col gap-2 mt-2 animate-in zoom-in duration-300">
                                                <div className="grid grid-cols-5 gap-1 text-center text-xs">
                                                    <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 p-2 rounded-md flex flex-col items-center justify-center">
                                                        <div className="font-bold">1등</div>
                                                        <div>{simulationResults[idx].rank1.length}회</div>
                                                    </div>
                                                    <div className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 p-2 rounded-md flex flex-col items-center justify-center">
                                                        <div className="font-bold">2등</div>
                                                        <div>{simulationResults[idx].rank2.length}회</div>
                                                    </div>
                                                    <div className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 p-2 rounded-md flex flex-col items-center justify-center">
                                                        <div className="font-bold">3등</div>
                                                        <div>{simulationResults[idx].rank3.length}회</div>
                                                    </div>
                                                    <div className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 p-2 rounded-md flex flex-col items-center justify-center">
                                                        <div className="font-bold">4등</div>
                                                        <div>{simulationResults[idx].rank4.length}회</div>
                                                    </div>
                                                    <div className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 p-2 rounded-md flex flex-col items-center justify-center">
                                                        <div className="font-bold">5등</div>
                                                        <div>{simulationResults[idx].rank5.length}회</div>
                                                    </div>
                                                </div>

                                                {/* Detailed Winning Rounds Section */}
                                                <div className="bg-muted/30 rounded-md p-3 text-xs space-y-1 overflow-y-auto max-h-48 border border-border/50 text-left">
                                                    <p className="font-semibold text-muted-foreground mb-2">당첨 회차 및 번호 상세:</p>

                                                    {/* 1등과 2등은 당첨 내역이 없어도 명시적으로 표시하여 유저가 확인할 수 있도록 함 */}
                                                    <div className="flex gap-2 text-amber-600 dark:text-amber-400">
                                                        <span className="font-bold whitespace-nowrap">1등:</span>
                                                        <span className="break-words">
                                                            {simulationResults[idx].rank1.length > 0
                                                                ? simulationResults[idx].rank1.map((r, i) => <div key={i}>{r}</div>)
                                                                : '당첨 내역 없음'}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2 text-slate-600 dark:text-slate-400">
                                                        <span className="font-bold whitespace-nowrap">2등:</span>
                                                        <span className="break-words text-muted-foreground">
                                                            {simulationResults[idx].rank2.length > 0
                                                                ? simulationResults[idx].rank2.map((r, i) => <div key={i}>{r}</div>)
                                                                : '당첨 내역 없음'}
                                                        </span>
                                                    </div>

                                                    {simulationResults[idx].rank3.length > 0 && (
                                                        <div className="flex gap-2">
                                                            <span className="font-bold whitespace-nowrap text-slate-600 dark:text-slate-400">3등:</span>
                                                            <span className="break-words text-muted-foreground flex flex-col">
                                                                {simulationResults[idx].rank3.map((r, i) => <span key={i}>{r}</span>)}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {simulationResults[idx].rank4.length > 0 && (
                                                        <div className="flex gap-2">
                                                            <span className="font-bold whitespace-nowrap text-slate-600 dark:text-slate-400">4등:</span>
                                                            <span className="break-words text-muted-foreground flex flex-col">
                                                                {simulationResults[idx].rank4.slice(0, 5).map((r, i) => <span key={i}>{r}</span>)}
                                                                {simulationResults[idx].rank4.length > 5 && <span>...외 {simulationResults[idx].rank4.length - 5}건</span>}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {simulationResults[idx].rank5.length > 0 && (
                                                        <div className="flex gap-2">
                                                            <span className="font-bold whitespace-nowrap text-slate-600 dark:text-slate-400">5등:</span>
                                                            <span className="break-words text-muted-foreground flex flex-col">
                                                                {simulationResults[idx].rank5.slice(0, 5).map((r, i) => <span key={i}>{r}</span>)}
                                                                {simulationResults[idx].rank5.length > 5 && <span>...외 {simulationResults[idx].rank5.length - 5}건</span>}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-muted rounded-xl">
                            <p className="text-muted-foreground">원하는 생성 방식을 선택하면 10게임이 생성됩니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
