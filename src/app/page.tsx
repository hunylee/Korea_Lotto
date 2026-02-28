
import { getLatestRound, getLottoHistory, getNextDrawInfo } from "@/lib/data-service";
import { LottoBall } from "@/components/lotto-ball";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Dna, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getFrequencyMap, getHotColdNumbers } from "@/lib/statistics";

export default async function Home() {
  const latestRound = await getLatestRound();
  const history = await getLottoHistory();
  const nextDraw = getNextDrawInfo();

  // Quick Stats
  const hotCold = getHotColdNumbers(history);

  if (!latestRound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p>No data available. Please run the mock data generator.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-slate-900 to-background border-b border-border">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              데이터로 승리하다
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              대한민국 로또 6/45의 {latestRound.drwNo}회 역사적 데이터를 기반으로 한 정밀 분석 및 예측 플랫폼.
            </p>
          </div>

          <Card className="w-full max-w-3xl bg-card/50 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardHeader>
              <CardDescription className="uppercase tracking-widest font-semibold text-primary">
                최신 회차 • {latestRound.drwNo}회 ({latestRound.drwNoDate})
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-8">
              <div className="flex flex-wrap justify-center gap-4">
                <LottoBall number={latestRound.drwtNo1} size="lg" />
                <LottoBall number={latestRound.drwtNo2} size="lg" />
                <LottoBall number={latestRound.drwtNo3} size="lg" />
                <LottoBall number={latestRound.drwtNo4} size="lg" />
                <LottoBall number={latestRound.drwtNo5} size="lg" />
                <LottoBall number={latestRound.drwtNo6} size="lg" />
                <div className="w-16 h-16 flex items-center justify-center text-2xl font-light text-muted-foreground">+</div>
                <LottoBall number={latestRound.bnusNo} size="lg" className="opacity-90" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg text-center">
                <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                  <span className="text-sm font-medium text-muted-foreground">1등 당첨금 ({latestRound.firstPrzwnerCo}명)</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {(latestRound.firstWinamnt || 0).toLocaleString('ko-KR')}원
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                  <span className="text-sm font-medium text-muted-foreground">2등 당첨금</span>
                  <a
                    href={`https://www.dhlottery.co.kr/gameResult.do?method=byWin&drwNo=${latestRound.drwNo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-500 hover:underline flex items-center justify-center gap-1 mt-1"
                  >
                    홈페이지에서 확인 <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                총 판매금액: {(latestRound.totSellamnt || 0).toLocaleString('ko-KR')}원
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button size="lg" className="h-12 px-8 text-md font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20" asChild>
              <Link href="/generate">
                <Dna className="mr-2 h-5 w-5" /> 번호 생성하기
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-md font-semibold border-slate-700 hover:bg-slate-800" asChild>
              <Link href="/analytics">
                <BarChart2 className="mr-2 h-5 w-5" /> 상세 분석 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Insights Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8">데이터 하이라이트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Hot Numbers */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-red-500">🔥</span> 자주 나오는 번호 (Hot)
                <span className="text-xs font-normal text-muted-foreground ml-auto">최근 20회 기준</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mt-2">
                {hotCold.hot.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <LottoBall number={item.number} size="sm" />
                    <span className="text-xs font-mono text-muted-foreground">{item.count}x</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cold Numbers */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-blue-500">❄️</span> 안 나오는 번호 (Cold)
                <span className="text-xs font-normal text-muted-foreground ml-auto">최근 20회 기준</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mt-2">
                {hotCold.cold.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <LottoBall number={item.number} size="sm" />
                    <span className="text-xs font-mono text-muted-foreground">{item.count}x</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Draw Info (Static/Calculated) */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-green-500" /> 다음 회차 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center mt-2">
                <span className="text-muted-foreground">회차 ({nextDraw.drwDate})</span>
                <span className="font-bold text-xl">{nextDraw.drwNo}회</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">1등 당첨 확률</span>
                <span className="font-mono text-green-400">1 / 8,145,060</span>
              </div>
              <Button className="w-full mt-2" variant="secondary" asChild>
                <Link href="/generate">이번 주 번호 생성하기</Link>
              </Button>
            </CardContent>
          </Card>

        </div>
      </section>
    </main>
  );
}
