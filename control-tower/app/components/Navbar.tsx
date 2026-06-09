"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleLoginClick = () => {
    // open login in new tab
    window.open("/login", "_blank");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-8">

        {/* LEFT: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition-colors hover:border-brand-cyan/40 hover:text-brand-cyan"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="flex shrink-0 items-center gap-3">
            <Image
              src="/logo-new.png"
              alt="Logo"
              width={130}
              height={35}
              className="object-contain"
              priority
            />
            <div className="hidden rounded-full border border-brand-cyan/20 bg-brand-cyan/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-cyan lg:block">
              Fraud Intelligence
            </div>
          </div>
        </div>

        {/* CENTER: Navigation Links */}
        <div className="hidden items-center gap-2 text-sm font-medium text-gray-300 md:flex lg:gap-3">
          <NavContent session={session} />
        </div>

        {/* RIGHT: Auth Section */}
        <div className="flex items-center">
          {status === "loading" ? (
            <div className="h-10 w-24 animate-pulse rounded-full border border-white/10 bg-white/5" />
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.28em] text-gray-400 lg:block">
                {session.user?.name}
              </span>
              <LogoutButton />
            </div>
          ) : null}
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full flex w-full flex-col gap-4 border-b border-white/10 bg-slate-950/95 p-6 shadow-2xl md:hidden">
          <NavContent session={session} onLinkClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
};

const NavContent = ({ session, onLinkClick }: { session: Session | null; onLinkClick?: () => void }) => (
  <>
    <Link href="/" onClick={onLinkClick} className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-brand-cyan">
      Home
    </Link>

    <Link href="/demo" onClick={onLinkClick} className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-brand-cyan">
      Demo
    </Link>

    <Link href="/dashboard" onClick={onLinkClick} className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-brand-cyan">
      Forensic Dashboard
    </Link>

    <Link href="/network" target="_blank" rel="noopener noreferrer" onClick={onLinkClick} className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-brand-cyan">
      Network
    </Link>

    <Link href="/stats" target="_blank" rel="noopener noreferrer" onClick={onLinkClick} className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-brand-cyan">
      Stats
    </Link>

    <Link href="/service" onClick={onLinkClick} className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-brand-cyan">
      Request Service
    </Link>

    {session?.user?.role === "admin" && (
      <Link
        href="/admin"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onLinkClick}
        className="rounded-full px-4 py-2 text-brand-cyan transition-colors hover:bg-brand-cyan/10"
      >
        Admin Dashboard
      </Link>
    )}
  </>
);

export default Navbar;