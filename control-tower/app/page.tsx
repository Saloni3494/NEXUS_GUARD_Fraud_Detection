"use client";
import Navbar from "./components/Navbar";
import { Network, AlertTriangle, Brain, UserX, Activity, Lightbulb, ArrowLeftRight, GitBranch, FileSearch, type LucideIcon } from "lucide-react";
import { IndianRupee, Banknote, Landmark, Wallet, Building2, ShieldCheck } from "lucide-react";
import TransactionCard from "./components/TransactionCard";
import GreenIconCircle from "./components/GreenIconCircle";
import CapabilityCard from "./components/CapabilityCard";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-white">
      <Navbar />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.16),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(79,70,229,0.16),_transparent_30%),radial-gradient(circle_at_center,_rgba(245,158,11,0.05),_transparent_35%)]" />

      {/* HERO SECTION */}
      <div className="relative flex-1">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-6 py-12 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-20">
          <div className="flex flex-col justify-center gap-7">
            <div className="flex flex-wrap items-center gap-3">
              <div className="premium-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-200">
                <span className="flex h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_14px_rgba(6,182,212,0.85)]" />
                AI-powered financial crime intelligence
              </div>
              <div className="premium-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-cyan" />
                Real-time graph analysis
              </div>
            </div>

            <div className="space-y-5">
              <p className="section-kicker">NexusGuard Control Tower</p>
              <h1 className="hero-title max-w-3xl text-balance text-white/92 drop-shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
                Detect, investigate, and <span className="text-white">disrupt fraud networks</span>
                <span className="block text-slate-300">before they scale.</span>
              </h1>
              <p className="hero-copy max-w-3xl">
                NexusGuard combines graph analytics, machine learning, and explainable AI to surface mule accounts, collusive rings, and anomalous payment behavior across large-scale ecosystems like UPI.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/network"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-cyan px-7 py-3.5 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-brand-cyan/90 hover:shadow-[0_18px_50px_rgba(6,182,212,0.25)]"
              >
                Explore Fraud Network
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-brand-cyan/30 hover:bg-brand-cyan/10"
              >
                Open Forensic Dashboard
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard value="91%" label="risk confidence" note="Precision tuned for investigations" />
              <MetricCard value="63%" label="fewer false positives" note="Sharper prioritization" />
              <MetricCard value="24/7" label="live monitoring" note="Always-on fraud surveillance" />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="surface-card w-full overflow-hidden rounded-[2rem] p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="section-kicker mb-2">Live intelligence feed</p>
                  <h2 className="text-xl font-semibold tracking-tight text-white">Fraud activity overview</h2>
                </div>
                <div className="rounded-full border border-brand-cyan/20 bg-brand-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
                  Streaming
                </div>
              </div>

              <div className="space-y-3">
                <TransactionCard nodeId={1024} risk="HIGH" amount={68000} />
                <TransactionCard nodeId={1871} risk="MEDIUM" amount={41500} />
                <TransactionCard nodeId={449} risk="LOW" amount={2300} />
              </div>

              <div className="mt-5 grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="section-kicker mb-2">Risk signals</p>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p className="flex items-center gap-2"><span className="text-brand-cyan">•</span> High velocity transfers</p>
                    <p className="flex items-center gap-2"><span className="text-brand-cyan">•</span> Multiple inbound sources</p>
                    <p className="flex items-center gap-2"><span className="text-brand-cyan">•</span> Circular transaction patterns</p>
                  </div>
                </div>
                <div className="flex justify-start md:justify-end">
                  <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-lime-300">
                    <Brain className="h-3.5 w-3.5" />
                    Explain fraud
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-card flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] px-5 py-4 md:px-6">
              <div>
                <p className="section-kicker mb-2">Supported networks</p>
                <p className="text-sm text-slate-300">Built for the payment rails investigators see every day.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <GreenIconCircle icon={IndianRupee} size="xs" />
                <GreenIconCircle icon={Banknote} size="xs" />
                <GreenIconCircle icon={Landmark} size="xs" />
                <GreenIconCircle icon={Wallet} size="xs" />
                <GreenIconCircle icon={Building2} size="xs" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE CAPABILITIES */}
      <div className="relative mx-auto w-full max-w-[1600px] px-6 py-16 md:px-10 lg:py-24">
        <div className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker mb-3">Core capabilities</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Built for investigations that need speed, clarity, and proof.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
            NexusGuard provides a unified intelligence layer for detecting, analyzing, and explaining financial fraud networks at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <CapabilityCard icon={Network} title="Graph-Based Fraud Detection" points={[
            "Detect mule rings and collusive behavior using transaction graph analysis",
            "Identify hidden communities and circular money flows",
          ]} />
          <CapabilityCard icon={AlertTriangle} title="Anomaly & Risk Scoring" points={[
            "Machine learning models flag high-risk nodes and transactions",
            "Velocity, volume, and behavioral deviation analysis",
          ]} />
          <CapabilityCard icon={Brain} title="Explainable AI (XAI)" points={[
            "SHAP-powered feature attribution",
            "Human-readable AI explanations for investigators and auditors",
          ]} />
        </div>
      </div>

      {/* USE CASES */}
      <div className="relative mx-auto w-full max-w-[1600px] border-t border-white/10 px-6 py-16 md:px-10 lg:py-24">
        <div className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker mb-3">Use cases</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Designed for institutions, analysts, and response teams.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
            NexusGuard helps uncover mule networks, explain risk, and coordinate action with confidence.
          </p>
        </div>

        {/* Section 1: Financial Institutions */}
        <div className="grid grid-cols-1 items-center gap-8 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="surface-card grid grid-cols-2 gap-4 rounded-[1.75rem] p-4 font-bold">
            <UseCaseIcon icon={UserX} label="Mule Identification" />
            <UseCaseIcon icon={Network} label="Ring Detection" />
            <UseCaseIcon icon={Activity} label="Anomaly Detection" />
            <UseCaseIcon icon={Lightbulb} label="Explainable Decisions" />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-tight text-white">For financial institutions</h3>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">Banks and FinTechs leverage NexusGuard to reduce fraud losses and regulatory risk.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatBlock value="78%" label="Faster detection" />
              <StatBlock value="63%" label="Less false positives" />
              <StatBlock value="91%" label="Confidence" />
            </div>
          </div>
        </div>

        {/* Section 2: Operational Benefits (Reversed for visual variety) */}
        <div className="grid grid-cols-1 items-center gap-8 border-t border-white/10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-tight text-white">For operational response</h3>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">Payment platforms leverage NexusGuard to automate manual review workloads.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatBlock value="65%" label="Less workload" />
              <StatBlock value="70%" label="Faster resolution" />
              <StatBlock value="45%" label="Cost savings" />
            </div>
          </div>

          <div className="surface-card grid grid-cols-2 gap-4 rounded-[1.75rem] p-4 font-bold">
            <UseCaseIcon icon={FileSearch} label="Case Investigation" />
            <UseCaseIcon icon={ArrowLeftRight} label="Path Analysis" />
            <UseCaseIcon icon={GitBranch} label="Network Expansion" />
            <UseCaseIcon icon={Brain} label="AI Narratives" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Helper Components for cleaner code
function UseCaseIcon({ icon: Icon, label }: { icon: LucideIcon, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-[10px] transition-all hover:border-brand-cyan/30 hover:bg-brand-cyan/[0.06]">
      <Icon className="h-5 w-5 text-brand-cyan" />
      <div className="text-center text-slate-200">{label}</div>
    </div>
  );
}

function StatBlock({ value, label }: { value: string, label: string }) {
  return (
    <div className="surface-card rounded-[1.5rem] p-4">
      <div className="text-3xl font-semibold tracking-tight text-brand-cyan">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">{label}</div>
    </div>
  );
}

function MetricCard({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <div className="surface-card rounded-[1.5rem] p-4">
      <div className="text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-brand-cyan">{label}</div>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{note}</p>
    </div>
  );
}