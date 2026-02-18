
"use client";

import { useState } from "react";
import { LottoBall } from "@/components/lotto-ball";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dna, RefreshCw, Zap } from "lucide-react";

export default function GeneratePage() {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const generateNumbers = (strategy: 'random' | 'weighted') => {
        setIsLoading(true);
        // Simulate complex calculation
        setTimeout(() => {
            const newNumbers = new Set<number>();
            while (newNumbers.size < 6) {
                newNumbers.add(Math.floor(Math.random() * 45) + 1);
            }
            setNumbers(Array.from(newNumbers).sort((a, b) => a - b));
            setIsLoading(false);
        }, 800);
    };

    return (
        <main className="min-h-screen bg-background text-foreground py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">로또 번호 생성기</h1>
                    <p className="text-muted-foreground">AI 알고리즘으로 당신의 당첨 번호를 예측해보세요.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => generateNumbers('random')}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><RefreshCw className="text-blue-500" /> 랜덤 셔플</CardTitle>
                            <CardDescription>실제 추첨기와 동일한 완전 무작위 생성.</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => generateNumbers('weighted')}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Zap className="text-yellow-500" /> 가중치 분석 (AI)</CardTitle>
                            <CardDescription>역대 당첨 빈도와 패턴을 분석하여 생성.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                <div className="flex justify-center min-h-[120px] items-center">
                    {isLoading ? (
                        <div className="animate-pulse flex gap-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="w-16 h-16 rounded-full bg-muted"></div>
                            ))}
                        </div>
                    ) : numbers.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-4 animate-in fade-in zoom-in duration-500">
                            {numbers.map(n => (
                                <LottoBall key={n} number={n} size="lg" />
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">원하는 생성 방식을 선택하세요.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
