"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import UserSidebar from "@/components/user/UserSidebar";

type UserLayoutProps = {
  children: ReactNode;
};

export default function UserLayout({ children }: Readonly<UserLayoutProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (user.role === "admin") {
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, isLoading, router, user]);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream text-forest font-semibold">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || !user || user.role === "admin") {
    return null;
  }

  const showGlobalSidebar = pathname !== "/user/user-dashboard";

  return (
    <>
      {showGlobalSidebar ? (
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-30 h-12 w-12 rounded-full bg-forest text-white shadow-xl"
          aria-label="Open user menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      ) : null}

      {showGlobalSidebar ? (
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-opacity ${
            isMobileSidebarOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu overlay"
          />
          <div
            className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto p-4 transition-transform ${
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-sm font-bold text-white">User Menu</p>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="rounded-md bg-white/20 p-1 text-white"
                aria-label="Close user menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <UserSidebar
              currentPath={pathname}
              onNavigate={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      ) : null}

      {showGlobalSidebar ? (
        <div className="user-non-dashboard-shell">
          <div className="hidden lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-6 lg:items-start">
            <div className="pl-6 pt-28 sticky top-0 self-start">
              <UserSidebar currentPath={pathname} />
            </div>
            <div className="min-w-0 user-non-dashboard-content">{children}</div>
          </div>
          <div className="lg:hidden user-non-dashboard-content">{children}</div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
