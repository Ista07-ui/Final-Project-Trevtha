import UserDashboardHeader from "@/components/user/UserDashboardHeader";
import UserProfileBanner from "@/components/user/UserProfileBanner";
import UserSidebar from "@/components/user/UserSidebar";
import UserCartNotification from "@/components/user/UserCartNotification";
import UserStatusWidgets from "@/components/user/UserStatusWidgets";
import UserPaymentMethods from "@/components/user/UserPaymentMethods";
import UserRecentlyViewed from "@/components/user/UserRecentlyViewed";
import UserCurrentOffers from "@/components/user/UserCurrentOffers";
import UserWishlist from "@/components/user/UserWishlist";
import UserDashboardFooter from "@/components/user/UserDashboardFooter";

export default function UserDashboardPage() {
  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Header Profile Section */}
        <UserProfileBanner />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16 md:mt-24">
          {/* Sidebar Navigation */}
          <UserSidebar />

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* Cart Notification */}
            <UserCartNotification />

            {/* Status Widgets */}
            <UserStatusWidgets />

            {/* Payment Methods & Rewards */}
            <UserPaymentMethods />

            {/* Recently Viewed */}
            <UserRecentlyViewed />

            {/* Current Offers */}
            <UserCurrentOffers />

            {/* Wishlist */}
            <UserWishlist />
          </div>
        </div>
      </main>

      {/* Footer */}
      <UserDashboardFooter />
    </div>
  );
}
