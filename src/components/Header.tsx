import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/20 bg-forest px-6 py-4 md:px-20 lg:px-40">
      <div className="flex items-center">
        <div className="relative h-20 w-80 -ml-16">
          <Image
            src="/trevtha.png"
            alt="TREVTHA Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <nav className="hidden md:flex flex-1 justify-center gap-8">
        <Link
          className="text-white hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-white hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider"
          href="/destinations"
        >
          Destinations
        </Link>
        <Link
          className="text-white hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider"
          href="/tours"
        >
          Tours
        </Link>
        <Link
          className="text-white hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider"
          href="/promo"
        >
          Promo/ Deals
        </Link>
        <Link
          className="text-white hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider"
          href="/help"
        >
          Help
        </Link>
        <Link
          className="text-white hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider"
          href="/about"
        >
          About
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden sm:flex min-w-25 cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-transparent border border-primary/50 text-primary text-sm font-bold hover:bg-primary/10 transition-all"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="flex min-w-25 cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-forest text-sm font-bold hover:brightness-110 transition-all shadow-md"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
