import { LucideIcon } from "lucide-react";

interface GreenIconCircleProps {
  icon: LucideIcon;
  size?: "xs" | "sm" | "md";
  className?: string;
}

export default function GreenIconCircle({
  icon: Icon,
  size = "sm",
  className = "",
}: GreenIconCircleProps) {
  const sizeMap = {
    xs: {
      wrapper: "p-1",
      icon: "w-2 h-2",
    },
    sm: {
      wrapper: "p-1.5",
      icon: "w-3 h-3",
    },
    md: {
      wrapper: "p-2",
      icon: "w-4 h-4",
    },
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full border border-lime-400/30 bg-gradient-to-br from-lime-400/20 to-emerald-500/10 text-lime-300 shadow-[0_0_18px_rgba(163,230,53,0.12)] ${sizeMap[size].wrapper} ${className}`}
    >
      <Icon className={`text-lime-300 ${sizeMap[size].icon}`} />
    </div>
  );
}
