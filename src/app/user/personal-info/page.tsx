"use client";

import { useState } from "react";
import UserDashboardHeader from "@/components/user/UserDashboardHeader";
import UserDashboardFooter from "@/components/user/UserDashboardFooter";

type UserProfile = {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  identityNumber: string;
  address: string;
  memberSince: string;
};

const defaultProfile: UserProfile = {
  fullName: "Alexander V. Trevane",
  username: "alextrevane_lux",
  email: "alexander.v@trevtha.com",
  phone: "+1 (555) 782-9901",
  gender: "Male",
  dateOfBirth: "1988-05-14",
  identityNumber: "",
  address: "",
  memberSince: "January 2024",
};

export default function PersonalInfoPage() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem("trevtha_user_profile");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Return default on error
    }
    return defaultProfile;
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveChanges = () => {
    localStorage.setItem("trevtha_user_profile", JSON.stringify(profile));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    const stored = localStorage.getItem("trevtha_user_profile");
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      setProfile(defaultProfile);
    }
  };
  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Banner Section */}
        <div className="relative h-48 w-full bg-forest overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-forest to-forest/40"></div>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCw324vMhnvaBt7-vDmDMnhYVnB9U5eyH2_wQdWHPnW8nYH6PEmD6gwvEMfXcyIvXrLNqOMa13OAdkfY7Gst-Ok9XASQrIdY8-oJuC08bUwzo0If51v0G5lpfM0V0VhnzmjMihEGBzqvWTG5_KTzB9Uf7pC6jOObgzqmPzkVjix3C2UszjHiBK2DmmAwH_kwVxLAbAfjUZh1Y-EFbNVfmzjWNOzL1yH7-MKYWeyp8U1oeJ_t6avTEuKig9gIPCDLYZ2g94eJYoa3YEg')`,
            }}
          />
        </div>

        {/* Profile Header */}
        <div className="max-w-5xl mx-auto px-6 lg:px-12 -mt-16 relative z-10">
          <div className="bg-white rounded-xl shadow-sm border border-primary/10 p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-background-light">
                <img
                  alt="User Profile"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtas3DnO4ORll75CBar5y9Eqn9wSjtHcfJ3mGnTPIPj_9OPNSyPoH0GSo4tGBwgPyMwGSv3h9b5vd2Jv6vNpn0tOyntfdFlW-6011Wd0Hu-5L7RRAM2NHXsz3iDLMWYhrPnLeXm34TrLekcKDeTT9ObDUpzhhBwprImNyc0S8VFAqYtcMvs8DPFwDPkFBLFZz8TnfD0u-ZF29bLPg-YROmlHfSvER6skyAJrL15nrajtJvoK0Wd0nxS33Vca2bFrSAKsLLU-Qv7TPm"
                />
              </div>
              <button className="absolute bottom-0 right-0 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm">
                  photo_camera
                </span>
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-forest">
                {profile.fullName}
              </h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                  <span className="material-symbols-outlined text-[14px]">
                    verified
                  </span>
                  Email Verified: Success
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                  <span className="material-symbols-outlined text-[14px]">
                    calendar_today
                  </span>
                  Member Since: January 2024
                </span>
              </div>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md text-sm">
              Change Photo
            </button>
          </div>

          {/* Form Content */}
          <div className="mt-8 space-y-8 pb-12">
            {/* Personal Details Section */}
            <section className="bg-white rounded-xl border border-primary/10 overflow-hidden">
              <div className="bg-background-light px-6 py-4 border-b border-primary/10">
                <h3 className="font-bold text-forest flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    account_circle
                  </span>
                  Personal Details
                </h3>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="text-xs font-bold text-charcoal/60 uppercase tracking-wider"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full border border-primary/20 focus:border-primary focus:ring-primary/20 rounded-lg text-sm p-3 bg-white"
                      type="text"
                      value={profile.fullName}
                      onChange={(e) =>
                        setProfile({ ...profile, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="username"
                      className="text-xs font-bold text-charcoal/60 uppercase tracking-wider"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <input
                        className="w-full border border-primary/10 bg-background-light text-charcoal/50 rounded-lg text-sm p-3 cursor-not-allowed"
                        readOnly
                        type="text"
                        value={profile.username}
                      />
                      <span className="absolute right-3 top-3 material-symbols-outlined text-charcoal/30 text-sm">
                        lock
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold text-charcoal/60 uppercase tracking-wider"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        className="w-full border border-green-500/30 focus:border-primary focus:ring-primary/20 rounded-lg text-sm p-3 pr-10"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                      <span className="absolute right-3 top-3 material-symbols-outlined text-green-500 text-sm">
                        check_circle
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal/60 uppercase tracking-wider">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      className="w-full border border-primary/20 focus:border-primary focus:ring-primary/20 rounded-lg text-sm p-3"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="gender"
                      className="text-xs font-bold text-charcoal/60 uppercase tracking-wider"
                    >
                      Gender
                    </label>
                    <select
                      className="w-full border border-primary/20 focus:border-primary focus:ring-primary/20 rounded-lg text-sm p-3"
                      value={profile.gender}
                      onChange={(e) =>
                        setProfile({ ...profile, gender: e.target.value })
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other / Prefer not to say</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="dob"
                      className="text-xs font-bold text-charcoal/60 uppercase tracking-wider"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="w-full border border-primary/20 focus:border-primary focus:ring-primary/20 rounded-lg text-sm p-3"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) =>
                        setProfile({ ...profile, dateOfBirth: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Travel Info Section */}
            <section className="bg-white rounded-xl border border-primary/10 overflow-hidden">
              <div className="bg-background-light px-6 py-4 border-b border-primary/10">
                <h3 className="font-bold text-forest flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    travel
                  </span>
                  Travel Complementary Info
                </h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2 max-w-md">
                  <label className="text-xs font-bold text-charcoal/60 uppercase tracking-wider">
                    Identity Number (NIK / Passport)
                  </label>
                  <input
                    className="w-full border border-primary/20 focus:border-primary focus:ring-primary/20 rounded-lg text-sm p-3"
                    placeholder="Enter NIK or Passport Number"
                    type="text"
                    value={profile.identityNumber}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        identityNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-charcoal/60 uppercase tracking-wider">
                    Full Address
                  </label>
                  <textarea
                    className="w-full border border-primary/20 focus:border-primary focus:ring-primary/20 rounded-lg text-sm p-3"
                    placeholder="Street name, Building No, City, Country, ZIP Code"
                    rows={3}
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Footer Actions */}
            {saveSuccess && (
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3 text-green-700">
                <span className="material-symbols-outlined text-lg">
                  check_circle
                </span>
                <span className="font-semibold">
                  Your profile has been updated successfully!
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-primary/10 pt-8">
              <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-8 py-3 rounded-lg border border-primary/40 text-charcoal font-semibold hover:bg-background-light transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="w-full sm:w-auto px-10 py-3 rounded-lg bg-forest text-white border-2 border-primary font-bold hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">save</span>{" "}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <UserDashboardFooter />
    </div>
  );
}
