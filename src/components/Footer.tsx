import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest text-cream py-16 px-6 md:px-20 lg:px-40 border-t-4 border-primary">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <div className="relative h-20 w-80 -ml-16">
            <Image
              src="/trevtha.png"
              alt="TREVTHA Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-cream/60 text-sm leading-relaxed">
            Redefining luxury travel through curated experiences, premium
            accommodations, and personalized itineraries since 2026.
          </p>
          <div className="flex gap-4">
            <Link
              className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors"
              href="#"
            >
              <svg className="size-4 fill-primary" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </Link>
            <Link
              className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors"
              href="#"
            >
              <svg className="size-4 fill-primary" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-white font-bold mb-6">Explore</h3>
          <ul className="flex flex-col gap-4 text-cream/60 text-sm">
            <li>
              <Link className="hover:text-primary transition-colors" href="#">
                Destinations
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary transition-colors" href="#">
                Seasonal Tours
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary transition-colors" href="#">
                Luxury Cruises
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary transition-colors" href="#">
                Private Flights
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-white font-bold mb-6">Company</h3>
          <ul className="flex flex-col gap-4 text-cream/60 text-sm">
            <li>
              <Link className="hover:text-primary transition-colors" href="#">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary transition-colors" href="#">
                Partnerships
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary transition-colors" href="#">
                Careers
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary transition-colors" href="#">
                Press Room
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-white font-bold mb-6">Newsletter</h3>
          <p className="text-cream/60 text-sm mb-4">
            Subscribe to receive luxury travel insights and exclusive offers.
          </p>
          <div className="flex gap-2">
            <input
              className="bg-white/5 border-white/10 rounded-lg text-sm flex-1 focus:ring-primary focus:border-primary"
              placeholder="Your email"
              type="email"
            />
            <button className="bg-primary text-forest px-4 rounded-lg font-bold text-sm">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-cream/40 text-xs">
        <p>© 2026 TREVTHA Luxury Travel Marketplace. All rights reserved.</p>
        <div className="flex gap-6">
          <Link className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </Link>
          <Link className="hover:text-primary transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="hover:text-primary transition-colors" href="#">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
