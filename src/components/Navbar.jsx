import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "功能", href: "#features" },
  { label: "地圖", href: "#map" },
  { label: "任務", href: "#tasks" },
  { label: "社群", href: "#community" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-cyan rounded-full" />
            <span className="font-display font-bold text-lg tracking-wider">
              <span className="text-foreground">NEON</span>
              <span className="text-neon-cyan">CITY</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="text-sm font-display uppercase tracking-wider text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button className="px-5 py-2 bg-neon-cyan text-background text-sm font-display font-bold uppercase tracking-wider hover:bg-neon-cyan/80 transition-colors">
              下載
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/30">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="block text-sm font-display uppercase tracking-wider text-muted-foreground hover:text-neon-cyan transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="w-full px-5 py-3 bg-neon-cyan text-background text-sm font-display font-bold uppercase tracking-wider">
              下載 App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
