"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type AdminNavKey =
  | "dashboard"
  | "banners"
  | "categories"
  | "activities"
  | "promos"
  | "payments"
  | "transactions"
  | "users";

type AdminShellProps = {
  readonly activeNav: AdminNavKey;
  readonly children: ReactNode;
};

const navItems: Array<{
  readonly key: AdminNavKey;
  readonly href: string;
  readonly icon: string;
  readonly label: string;
}> = [
  {
    key: "dashboard",
    href: "/admin/dashboard",
    icon: "dashboard",
    label: "Dashboard Overview",
  },
  {
    key: "banners",
    href: "/admin/banners",
    icon: "view_carousel",
    label: "Manage Banners",
  },
  {
    key: "categories",
    href: "/admin/categories",
    icon: "category",
    label: "Manage Categories",
  },
  {
    key: "activities",
    href: "/admin/activities",
    icon: "explore",
    label: "Manage Activities",
  },
  {
    key: "promos",
    href: "/admin/promos",
    icon: "redeem",
    label: "Manage Promos",
  },
  {
    key: "payments",
    href: "/admin/payment-methods",
    icon: "payments",
    label: "Payment Methods",
  },
  {
    key: "transactions",
    href: "/admin/transactions",
    icon: "history",
    label: "Manage Transactions",
  },
  {
    key: "users",
    href: "/admin/users",
    icon: "group",
    label: "Manage Users",
  },
];

export default function AdminShell({
  activeNav,
  children,
}: Readonly<AdminShellProps>) {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Debug: Cek user data yang loaded
  useEffect(() => {
    if (user) {
      console.log("👤 [AdminShell] User data:", {
        name: user.name,
        email: user.email,
        role: user.role,
        profilePictureUrl: user.profilePictureUrl,
      });
    }
  }, [user]);

  return (
    <div className="flex overflow-hidden min-h-screen bg-cream text-charcoal">
      <aside className="w-72 bg-forest flex flex-col h-screen text-white/80 shrink-0 sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 bg-gold/20 rounded-lg flex items-center justify-center">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiurMpR0E35NjjjixoHOzcHc9lBh_SjBUG1sahq4qFnFF8GuXUH0T_1y-TEkd6W2G2Ib9gIBN0t04BzgYpBvgErUA27y2RK6mZjgq-48QlqWTf30MIovx9G2M85jDk9H9Fd9sf10KDWex2F30zyOZAElllGSaK9gmrFgu70ZwBvpcIWplmT_S2PbhY2vYSgdhQhcWIzhb_OdeviIj_nKBhPXvlbRtb_Bon_UJ3IbVEWcn-AkPV7o_HQb419C1Y5CsW5r5fjcHSWZgT"
              alt="TREVTHA Luxury Logo"
              width={32}
              height={32}
              className="size-8"
            />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-lg leading-none">
              TREVTHA
            </h1>
            <p className="text-gold text-[10px] font-medium tracking-widest uppercase mt-1">
              Luxury Marketplace
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.key === activeNav;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-r-lg transition-all ${
                  isActive
                    ? "text-white"
                    : "hover:bg-white/5 hover:text-white rounded-lg"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: "rgba(212, 175, 55, 0.15)",
                        borderLeft: "4px solid #D4AF37",
                      }
                    : undefined
                }
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive ? "text-gold" : "text-gold/70"
                  }`}
                >
                  {item.icon}
                </span>
                <span className={`text-sm ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 space-y-4">
          <Link
            href="/admin/activities/new"
            className="w-full bg-gold hover:bg-gold/90 text-forest font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="text-sm">New Activity</span>
          </Link>
          <div className="pt-4 border-t border-white/10 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:text-white transition-all text-left">
              <span className="material-symbols-outlined text-sm">
                settings
              </span>
              <span className="text-sm">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 hover:text-white transition-all text-left"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 bg-white border-b border-charcoal/5 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-bold text-forest">
            Admin Dashboard Overview
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 px-4 py-2 bg-cream/50 rounded-full border border-charcoal/5">
              <span className="material-symbols-outlined text-charcoal/40">
                search
              </span>
              <input
                type="text"
                placeholder="Search activities..."
                className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-charcoal/40 outline-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-charcoal">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-[11px] text-charcoal/60 uppercase tracking-wider">
                  {user?.role === "admin" ? "Admin" : "User"}
                </p>
              </div>
              <div className="size-10 rounded-full border-2 border-gold p-0.5">
                {user?.profilePictureUrl ? (
                  <Image
                    src={user.profilePictureUrl}
                    alt={`${user.name} Profile Avatar`}
                    width={40}
                    height={40}
                    className="size-full rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="size-full rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gold text-xl">
                      person
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
