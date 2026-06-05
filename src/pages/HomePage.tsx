import { useEffect, useState } from 'react';
import {
  profileData,
  academicTraining,
  researchAreas,
  researchDirections,
  whiteCollarWorks,
  blueCollarHeader,
  blueCollarWorks,
} from '@/data';
import HeroCanvas from '@/components/HeroCanvas';

/** Simple markdown-like renderer */
function RenderLine({ text }: { text: string }) {
  // Parse **bold** and *italic*
  const parts: React.ReactNode[] = [];
  let key = 0;

  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++}>{text.slice(lastIndex, match.index)}</span>
      );
    }
    if (match[1]) {
      parts.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={key++}>{match[4]}</em>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  if (parts.length === 0) return <>{text}</>;
  return <>{parts}</>;
}

/* ---------- computed stats from real data ---------- */
function useRealStats() {
  const [counts, setCounts] = useState({ blog: 0, books: 0, music: 0, research: 0 });
  useEffect(() => {
    Promise.all([
      import('@/data/blog').then((m) => m.blogPosts.length),
      import('@/data/annualBooks').then((m) => m.annualBestBooks.flatMap((a) => a.books).length),
      import('@/data/music').then((m) => m.musicAlbums.length),
      import('@/data/research').then((m) => m.researchProjects.length),
    ]).then(([blog, books, music, research]) => setCounts({ blog, books, music, research }));
  }, []);
  return [
    { label: '博文', value: counts.blog },
    { label: '书籍', value: counts.books },
    { label: '音乐', value: counts.music },
    { label: '研究', value: counts.research },
  ];
}

/* ---------- HomePage ---------- */
export default function HomePage() {
  const [heroVisible, setHeroVisible] = useState(true);
  const stats = useRealStats();

  useEffect(() => {
    const handleScroll = () => setHeroVisible(window.scrollY < window.innerHeight * 0.5);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="section-title text-lg md:text-xl mb-5 md:mb-6">{children}</h2>
  );

  const FlagSpan = ({ flags }: { flags: string }) => (
    <span className="emoji text-base md:text-lg leading-none select-none whitespace-nowrap inline-block">{flags}</span>
  );

  /* WorkEntry row: flags left-anchored, text aligned, single-line height */
  const WorkRow = ({ flags, children }: { flags: string; children: React.ReactNode }) => (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0 text-right" style={{ width: '6ch', minWidth: '6ch' }}>
        <FlagSpan flags={flags} />
      </div>
      <div className="text-xs md:text-sm text-[#f0f6fc]">{children}</div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroCanvas />
        <div
          className="relative z-10 text-center px-6 pointer-events-none"
          style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.6s ease' }}
        >
          <div className="backdrop-hero bg-[#161b22]/50 border border-[#30363d]/60 px-6 py-8 md:px-8 md:py-10 max-w-2xl mx-auto">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Noto Serif SC', serif", color: '#f0f6fc' }}
            >
              {profileData.name}
            </h1>
            <p className="font-mono text-[10px] md:text-xs text-[#8b949e] tracking-wider">
              {profileData.nameEn}
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="font-mono text-[10px] md:text-xs text-[#c8a45e] tracking-wider">
                INFRASTRUCTURE · MATERIALITY · SOCIAL THEORY
              </span>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-[#484f58] tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#30363d] to-transparent" />
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Name & Links & Portrait */}
          <div className="mb-10 md:mb-12">
            <div className="flex items-start gap-4 md:gap-6">
              {/* Portrait */}
              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded overflow-hidden border border-[#30363d]">
                <img
                  src="/images/portrait.jpg"
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 md:gap-4 mb-2">
                  <h2
                    className="text-xl md:text-2xl font-bold text-[#f0f6fc]"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {profileData.name}
                  </h2>
                  <span className="font-mono text-[10px] md:text-xs text-[#484f58] tracking-wider">
                    {profileData.nameEn}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {profileData.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      className="font-mono text-[9px] md:text-[10px] text-[#8b949e] hover:text-[#c8a45e] transition-colors uppercase tracking-wider"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-10 md:mb-12">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-number text-lg md:text-3xl">{s.value}</div>
                <div className="stat-label text-[8px] md:text-[11px]">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Module 1: 学术训练 */}
          <div className="mb-10 md:mb-12">
            <SectionTitle>学术训练</SectionTitle>
            <div className="space-y-4">
              {academicTraining.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="flex-shrink-0 text-right pt-0.5" style={{ width: '6ch', minWidth: '6ch' }}>
                    <FlagSpan flags={item.flags} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-[#f0f6fc] leading-relaxed">
                      <RenderLine text={item.degree} />
                    </p>
                    <p className="text-[10px] md:text-xs text-[#8b949e] leading-relaxed mt-0.5">
                      <RenderLine text={item.note} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module 2: 研究领域 */}
          <div className="mb-10 md:mb-12">
            <SectionTitle>研究领域</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {researchAreas.map((area) => (
                <span key={area} className="tag-green text-[10px] md:text-xs">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Module 2.5: 研究方向（详细论述） */}
          <div className="mb-10 md:mb-12">
            <SectionTitle>研究方向</SectionTitle>
            <div className="space-y-6">
              {/* 引言 */}
              <p className="text-xs md:text-sm text-[#f0f6fc] leading-relaxed">
                {researchDirections.intro}
              </p>

              {/* 轴线 */}
              {researchDirections.axes.map((axis: { title: string; titleColor: string; description: string; items: string[] }, idx: number) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[#30363d]/60 bg-[#161b22]/40 p-4 md:p-5"
                >
                  {/* 轴线标题 */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] md:text-xs font-bold tracking-wider uppercase"
                      style={{ color: axis.titleColor }}
                    >
                      {axis.title}
                    </span>
                    <span className="flex-1 h-px bg-[#30363d]/40" />
                  </div>

                  {/* 轴线描述 */}
                  <p className="text-xs md:text-sm text-[#c8d1d9] leading-relaxed mb-3">
                    {axis.description}
                  </p>

                  {/* 子项列表 */}
                  <ul className="space-y-2">
                    {axis.items.map((item: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[11px] md:text-xs text-[#8b949e] leading-relaxed"
                      >
                        <span
                          className="flex-shrink-0 mt-0.5 select-none"
                          style={{ color: axis.titleColor }}
                        >
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Module 3: 白领工作 */}
          <div className="mb-10 md:mb-12">
            <SectionTitle>白领工作</SectionTitle>
            <div className="space-y-2">
              {whiteCollarWorks.map((item, i) => (
                <WorkRow key={i} flags={item.flags}>
                  <RenderLine text={item.title} />
                </WorkRow>
              ))}
            </div>
          </div>

          {/* Module 4: 黑领工作 */}
          <div className="mb-10 md:mb-12">
            <SectionTitle>黑领工作（精选版）</SectionTitle>
            <p className="text-xs text-[#8b949e] italic mb-4">
              <RenderLine text={blueCollarHeader} />
            </p>
            <div className="space-y-2">
              {blueCollarWorks.map((item, i) => (
                <WorkRow key={i} flags={item.flags}>
                  <RenderLine text={item.title} />
                </WorkRow>
              ))}
            </div>
            <p className="text-xs text-[#484f58] mt-3">……</p>
          </div>
        </div>
      </section>
    </div>
  );
}
