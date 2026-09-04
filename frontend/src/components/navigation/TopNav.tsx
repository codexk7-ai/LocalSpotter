"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, MapPin, Calendar, Store, ShieldCheck } from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";

export const TopNav: React.FC = () => {
  const pathname = usePathname();
  const { user, role, isAuthenticated } = useAuth();

  const navLinks = [
    { label: "Producten", href: "/products", icon: ShoppingBag },
    { label: "Lokale Winkels", href: "/businesses", icon: Store },
    { label: "Shoproutes", href: "/shoproutes", icon: MapPin },
    { label: "Workshops", href: "/workshops", icon: Calendar },
  ];

  return (
    <nav className="hidden md:block bg-[#FAE2F0] border-b border-[#F7D0E7] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#FA1EFF] flex items-center justify-center text-white font-bold text-xl font-rubik shadow-sm">
            LS
          </div>
          <span className="font-rubik font-bold text-xl tracking-tight text-[#111111]">
            LocalSpotter<span className="text-[#FA1EFF] text-xs font-semibold ml-0.5">.nl</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 bg-white/60 p-1.5 rounded-full border border-white/40">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#FA1EFF] text-white shadow-xs"
                    : "text-[#111111] hover:bg-white/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* User / Dashboard Action */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="p-2 rounded-full bg-white/70 hover:bg-white transition-colors relative"
            aria-label="Winkelwagen"
          >
            <ShoppingBag className="w-5 h-5 text-[#111111]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FA1EFF] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              1
            </span>
          </Link>

          {role === "BUSINESS_OWNER" && (
            <Link
              href="/owner"
              className="px-4 py-2 rounded-xl bg-[#121F3E] text-white text-xs font-bold hover:bg-[#0A1224] transition-colors flex items-center gap-1.5"
            >
              <Store className="w-4 h-4" />
              Ondernemers Dashboard
            </Link>
          )}

          {role === "SUPER_ADMIN" && (
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-[#790166] text-white text-xs font-bold hover:bg-[#5C014E] transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </Link>
          )}

          {!isAuthenticated ? (
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-[#FA1EFF] text-white text-xs font-bold hover:bg-[#E000EC] transition-colors shadow-xs"
            >
              Inloggen
            </Link>
          ) : (
            <Link
              href="/account"
              className="flex items-center gap-2 p-1.5 pr-3 bg-white rounded-full border border-white/60 shadow-xs hover:border-[#FA1EFF] transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-[#121F3E] text-white flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0)}
              </div>
              <span className="text-xs font-bold text-[#111111]">{user?.name}</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
