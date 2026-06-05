import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { path: '/', label: '简介' },
  { path: '/blog', label: '博文' },
  { path: '/books', label: '书籍' },
  { path: '/music', label: '音乐' },
  { path: '/research', label: '研究' },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-mono text-xs md:text-sm tracking-widest text-[#f0f6fc] hover:text-[#c8a45e] transition-colors uppercase"
          >
            <span className="text-[#c8a45e]">&lt;</span>
            MQ
            <span className="text-[#484f58]">.</span>
            dev
            <span className="text-[#c8a45e]"> /&gt;</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-mono text-[11px] tracking-wider uppercase px-3 py-2 transition-all duration-200 ${
                    isActive
                      ? 'text-[#c8a45e]'
                      : 'text-[#8b949e] hover:text-[#f0f6fc]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c8a45e]" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#8b949e] hover:text-[#c8a45e] transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d1117]/98 backdrop-blur-md border-t border-[#30363d]">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block font-mono text-xs tracking-wider uppercase py-2.5 px-3 transition-colors ${
                  location.pathname === item.path
                    ? 'text-[#c8a45e] bg-[#c8a45e]/5'
                    : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22]'
                }`}
              >
                {location.pathname === item.path && (
                  <span className="inline-block w-1 h-1 rounded-full bg-[#c8a45e] mr-2 align-middle" />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
