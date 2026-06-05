import { Outlet, NavLink } from 'react-router-dom';
import { Disc3, Radio, AudioLines } from 'lucide-react';

const tabs = [
  { path: '/music/annual', label: '年度专辑', icon: Disc3 },
  { path: '/music/live', label: '私藏Live', icon: Radio },
  { path: '/music/resonance', label: '共振之音', icon: AudioLines },
];

export default function MusicPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4 md:pb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-[#f0f6fc] mb-3 md:mb-4" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
          音乐
        </h1>
        <div className="flex items-center gap-1 md:gap-2 border-b border-[#30363d] pb-0">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 font-mono text-[10px] md:text-xs tracking-wider uppercase transition-colors border-b-2 -mb-px ${
                  isActive ? 'text-[#c8a45e] border-[#c8a45e]' : 'text-[#8b949e] border-transparent hover:text-[#f0f6fc] hover:border-[#484f58]'
                }`
              }
            >
              <tab.icon size={12} />
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
