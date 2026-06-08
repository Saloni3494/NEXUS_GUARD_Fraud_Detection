"use client";

import { ArrowLeftRight, AlertTriangle, ShieldCheck } from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

interface TransactionCardProps {
  nodeId: number;
  risk: RiskLevel;
  amount: number;
  onClick?: (nodeId: number) => void;
}

export default function TransactionCard({
  nodeId,
  risk,
  amount,
  onClick,
}: TransactionCardProps) {
  const riskStyles: Record<
    RiskLevel,
    { color: string; bg: string; icon: JSX.Element }
  > = {
    HIGH: {
      color: "text-red-400",
      bg: "bg-red-500",
      icon: <AlertTriangle className="w-3 h-3 text-black" strokeWidth={3} />,
    },
    MEDIUM: {
      color: "text-yellow-400",
      bg: "bg-yellow-400",
      icon: <ArrowLeftRight className="w-3 h-3 text-black" strokeWidth={3} />,
    },
    LOW: {
      color: "text-green-400",
      bg: "bg-lime-500",
      icon: <ShieldCheck className="w-3 h-3 text-black" strokeWidth={3} />,
    },
  };

  const { color, bg, icon } = riskStyles[risk];

  return (
    <div
      onClick={() => onClick?.(nodeId)}
      role={onClick ? "button" : undefined}
      className="surface-card flex items-center justify-between rounded-2xl px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/20"
    >
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${bg} shadow-[0_0_18px_rgba(255,255,255,0.08)]`}>
          {icon}
        </span>

        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Node #{nodeId}</div>
          <div className={`text-sm font-semibold ${color}`}>
            Risk {risk}
          </div>
        </div>
      </div>

      <div className="text-sm font-semibold text-slate-100">
        ₹{amount.toLocaleString("en-IN")}
      </div>
    </div>
  );
}
