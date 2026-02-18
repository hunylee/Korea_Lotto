
import { cn } from "@/lib/utils";

interface LottoBallProps {
    number: number;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function LottoBall({ number, size = "md", className }: LottoBallProps) {
    const getColorClass = (num: number) => {
        if (num <= 10) return "bg-yellow-500 border-yellow-600";
        if (num <= 20) return "bg-blue-500 border-blue-600";
        if (num <= 30) return "bg-red-500 border-red-600";
        if (num <= 40) return "bg-slate-500 border-slate-600";
        return "bg-green-500 border-green-600";
    };

    const getSizeClass = (s: "sm" | "md" | "lg") => {
        switch (s) {
            case "sm": return "w-8 h-8 text-sm border-b-2";
            case "md": return "w-12 h-12 text-lg border-b-4";
            case "lg": return "w-16 h-16 text-2xl border-b-4";
        }
    };

    return (
        <div
            className={cn(
                "rounded-full flex items-center justify-center font-bold text-white shadow-lg",
                getColorClass(number),
                getSizeClass(size),
                className
            )}
        >
            {number}
        </div>
    );
}
