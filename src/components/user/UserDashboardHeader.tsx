"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function UserDashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-accent/20 bg-[#1B3022] px-6 md:px-20 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <div className="size-8 bg-primary text-accent flex items-center justify-center rounded-lg">
            <span className="material-symbols-outlined text-xl">
              travel_explore
            </span>
          </div>
          <h2 className="text-primary text-xl font-extrabold tracking-tight uppercase">
            TREVTHA
          </h2>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            className="text-white hover:text-accent text-sm font-semibold transition-colors"
            href="#"
          >
            Destinations
          </Link>
          <Link
            className="text-white hover:text-accent text-sm font-semibold transition-colors"
            href="#"
          >
            Cruises
          </Link>
          <Link
            className="text-white hover:text-accent text-sm font-semibold transition-colors"
            href="#"
          >
            Experiences
          </Link>
          <Link
            className="text-white hover:text-accent text-sm font-semibold transition-colors"
            href="#"
          >
            Concierge
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/10">
          <span className="material-symbols-outlined text-primary/60 text-lg mr-2">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-primary/40"
            placeholder="Search experiences..."
            type="text"
          />
        </div>
        <button className="p-2 hover:bg-primary/5 rounded-lg transition-colors relative">
          <span className="material-symbols-outlined text-primary">
            notifications
          </span>
          <span className="absolute top-2 right-2 size-2 bg-accent rounded-full border-2 border-white"></span>
        </button>
        <div className="size-10 rounded-full border-2 border-accent p-0.5 overflow-hidden">
          {user?.profilePictureUrl ? (
            <div
              className="w-full h-full rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${user.profilePictureUrl}')`,
              }}
            />
          ) : (
            <div className="w-full h-full rounded-full bg-accent/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-accent text-xl">
                person
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
