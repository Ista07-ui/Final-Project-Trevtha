"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    accountType: "user", // default: Traveler
  });

  const [localError, setLocalError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      const errorMsg = "Email dan password harus diisi";
      setLocalError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const result = await login({
      email: formData.email,
      password: formData.password,
      accountType: formData.accountType as "user" | "admin",
    });

    if (result.success) {
      const signedInRole = result.user?.role;
      const roleText = signedInRole === "admin" ? "Admin" : "Traveler";
      toast.success(`Login berhasil! Selamat datang, ${roleText}. 🎉`);

      setTimeout(() => {
        if (signedInRole === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/user-dashboard");
        }
      }, 1500);
    } else {
      const errorMsg = result.error || "Login gagal";
      setLocalError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-forest"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            placeholder="name@company.com"
            className="h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-forest outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 disabled:bg-slate-100"
          />
        </div>

        {/* Account Type Selection */}
        <div>
          <label
            htmlFor="account-type"
            className="mb-2 block text-sm font-semibold text-forest"
          >
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            {/* Traveler Option */}
            <label className="cursor-pointer">
              <span className="sr-only">Traveler</span>
              <input
                id="account-type-traveler"
                type="radio"
                name="accountType"
                value="user"
                checked={formData.accountType === "user"}
                onChange={handleInputChange}
                disabled={isLoading}
                className="peer hidden"
              />
              <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white py-4 text-sm font-semibold text-forest/60 transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-disabled:opacity-50">
                <span className="material-symbols-outlined text-lg">
                  person
                </span>
                <span>Traveler</span>
              </div>
            </label>

            {/* Admin Option */}
            <label className="cursor-pointer">
              <span className="sr-only">Admin</span>
              <input
                id="account-type-admin"
                type="radio"
                name="accountType"
                value="admin"
                checked={formData.accountType === "admin"}
                onChange={handleInputChange}
                disabled={isLoading}
                className="peer hidden"
              />
              <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white py-4 text-sm font-semibold text-forest/60 transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-disabled:opacity-50">
                <span className="material-symbols-outlined text-lg">
                  storefront
                </span>
                <span>Admin</span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-forest"
            >
              Password
            </label>
            <Link
              href="/help"
              className="text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-primary/80"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              placeholder="••••••••"
              className="h-14 w-full rounded-lg border border-slate-200 bg-white pl-4 pr-12 text-forest outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 disabled:bg-slate-100"
            />
            <span className="material-symbols-outlined pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
              visibility
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            disabled={isLoading}
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-slate-600">
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary font-bold text-forest shadow-lg shadow-primary/20 transition-all hover:brightness-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-lg">
                progress_activity
              </span>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Login to Trevtha</span>
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </>
          )}
        </button>
      </form>

      <div className="mt-10">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-sm font-bold uppercase tracking-widest">
            <span className="bg-cream px-4 text-[10px] text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            disabled={isLoading}
            className="flex h-12 items-center justify-center rounded-lg border border-slate-200 px-4 transition-colors hover:bg-slate-50 disabled:opacity-70"
          >
            <span className="text-sm font-semibold text-slate-700">Google</span>
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="flex h-12 items-center justify-center rounded-lg border border-slate-200 px-4 transition-colors hover:bg-slate-50 disabled:opacity-70"
          >
            <span className="text-sm font-semibold text-slate-700">
              Facebook
            </span>
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-slate-500">
          Don&apos;t have an account yet?
          <Link
            href="/register"
            className="ml-1 font-bold text-primary underline-offset-4 hover:underline"
          >
            Register for an invitation
          </Link>
        </p>
      </div>
    </>
  );
}
