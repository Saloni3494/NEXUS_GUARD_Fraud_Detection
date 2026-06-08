import PaymentSection from "../components/PaymentSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata = {
  title: "Live Demo — NexusGuard",
  description: "Real-time UPI payment gateway with fraud detection",
};

export default function DemoPage() {
  return (<>
    <Navbar/>
    <main className="min-h-screen bg-[#0D0D0D] px-4 py-12 md:px-8">
        
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12 text-center mt-8">
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
          </span>
          <span className="text-brand-cyan text-xs font-semibold tracking-widest uppercase">
            Live System Active
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          Next-Gen Payment Gateway
          <span className="block text-gradient mt-2 pb-2">with Real-Time Intelligence</span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Every transaction runs through our multi-layered security pipeline — 
          GNN graph scoring, Anomaly Detection, JA3 fingerprinting, and behavioral 
          analysis — before a verdict is returned in under 50ms.
        </p>

        {/* Pipeline chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            { label: "GraphSAGE GNN", weight: "40%" },
            { label: "Isolation Forest", weight: "20%" },
            { label: "Behavior", weight: "25%" },
            { label: "Graph context", weight: "10%" },
            { label: "JA3", weight: "5%" },
          ].map(({ label, weight }) => (
            <div
              key={label}
              className="glass-panel flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-300 shadow-sm transition hover:-translate-y-0.5 duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo" />
              {label}
              <span className="text-brand-cyan opacity-80">{weight}</span>
            </div>
          ))}
        </div>

        {/* Threshold legend */}
        <div className="flex justify-center gap-6 mt-8 text-xs font-semibold tracking-wider uppercase text-slate-500">
          <span className="flex items-center gap-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            &lt; 0.45 Approve
          </span>
          <span className="flex items-center gap-2 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            0.45 – 0.75 Review
          </span>
          <span className="flex items-center gap-2 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.6)]" />
            ≥ 0.75 Block
          </span>
        </div>
      </div>

      {/* Payment form */}
      <div className="max-w-2xl mx-auto">
        <PaymentSection currentUserAccount="1553" />
      </div>

     
    </main>
     <Footer/>
    </>
  );
}