import { Github, Mail, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profileData } from '@/data';

const navLinks = [
  { to: '/', label: '简介' },
  { to: '/blog', label: '博文' },
  { to: '/books', label: '书籍' },
  { to: '/music', label: '音乐' },
  { to: '/research', label: '研究' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#30363d] bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-mono text-xs md:text-sm tracking-widest text-[#f0f6fc] hover:text-[#c8a45e] transition-colors uppercase inline-block"
            >
              <span className="text-[#c8a45e]">&lt;</span>
              MQ
              <span className="text-[#484f58]">.</span>
              dev
              <span className="text-[#c8a45e]"> /&gt;</span>
            </Link>
            <p className="mt-3 text-[10px] md:text-xs text-[#8b949e] leading-relaxed max-w-xs">
              SonicAzure的个人空间
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-[#484f58] uppercase mb-3 md:mb-4">
              导航
            </h4>
            <div className="grid grid-cols-3 gap-x-2 gap-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[10px] md:text-xs text-[#8b949e] hover:text-[#c8a45e] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-[#484f58] uppercase mb-3 md:mb-4">
              联系
            </h4>
            <div className="flex items-center gap-4">
              <a href="mailto:narrasonzy@gmail.com" className="text-[#8b949e] hover:text-[#c8a45e] transition-colors" title="Email">
                <Mail size={15} />
              </a>
              <a href="https://github.com/sonicazure" className="text-[#8b949e] hover:text-[#c8a45e] transition-colors" title="GitHub">
                <Github size={15} />
              </a>
              <a href="#" className="text-[#8b949e] hover:text-[#c8a45e] transition-colors" title="Google Scholar">
                <BookOpen size={15} />
              </a>
            </div>
            <p className="mt-4 font-mono text-[10px] text-[#484f58] tracking-wider">
              &copy; {new Date().getFullYear()} {profileData.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
