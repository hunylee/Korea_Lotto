
import { getLottoHistory } from "@/lib/data-service";
import { getFrequencyMap } from "@/lib/statistics";
import { FrequencyChart } from "@/components/frequency-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AnalyticsPage() {
    const history = await getLottoHistory();
    const freqMap = getFrequencyMap(history);

    // Transform map to array for Recharts
    const chartData = Object.entries(freqMap).map(([num, count]) => ({
        name: num,
        count: count
    })).sort((a, b) => parseInt(a.name) - parseInt(b.name));

    return (
        <main className="min-h-screen bg-background text-foreground py-12 px-6 pb-24">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">역대 데이터 분석</h1>
                    <p className="text-muted-foreground">1,202회 이상의 당첨 결과를 분석한 상세 데이터입니다.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>번호별 당첨 횟수 (전체)</CardTitle>
                        <CardDescription>역대 가장 많이 당첨된 번호 분포.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FrequencyChart data={chartData} />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
