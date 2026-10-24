"use client";
import Link from "next/link";
import { useState } from "react";
import Icon from "../ui/Icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-border-hairline shadow-sm">
      <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-margin max-w-7xl mx-auto h-14 sm:h-16 md:h-20">
        <Link className="flex items-center gap-2 sm:gap-3 group" href="#">
          <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] flex items-center justify-center text-white group-hover:bg-[#1a1a1a] transition-colors shadow-sm">
            <span>
              <Icon
                name="flight_takeoff"
                size={24}
                className="text-[#e5a910] text-2xl"
              />
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-display-hero text-headline-md font-bold tracking-tight text-[#0a0a0a]">
              SafariSoul
            </span>
            <span className="font-label-sm text-[10px] tracking-widest text-[#77767b] font-bold">
              EXECUTIVE MOBILITY
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            className="text-[#0a0a0a] font-label-lg text-label-lg border-b-2 border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer relative"
            href="#hero"
          >
            Airport Transfers
            <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#e5a910]"></span>
          </Link>
          {/*  <Link
            className="text-[#555558] font-label-lg text-label-lg transition-colors hover:text-[#0a0a0a] hover:border-b-2 hover:border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer"
            href="#city-rides"
          >
            City Rides
          </Link> */}
          <Link
            className="text-[#555558] font-label-lg text-label-lg transition-colors hover:text-[#0a0a0a] hover:border-b-2 hover:border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer"
            href="#fleet"
          >
            Fleet
          </Link>
          <Link
            className="text-[#555558] font-label-lg text-label-lg transition-colors hover:text-[#0a0a0a] hover:border-b-2 hover:border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer"
            href="#how-it-works"
          >
            How It Works
          </Link>
          {/*  <Link
            className="text-[#555558] font-label-lg text-label-lg transition-colors hover:text-[#0a0a0a] hover:border-b-2 hover:border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer"
            href="#corporate"
          >
            Corporate
          </Link> */}
        </nav>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-14 sm:top-16 left-0 w-full bg-white border-t border-border-hairline shadow-lg">
            <nav className="flex flex-col space-y-2 p-4">
              <Link
                className="text-[#0a0a0a] font-label-lg text-label-lg py-2"
                href="#hero"
                onClick={() => setMenuOpen(false)}
              >
                Airport Transfers
              </Link>
              <Link
                className="text-[#555558] font-label-lg text-label-lg py-2"
                href="#fleet"
                onClick={() => setMenuOpen(false)}
              >
                Fleet
              </Link>
              <Link
                className="text-[#555558] font-label-lg text-label-lg py-2"
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
              >
                How It Works
              </Link>
            </nav>
          </div>
        )}
        <div className="flex items-center space-x-4">
          {/* Hamburger button for mobile */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-[#0a0a0a] hover:text-[#e5a910]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <Icon
              name={menuOpen ? "close" : "menu"}
              size={24}
            />
          </button>
          {/* <button
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg border border-border-hairline text-[#555558] hover:text-[#0a0a0a] hover:bg-surface-cool-subtle transition-colors"
            title="24/7 Concierge Support"
          >
            <span className="material-symbols-outlined text-[20px]">
              support_agent
            </span>
          </button> */}
          {/*   <button className="hidden sm:inline-flex items-center text-[#0a0a0a] font-label-lg text-label-lg px-4 py-2 hover:bg-surface-cool-subtle rounded-lg transition-colors font-medium">
            My Bookings
          </button> */}
          {/*    <button className="bg-[#0a0a0a] text-white hover:bg-[#1f1f1f] font-label-lg text-label-lg px-5 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow active:scale-[0.98]">
            Sign In
          </button> */}
        </div>
      </div>
    </header>
  );
}
