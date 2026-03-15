"use client";

import { useState, useEffect } from "react";
import UserDashboardHeader from "@/components/user/UserDashboardHeader";

type SecuritySettings = {
  twoFactorAuthEnabled: boolean;
  emailVerificationEnabled: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const defaultSecuritySettings: SecuritySettings = {
  twoFactorAuthEnabled: false,
  emailVerificationEnabled: false,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function SecurityPage() {
  const [settings, setSettings] = useState<SecuritySettings>(() => {
    try {
      const stored = localStorage.getItem("trevtha_user_security");
      if (stored) {
        return JSON.parse(stored) as SecuritySettings;
      }
    } catch {
      // Return defaults on malformed local storage
    }
    return defaultSecuritySettings;
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem("trevtha_user_security", JSON.stringify(settings));
  }, [settings]);

  const handlePasswordUpdate = () => {
    setPasswordError("");

    // Validation
    if (
      !settings.currentPassword ||
      !settings.newPassword ||
      !settings.confirmPassword
    ) {
      setPasswordError("Please fill in all password fields");
      return;
    }

    if (settings.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long");
      return;
    }

    if (!/[A-Z]/.test(settings.newPassword)) {
      setPasswordError(
        "New password must contain at least one uppercase letter",
      );
      return;
    }

    if (!/\d/.test(settings.newPassword)) {
      setPasswordError("New password must contain at least one number");
      return;
    }

    if (settings.newPassword !== settings.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // This API currently does not expose a change-password endpoint.
    setPasswordError(
      "Password change is not available from API yet. Endpoint change-password/update-password is not provided by backend.",
    );
  };

  const handleToggle2FA = () => {
    setSettings({
      ...settings,
      twoFactorAuthEnabled: !settings.twoFactorAuthEnabled,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };
  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 max-w-5xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-forest text-4xl font-black tracking-tight mb-2">
            Security Settings
          </h1>
          <p className="text-forest/60 text-lg">
            Safeguard your account and manage authentication preferences.
          </p>
        </div>

        {/* Verification Status Badges */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200">
            <span className="material-symbols-outlined text-[20px]">
              verified_user
            </span>
            <span className="text-sm font-bold">Email Verified</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200">
            <span className="material-symbols-outlined text-[20px]">
              verified_user
            </span>
            <span className="text-sm font-bold">Phone Verified</span>
          </div>
          <button className="text-primary hover:underline text-sm font-semibold ml-auto">
            Resend Verification Link
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Change Password Section */}
          <section className="bg-white rounded-xl shadow-sm border border-forest/5 overflow-hidden">
            <div className="p-6 border-b border-forest/5 bg-forest/5">
              <h2 className="text-forest text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  key
                </span>
                Change Password
              </h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {saveSuccess && (
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2 text-green-700 text-sm">
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    <span className="font-semibold">
                      Password updated successfully!
                    </span>
                  </div>
                )}
                {passwordError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-sm">
                    <span className="material-symbols-outlined">error</span>
                    <span className="font-semibold">{passwordError}</span>
                  </div>
                )}
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2 text-amber-700 text-sm">
                  <span className="material-symbols-outlined">info</span>
                  <span className="font-semibold">
                    Note: travel journal API currently supports login/register and
                    profile update, but not password update endpoint.
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-bold text-forest mb-2"
                  >
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    className="w-full rounded-lg border border-forest/10 focus:border-primary focus:ring-primary h-12 bg-cream/30"
                    placeholder="••••••••••••"
                    type="password"
                    value={settings.currentPassword}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-bold text-forest mb-2"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    className="w-full rounded-lg border border-forest/10 focus:border-primary focus:ring-primary h-12 bg-cream/30"
                    placeholder="••••••••••••"
                    type="password"
                    value={settings.newPassword}
                    onChange={(e) =>
                      setSettings({ ...settings, newPassword: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-new-password"
                    className="block text-sm font-bold text-forest mb-2"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-new-password"
                    className="w-full rounded-lg border border-forest/10 focus:border-primary focus:ring-primary h-12 bg-cream/30"
                    placeholder="••••••••••••"
                    type="password"
                    value={settings.confirmPassword}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  onClick={handlePasswordUpdate}
                  className="bg-forest text-primary font-bold px-8 py-3 rounded-lg hover:bg-forest/90 transition-all shadow-md shadow-forest/10"
                >
                  Update Password
                </button>
              </div>
              <div className="bg-cream rounded-xl p-6 border border-primary/20">
                <h4 className="text-forest font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    info
                  </span>
                  Security Tips
                </h4>
                <ul className="space-y-3 text-sm text-forest/70">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-green-600 text-sm mt-1">
                      check_circle
                    </span>
                    <span>At least 8 characters long (more is better).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-green-600 text-sm mt-1">
                      check_circle
                    </span>
                    <span>Include at least one uppercase letter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-green-600 text-sm mt-1">
                      check_circle
                    </span>
                    <span>
                      Include numbers and special symbols (e.g., @, #, $).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-green-600 text-sm mt-1">
                      check_circle
                    </span>
                    <span>Avoid using common words or personal info.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Two-Factor Authentication */}
          <section className="bg-white rounded-xl shadow-sm border border-forest/5 overflow-hidden">
            <div className="p-6 border-b border-forest/5 bg-forest/5">
              <h2 className="text-forest text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  security
                </span>
                Two-Factor Authentication (2FA)
              </h2>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-xl border-2 border-primary/20 bg-cream/50">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      smartphone
                    </span>
                  </div>
                  <div>
                    <h4 className="text-forest font-bold">Authenticator App</h4>
                    <p className="text-forest/60 text-sm max-w-md">
                      Use an app like Google Authenticator or Authy to receive
                      secure verification codes.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-forest/40">
                    {settings.twoFactorAuthEnabled ? "ON" : "OFF"}
                  </span>
                  <button
                    onClick={handleToggle2FA}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.twoFactorAuthEnabled
                        ? "bg-primary"
                        : "bg-forest/10"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.twoFactorAuthEnabled
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    ></span>
                  </button>
                  <span className="text-sm font-bold text-forest">
                    {settings.twoFactorAuthEnabled ? "ON" : "OFF"}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-xl border border-forest/5 bg-white">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-forest/5 flex items-center justify-center text-forest/40">
                    <span className="material-symbols-outlined text-3xl">
                      mail
                    </span>
                  </div>
                  <div>
                    <h4 className="text-forest font-bold">
                      Email Verification
                    </h4>
                    <p className="text-forest/60 text-sm max-w-md">
                      Receive a 6-digit verification code to your registered
                      email address.
                    </p>
                  </div>
                </div>
                <button className="text-primary font-bold text-sm border-2 border-primary px-6 py-2 rounded-lg hover:bg-primary/10 transition-colors">
                  Configure Email
                </button>
              </div>
            </div>
          </section>

          {/* Login Activity */}
          <section className="bg-white rounded-xl shadow-sm border border-forest/5 overflow-hidden">
            <div className="p-6 border-b border-forest/5 bg-forest/5 flex items-center justify-between">
              <h2 className="text-forest text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  devices
                </span>
                Login Activity
              </h2>
              <button className="text-red-600 text-sm font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                Logout from all devices
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-cream/50 text-forest/40 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-8 py-4">Device</th>
                    <th className="px-8 py-4">Location</th>
                    <th className="px-8 py-4">Last Active</th>
                    <th className="px-8 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/5">
                  <tr className="hover:bg-cream/20 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-forest/60">
                          laptop_mac
                        </span>
                        <div>
                          <p className="text-forest font-bold text-sm">
                            MacBook Pro - Chrome
                          </p>
                          <p className="text-xs text-green-600 font-medium">
                            Current Session
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-forest/70 font-medium">
                      Jakarta, Indonesia
                    </td>
                    <td className="px-8 py-5 text-sm text-forest/70 font-medium">
                      Active Now
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-forest/30 material-symbols-outlined">
                        more_horiz
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-cream/20 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-forest/60">
                          smartphone
                        </span>
                        <div>
                          <p className="text-forest font-bold text-sm">
                            iPhone 14 Pro - Trevtha App
                          </p>
                          <p className="text-xs text-forest/40">
                            Mobile Application
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-forest/70 font-medium">
                      Singapore
                    </td>
                    <td className="px-8 py-5 text-sm text-forest/70 font-medium">
                      2 hours ago
                    </td>
                    <td className="px-8 py-5">
                      <button className="text-red-600 text-sm font-bold">
                        Logout
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-cream/20 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-forest/60">
                          desktop_windows
                        </span>
                        <div>
                          <p className="text-forest font-bold text-sm">
                            Windows Desktop - Edge
                          </p>
                          <p className="text-xs text-forest/40">Browser</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-forest/70 font-medium">
                      London, UK
                    </td>
                    <td className="px-8 py-5 text-sm text-forest/70 font-medium">
                      Oct 12, 2023
                    </td>
                    <td className="px-8 py-5">
                      <button className="text-red-600 text-sm font-bold">
                        Logout
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-red-50/30 rounded-xl shadow-sm border-2 border-red-100 overflow-hidden">
            <div className="p-6 border-b border-red-100 bg-red-50/50">
              <h2 className="text-red-700 text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">
                  report_problem
                </span>
                Danger Zone
              </h2>
            </div>
            <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h4 className="text-forest font-bold">Delete Account</h4>
                <p className="text-forest/60 text-sm mt-1 max-w-xl">
                  Permanently delete your TREVTHA account and all associated
                  data. This action is irreversible. All active bookings and
                  loyalty points will be lost.
                </p>
              </div>
              <button className="bg-red-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-red-700 transition-all shadow-md shadow-red-200">
                Deactivate Account
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Credit */}
      <footer className="bg-white border-t border-forest/5 p-8 text-center">
        <p className="text-forest/40 text-xs font-medium">
          © 2023 TREVTHA Luxury Travel Marketplace. All rights reserved. Secure
          256-bit SSL encrypted.
        </p>
      </footer>
    </div>
  );
}
