import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60 py-6 text-center text-[10px] text-slate-400 backdrop-blur-xl md:text-xs">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-6 md:flex-row md:px-10">
        <p className="uppercase tracking-[0.25em] text-slate-500">Nexus Guard</p>
        <p>© 2025 Nexus Guard. Fraud intelligence and visual analytics.</p>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-slate-500">
          <Link href="/network" className="transition-colors hover:text-brand-cyan">Network</Link>
          <Link href="/dashboard" className="transition-colors hover:text-brand-cyan">Dashboard</Link>
        </div>
      </div>
    </footer>
  );
}