import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-cream text-forest">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-130 rounded-2xl border border-forest/5 bg-white p-8 shadow-xl shadow-forest/5 md:p-12">
          <div className="mb-8 flex flex-col items-center">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJkDvykHDxivmrldFn_nyIU0kqq2vOhWWZs8w-nL7RQCCqfgnXUYakTud5_Ha8_1TsDYGJQJEvNdbwS8UZhF7gr7UU4Sf0mqrsA7i1McdFbZb_PUQpVBpuutL4ETXWAnGMzcfJbxA4Hkw7jXoob_6YG-Z8jRHMPVgmDwyLrWxwH5mhZRRdZl4V9bxHF9VFqgw1JiHz8oXPOftA1Spe9zNUq2uolyX7eVYoo4Z3CGh4hSwYQyju3uUQqMuqWO-JUk26c2D8fWgTLqOE"
              alt="TREVTHA Logo"
              width={190}
              height={64}
              className="mb-4 h-16 w-auto object-contain"
            />
            <h1 className="text-center text-3xl font-extrabold tracking-tight">
              Create Your Account
            </h1>
            <p className="mt-2 text-center text-base text-forest/60">
              Step into a world of curated luxury travel experiences.
            </p>
          </div>

          <RegisterForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
