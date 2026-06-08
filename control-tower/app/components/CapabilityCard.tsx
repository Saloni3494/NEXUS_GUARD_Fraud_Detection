import { LucideIcon } from "lucide-react";

interface CapabilityCardProps {
  icon: LucideIcon;
  title: string;
  points: string[];
}

export default function CapabilityCard({
  icon: Icon,
  title,
  points,
}: CapabilityCardProps) {
  return (
    <div className="surface-card group relative flex flex-col gap-4 overflow-hidden rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-cyan/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent opacity-70" />
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan shadow-[0_10px_30px_rgba(6,182,212,0.12)]">
        <Icon className="h-6 w-6" />
      </div>

      <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>

      <div className="space-y-3">
        {points.map((point, idx) => (
        <div key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-300">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(6,182,212,0.65)]" />
          <span>{point}</span>
        </div>
      ))}
      </div>
    </div>
  );
}
