"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface UserSidebarMenuItemProps {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}

function UserSidebarMenuItem({
  icon,
  label,
  href,
  isActive = false,
}: UserSidebarMenuItemProps) {
  return (
    <Link
      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all group ${
        isActive ? "bg-primary text-accent" : "text-charcoal hover:bg-primary/5"
      }`}
      href={href}
    >
      <span
        className={`material-symbols-outlined ${
          !isActive && "text-primary group-hover:text-accent"
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

interface UserSidebarProps {
  currentPath?: string;
}

export default function UserSidebar({
  currentPath = "/user/user-dashboard",
}: UserSidebarProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="lg:col-span-3">
      <nav className="bg-white rounded-xl shadow-sm border border-primary/5 p-4 flex flex-col gap-1">
        <UserSidebarMenuItem
          icon="dashboard"
          label="Dashboard"
          href="/user/user-dashboard"
          isActive={currentPath === "/user/user-dashboard"}
        />
        <UserSidebarMenuItem
          icon="person"
          label="Personal Info"
          href="/user/personal-info"
          isActive={currentPath === "/user/personal-info"}
        />
        <UserSidebarMenuItem
          icon="security"
          label="Security"
          href="/user/security"
          isActive={currentPath === "/user/security"}
        />
        <UserSidebarMenuItem
          icon="location_on"
          label="Contacts & Pickup"
          href="/user/contacts-pickup"
          isActive={currentPath === "/user/contacts-pickup"}
        />
        <UserSidebarMenuItem
          icon="credit_card"
          label="Payment Methods"
          href="/user/payment-methods"
          isActive={currentPath === "/user/payment-methods"}
        />
        <UserSidebarMenuItem
          icon="shopping_cart"
          label="My Cart"
          href="/user/my-cart"
          isActive={currentPath === "/user/my-cart"}
        />
        <UserSidebarMenuItem
          icon="receipt_long"
          label="Transactions"
          href="/user/transactions"
          isActive={currentPath === "/user/transactions"}
        />
        <UserSidebarMenuItem
          icon="sell"
          label="My Promos"
          href="/user/my-promos"
          isActive={currentPath === "/user/my-promos"}
        />
        <UserSidebarMenuItem
          icon="help"
          label="Help Center"
          href="/user/help-center"
          isActive={currentPath === "/user/help-center"}
        />
        <div className="mt-8 pt-4 border-t border-primary/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-bold transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
