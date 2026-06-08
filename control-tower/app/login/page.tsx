import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden text-white">
      
      <Navbar/>
      
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.16),_transparent_35%),radial-gradient(circle_at_80%_15%,_rgba(79,70,229,0.14),_transparent_28%)]" />
        <LoginForm />

        {/* Credentials Info */}
        <div className="surface-card relative mt-6 max-w-lg rounded-[1.5rem] px-6 py-5 text-center text-sm text-slate-400">
          <p className="mb-2 text-brand-cyan font-medium uppercase tracking-[0.24em] text-[10px]">
            Admin Credentials (MVP Purpose only) 
          </p>
          <p>For demonstration purposes,
            you can use the following credentials:</p>
          <p className="mt-3 font-mono text-slate-200">Email: admin@test.com</p>
          <p className="font-mono text-slate-200">Password: Test@123</p>
        </div>

      </div>

      <Footer/>
    </main>
  );
}