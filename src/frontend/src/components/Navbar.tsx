import { Link } from "@tanstack/react-router";
import { Menu, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Coverage", href: "#coverage" },
    { label: "Pricing", href: "#pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="relative">
              <Shield className="w-8 h-8 text-teal" />
              <div
                className="absolute inset-0 animate-ping opacity-30"
                style={{ color: "#21C6B7" }}
              >
                <Shield className="w-8 h-8 text-teal" />
              </div>
            </div>
            <span className="font-bold text-lg text-white">
              Monsoon <span className="text-teal">Warrior</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.href.startsWith("/") && !link.href.includes("#") ? (
                <Link
                  key={link.label}
                  to={link.href as "/" | "/dashboard" | "/admin"}
                  className="text-sm text-[#B9C7D6] hover:text-teal transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#B9C7D6] hover:text-teal transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          {/* Auth CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm text-teal border border-[#21C6B7]/40 rounded-full hover:border-teal hover:bg-teal/10 transition-all"
              data-ocid="nav.secondary_button"
            >
              Log In
            </button>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm font-semibold text-[#06101A] rounded-full gradient-teal hover:opacity-90 transition-all"
              data-ocid="nav.primary_button"
            >
              Get Coverage
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden glass rounded-2xl mb-4 p-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#B9C7D6] hover:text-teal transition-colors py-1"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 text-sm text-teal border border-[#21C6B7]/40 rounded-full"
                  data-ocid="nav.secondary_button"
                >
                  Log In
                </button>
                <Link
                  to="/dashboard"
                  className="flex-1 px-4 py-2 text-sm font-semibold text-center text-[#06101A] rounded-full gradient-teal"
                  data-ocid="nav.primary_button"
                >
                  Get Coverage
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
