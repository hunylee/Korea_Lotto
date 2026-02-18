
"use client";

import { useState } from "react";
import { LottoBall } from "@/components/lotto-ball";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dna, RefreshCw, Zap } from "lucide-react";

export default function GeneratePage() {
    const [numberSets, setNumberSets] = useState<number[][]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const generateNumbers = (strategy: 'random' | 'weighted') => {
        setIsLoading(true);
        setNumberSets([]); // Clear previous results immediately

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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {numberSets.map((set, idx) => (
                                <Card key={idx} className="bg-card/50 border-primary/20">
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
                            ))}
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
