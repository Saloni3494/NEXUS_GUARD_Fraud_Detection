"use client";
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const roles = ['admin', 'investigator', 'Integration Partner'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, 
    });

    if (result?.error) {
      alert("Access Denied: Invalid Credentials");
      setLoading(false);
      return;
    }

    if (role === 'admin') {
      router.push("/admin");
    } else {
      router.push("/");
    }
    
    router.refresh(); //update session
  };

  return (
    <div className="surface-card relative w-full max-w-lg overflow-hidden rounded-[1.75rem] p-6 text-center md:max-w-xl md:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent" />
      <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-cyan">
        Secure Access Portal
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Login</h1>
      <p className="mt-2 text-sm text-slate-400">Select access level and enter credentials.</p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Selector */}
        <div className="space-y-2 text-left">
          <div className="flex gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 rounded-xl py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                  role === r
                    ? "border border-brand-cyan/20 bg-brand-cyan/15 text-brand-cyan shadow-[0_12px_30px_rgba(6,182,212,0.12)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-left">
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-brand-cyan/50 focus:bg-white/[0.06]"
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-brand-cyan/50 focus:bg-white/[0.06]"
          />
        </div>
        
        <button 
          disabled={loading}
          type="submit"
          className="w-full rounded-2xl bg-brand-cyan py-3.5 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-brand-cyan/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Authenticating..." : `Login as ${role}`}
        </button>
        
        <button
          type="button"
          onClick={() => router.push("/service")}
          className="w-full text-xs text-slate-500 transition-colors hover:text-slate-200"
        >
          Request system access?
        </button>
      </form>
    </div>
  );
};

export default LoginForm;