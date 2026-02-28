import Link from "next/link";

export default function UserDashboardFooter() {
  return (
    <footer className="bg-[#1B3022] text-white mt-12 py-10 px-6 md:px-20 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <Link href="/" className="flex items-center gap-3 text-accent">
          <div className="size-8 bg-accent text-primary flex items-center justify-center rounded-lg">
            <span className="material-symbols-outlined text-xl">
              travel_explore
            </span>
          </div>
          <h2 className="text-white text-xl font-extrabold tracking-tight uppercase">
            TREVTHA
          </h2>
        </Link>
        <div className="flex gap-8 text-sm opacity-80">
          <Link className="hover:text-accent transition-colors" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:text-accent transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="hover:text-accent transition-colors" href="#">
            Contact Concierge
          </Link>
        </div>
        <div className="flex gap-4">
          <div className="size-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:text-primary cursor-pointer transition-all">
            <span className="material-symbols-outlined text-[18px]">
              public
            </span>
          </div>
          <div className="size-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:text-primary cursor-pointer transition-all">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center mt-10 text-[10px] uppercase tracking-widest opacity-40">
        © 2026 TREVTHA Luxury Travel Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
