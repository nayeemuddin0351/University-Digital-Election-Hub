import { useState } from "react";
import { Link, useLocation } from "wouter";
import clsx from "clsx";
import { useTheme } from "@/lib/theme";

const LOGO_URL = "/logo.png";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentTheme, setTheme, themes } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);

  const navLinks: { href: string; label: string }[] = [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-nav border-b border-line h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="RMSTU Logo" className="h-8 w-8 rounded-lg" />
          <span className="text-fg font-black text-sm uppercase tracking-tighter">
            RMSTU Election Hub
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location === link.href
                  ? "bg-orange-500 text-white"
                  : "text-muted hover:text-fg hover:bg-page"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/login/admin"
            className="px-5 py-2 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm rounded-lg transition-all duration-200 active:scale-95"
          >
            SIGN IN
          </Link>

          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="w-8 h-8 rounded-full border border-line flex items-center justify-center hover:scale-110 transition-transform"
              style={{ background: currentTheme.page }}
              aria-label="Switch theme"
              title={currentTheme.name}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: currentTheme.muted }} />
            </button>
            {themeOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setThemeOpen(false)} />
                <div className="absolute right-0 top-full mt-2 bg-card border border-line rounded-xl p-3 shadow-2xl z-20 w-64">
                  <p className="text-dim text-[10px] uppercase tracking-widest font-bold px-1 mb-2">Theme</p>
                  <div className="grid grid-cols-2 gap-1">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id); setThemeOpen(false); }}
                        className={clsx(
                          "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors",
                          currentTheme.id === t.id
                            ? "text-fg bg-page"
                            : "text-muted hover:text-fg hover:bg-page"
                        )}
                      >
                        <span
                          className="w-6 h-6 rounded-full border border-line flex-shrink-0 flex items-center justify-center"
                          style={{ background: t.page }}
                        >
                          <span className="block w-2 h-2 rounded-full" style={{ background: t.muted }} />
                        </span>
                        <span className="font-medium leading-none pt-0.5">{t.name}</span>
                        {currentTheme.id === t.id && (
                          <svg className="w-3 h-3 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          {/* Mobile theme trigger */}
          <div className="relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="w-7 h-7 rounded-full border border-line"
              style={{ background: currentTheme.page }}
              aria-label="Switch theme"
            />
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-muted hover:text-fg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-line">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location === link.href
                    ? "bg-orange-500 text-white"
                    : "text-muted hover:text-fg hover:bg-page"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full px-3 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm rounded-lg text-center transition-all"
            >
              SIGN IN
            </Link>
            <div className="pt-2 border-t border-line">
              <p className="text-dim text-xs uppercase tracking-wider font-bold px-3 mb-2">Theme</p>
              <div className="grid grid-cols-5 gap-2 px-3">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setMobileMenuOpen(false); }}
                    className={clsx(
                      "w-8 h-8 rounded-full border transition-transform hover:scale-110",
                      currentTheme.id === t.id ? "border-orange-500 ring-2 ring-orange-500/30" : "border-line"
                    )}
                    style={{ background: t.page }}
                    title={t.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
