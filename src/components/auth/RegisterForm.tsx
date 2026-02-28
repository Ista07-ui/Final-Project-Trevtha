"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [localError, setLocalError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      const errorMsg = "Semua field wajib diisi";
      setLocalError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const errorMsg = "Password tidak cocok";
      setLocalError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role as "user" | "admin",
    });

    if (result.success) {
      const roleText = formData.role === "admin" ? "Admin" : "Traveler";
      toast.success(
        `Register berhasil! Selamat datang, ${formData.name}. Silakan login dengan akun Anda.`,
      );

      setTimeout(() => {
        // Redirect ke login page dengan role terpilih
        router.push(`/login?role=${formData.role}`);
      }, 2000);
    } else {
      const errorMsg = result.error || "Register gagal";
      setLocalError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="full-name"
            className="text-sm font-bold uppercase tracking-wider"
          >
            Full Name
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-forest/40">
              person
            </span>
            <input
              id="full-name"
              name="name"
              type="text"
              placeholder="Alex Sterling"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              className="w-full rounded-xl border border-forest/10 bg-cream/30 py-3.5 pr-4 pl-12 text-forest outline-none transition-all placeholder:text-forest/30 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-slate-100"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="register-email"
            className="text-sm font-bold uppercase tracking-wider"
          >
            Email Address
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-forest/40">
              mail
            </span>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="alex@luxury.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              className="w-full rounded-xl border border-forest/10 bg-cream/30 py-3.5 pr-4 pl-12 text-forest outline-none transition-all placeholder:text-forest/30 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-slate-100"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="role-traveler"
            className="text-sm font-bold uppercase tracking-wider"
          >
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="cursor-pointer">
              <span className="sr-only">Traveler</span>
              <input
                id="role-traveler"
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleInputChange}
                disabled={isLoading}
                className="peer hidden"
              />
              <div className="flex items-center justify-center gap-2 rounded-xl border border-forest/10 bg-cream/30 py-3 text-sm font-semibold text-forest/60 transition-all peer-checked:border-forest peer-checked:bg-forest peer-checked:text-white">
                <span className="material-symbols-outlined text-lg">
                  person
                </span>
                <span>Traveler</span>
              </div>
            </label>

            <label className="cursor-pointer">
              <span className="sr-only">Admin</span>
              <input
                id="role-admin"
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleInputChange}
                disabled={isLoading}
                className="peer hidden"
              />
              <div className="flex items-center justify-center gap-2 rounded-xl border border-forest/10 bg-cream/30 py-3 text-sm font-semibold text-forest/60 transition-all peer-checked:border-forest peer-checked:bg-forest peer-checked:text-white">
                <span className="material-symbols-outlined text-lg">
                  storefront
                </span>
                <span>Admin</span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-bold uppercase tracking-wider"
          >
            Password
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-forest/40">
              lock
            </span>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              className="w-full rounded-xl border border-forest/10 bg-cream/30 py-3.5 pr-4 pl-12 text-forest outline-none transition-all placeholder:text-forest/30 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-slate-100"
            />
          </div>
          <p className="text-xs text-forest/50">
            At least 8 characters with uppercase, lowercase & numbers
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirm-password"
            className="text-sm font-bold uppercase tracking-wider"
          >
            Confirm Password
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-forest/40">
              lock_check
            </span>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Re-type your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              className="w-full rounded-xl border border-forest/10 bg-cream/30 py-3.5 pr-4 pl-12 text-forest outline-none transition-all placeholder:text-forest/30 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-slate-100"
            />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            disabled={isLoading}
            required
            className="mt-1 h-4 w-4 rounded border-forest/20 text-primary"
          />
          <label htmlFor="terms" className="text-xs text-forest/60">
            I agree to TREVTHA&apos;s{" "}
            <Link href="#" className="font-bold text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="font-bold text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex h-14 items-center justify-center gap-2 rounded-xl bg-forest font-bold text-cream shadow-lg shadow-forest/20 transition-all hover:brightness-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined animate-spin">
                progress_activity
              </span>
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <span>Create My Account</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </>
          )}
        </button>

        <div className="mt-8 text-center">
          <p className="text-sm text-forest/60">
            Already have an account?
            <Link
              href="/login"
              className="ml-1 font-bold text-primary underline-offset-4 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
