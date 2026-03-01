import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Header />

      <main className="flex min-h-[calc(100vh-220px)]">
        <section className="relative hidden w-1/2 overflow-hidden bg-forest p-12 lg:flex lg:items-center lg:justify-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-lg text-center">
            <div className="mb-12 flex justify-center"></div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-cream">
              The Global Marketplace for Extraordinary Travel
            </h1>
            <p className="text-lg leading-relaxed text-cream/70">
              Access curated luxury experiences and hidden gems across the
              globe. Join our exclusive community of world travelers.
            </p>

            <div className="mt-16 grid grid-cols-3 gap-4">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBcibY6JP6G-O4dAqiUBIEj-tDUY6Di2ytpj2BceFX4aKLweg3ia7jlTwb9VB1RqwNS2ZAa2tEgmeZr3gtLvQAxc98nLxpoWuzPLOUJcEe62KIKnNNXP2iMZ0aofpBLQNnBr6zH_e3KcQ1404mwvf1UXTY12dUD2-8P_Rihq8Zvad9_W9rlxvR-8NYRfP9LLvKn9-alGiKWEiF7qPiq2u-XT0chq1m3X6iJh22KHXPGlxgorsugtUPP6t3uNSy3uckTjvx6AAFmKKXx",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBCC3G7YcbHm75ywC7bD46RjxVkqwj36PyjtuudVMK4Qm-fKv4wn5OrV99eFKq90N4AXNYF-G7gyGcnavQrx31IZSiKOuJi2KCqi9CWbVZnwXmqkbRlbxPfUSWwV2KO4vtgTBsUx5az_RdpTAcUDDtEPSvj5OtVlNfzPESuehLvSdXbRcjbuNKc8uNSSlM3gTZKao7I1hZ29_tIKAcevP1dCbqO5g1y5IKJ8pndUrSnUt2Cik5iHSjelXdJ8-YyIDSwYGiyT9hylBHO",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDmD6rz3LzhImF-ptCxY8tnXY0_xCnZ78qVrPyTfxhur4Owo4R8cT-DVXkEr5uAPVxeKnaL9cXfDJTtC39our5DVibx4K6ujf5osrrdrQ1ziOr1PhE07Z-78A2Mn3kQb-87hR468Onk-5QZdUn4ALG96FfQddo_kIOG8Ta4iEPp9tvH73RZL01ADbqUdDPC7KltnHbuS2_ipOjv1utTzSkTL6CHjvVntvqAXcddgSLzxrPn1bXFn7fy-J4WOH41Wzjq-iKjTCYWUvWA",
              ].map((image, index) => (
                <div
                  key={image}
                  className={`aspect-square rounded-xl border border-cream/10 bg-cover bg-center ${
                    index === 1 ? "mt-8" : ""
                  }`}
                  style={{ backgroundImage: `url('${image}')` }}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-10 left-10 flex items-center gap-2 text-primary/80">
            <span className="material-symbols-outlined text-sm">public</span>
            <span className="text-xs font-semibold uppercase tracking-widest">
              Trevtha Worldwide
            </span>
          </div>
        </section>

        <section className="flex w-full flex-col justify-center bg-cream px-6 py-12 sm:px-12 lg:w-1/2 lg:px-24">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10 flex justify-center lg:hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjU_Rz0u2iAHpoAqn22Fwe0bD3V6eacUdzvMZUc1HDi1bnuU2rK3BICJ5L50hgVuK3Jsr9tHgpqyLhZDpqzEF2gddPKPmKa-wG7Ild2jf904cpNfH5kk71dIpYH42W4xPTBt1MbNdeKyjDruF0bck3eNpU0Gr3DcaEJrbHGmYrzn0EGagEWhtIe8bLL3qnbrPGDwE8TvyrATXhk5mj75H9N4xS2T7F-tbaOPTEmXe7Wul70Di5WVK_DWtiKespKVog55gbcIi1GHCA"
                alt="TREVTHA Logo"
                width={200}
                height={48}
                className="h-12 w-auto"
              />
            </div>

            <div className="mb-10">
              <h2 className="mb-2 text-3xl font-black tracking-tight text-forest">
                Welcome Back
              </h2>
              <p className="font-medium text-slate-500">
                Please enter your details to sign in
              </p>
            </div>

            <LoginForm />
          </div>

          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-slate-100 pt-10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <div className="flex gap-4">
              <Link href="#" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-primary">
                Terms of Service
              </Link>
            </div>
            <div>© 2026 TREVTHA Inc.</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
