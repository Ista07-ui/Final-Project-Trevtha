"use client";

import { useAuth } from "@/hooks/useAuth";

export default function UserProfileBanner() {
  const { user } = useAuth();

  return (
    <div className="relative mb-12">
      <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYCGBc7CR9mNynSvaE1oLKfOEt38-iUapZS_VSlGYDiQDtNnPuv_ar2gPnpc7aaEqR0DaSbf5CRd5KTT3ABdNMpdhjd31NPqzNumGo1R8WmZVHYl3ngNoz0wnMfo0FJnLXKXr3KKIcV0SQJ0ObOFMUfG7ddx9Kug3NcEUAIFJ_UIlDCmksVlLE5Fe6BN0Se1QX7qVGZVJqW_xGBNueew7JFbYzeARhKl1OQZdhXRrlfqmiJ6X084zRfskYQEHsHTF5DHyCYPkUJwnY')`,
          }}
        ></div>
      </div>

      <div className="absolute left-8 z-20 flex flex-col md:flex-row gap-6 -bottom-12 items-center">
        <div className="size-28 md:size-36 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden relative">
          {user?.profilePictureUrl ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${user.profilePictureUrl}')`,
              }}
            />
          ) : (
            <div className="w-full h-full bg-accent/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-accent text-5xl">
                person
              </span>
            </div>
          )}
          <button className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="material-symbols-outlined text-white">
              photo_camera
            </span>
          </button>
        </div>
        <div className="mb-2 text-white md:mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {user?.name || "User"}
            </h1>
            <span className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[14px]">
                stars
              </span>
              Gold Member
            </span>
          </div>
          <p className="text-sm opacity-90 text-white/80">
            Member since January 2023 • Premium Tier
          </p>
        </div>
      </div>
    </div>
  );
}
