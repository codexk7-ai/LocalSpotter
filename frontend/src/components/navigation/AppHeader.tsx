"use client";

import React from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User as UserIcon } from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onMenuClick?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = false,
  onMenuClick,
}) => {
  const { user, isAuthenticated, role } = useAuth();

  return (
    <header className="w-full ls-banner-header pt-4 pb-4 px-4 shadow-sm relative z-30">
      {/* Top bar with logo and quick actions */}
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-black/5 transition-colors focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-[#111111]" />
          </button>
          
          <Link href="/" className="flex items-center gap-2">
            {/* LocalSpotter Brand Logo */}
            <div className="w-8 h-8 rounded-full bg-[#FA1EFF] flex items-center justify-center text-white font-bold text-lg font-rubik shadow-sm">
              LS
            </div>
            <span className="font-rubik font-bold text-lg tracking-tight text-[#111111]">
              LocalSpotter<span className="text-[#FA1EFF] text-xs font-semibold ml-0.5">.nl</span>
            </span>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="p-2 rounded-full hover:bg-black/5 transition-colors relative"
            aria-label="Winkelwagen"
          >
            <ShoppingBag className="w-5 h-5 text-[#111111]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FA1EFF] rounded-full" />
          </Link>

          {isAuthenticated ? (
            <Link
              href={role === "BUSINESS_OWNER" ? "/owner" : role === "SUPER_ADMIN" ? "/admin" : "/account"}
              className="flex items-center gap-2 p-1 pl-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/40 shadow-xs"
            >
              <span className="text-xs font-bold text-[#111111] max-w-[90px] truncate hidden sm:inline">
                {user?.name}
              </span>
              <div className="w-7 h-7 rounded-full bg-[#121F3E] text-white flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-xs font-bold text-[#FA1EFF] bg-white px-3 py-1.5 rounded-full border border-[#FA1EFF]/20 shadow-2xs hover:bg-[#FA1EFF] hover:text-white transition-all"
            >
              Inloggen
            </Link>
          )}
        </div>
      </div>

      {/* Optional title or header subtitle */}
      {title && (
        <div className="mt-3 text-center">
          <h1 className="text-xl font-bold font-rubik text-[#111111]">{title}</h1>
        </div>
      )}
    </header>
  );
};
