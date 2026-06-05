import { useState } from 'react';
import { influentialBooks } from '@/data/influential';
import type { InfluentialAuthor, LiteratureCategory } from '@/data/influential';
import { ChevronDown, ChevronUp } from 'lucide-react';

/* ---------- Discipline Nav ---------- */
function DisciplineNav({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 flex-wrap">
      {influentialBooks.map((d) => (
        <button
          key={d.id}
          onClick={() => onChange(d.id)}
          className={`font-mono text-xs md:text-sm px-4 md:px-6 py-2 md:py-2.5 border transition-colors ${
            active === d.id ? 'border-[#c8a45e] text-[#c8a45e]' : 'border-[#30363d] text-[#8b949e] hover:border-[#484f58]'
          }`}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Author Entry ---------- */
function AuthorEntry({ author }: { author: InfluentialAuthor }) {
  const [expandedWork, setExpandedWork] = useState<string | null>(null);

  return (
    <div className="mb-5">
      {/* Author name */}
      <h3 className="text-sm md:text-base font-bold text-[#f0f6fc]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
        {author.name}
      </h3>
      {/* English name */}
      <p className="text-[10px] text-[#484f58] font-mono mb-2">{author.nameEn}</p>

      {/* Works */}
      <div className="space-y-1">
        {author.works.map((work) => (
          <div key={work.title}>
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setExpandedWork(expandedWork === work.title ? null : work.title)}
            >
              <span className="text-xs md:text-sm text-[#c0cdd9] group-hover:text-[#c8a45e] transition-colors">
                {work.title}
              </span>
              <span className="font-mono text-[10px] text-[#484f58]">({work.year})</span>
              <span className="text-[#484f58] group-hover:text-[#c8a45e] transition-colors ml-auto">
                {expandedWork === work.title ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </span>
            </div>
            {/* Expandable note — read-only display */}
            {expandedWork === work.title && work.note && (
              <div className="mt-1.5 mb-2 border-l-2 border-[#30363d] pl-3">
                <p className="text-xs text-[#8b949e] italic leading-relaxed">{work.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Categorized Page ---------- */
function CategorizedPage({ categories }: { categories?: LiteratureCategory[] }) {
  const [activeSub, setActiveSub] = useState(categories?.[0]?.id ?? '');
  const sub = categories?.find((c) => c.id === activeSub);

  return (
    <div>
      {/* Sub category tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#30363d] pb-0">
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveSub(cat.id)}
            className={`px-3 md:px-4 py-2 md:py-2.5 font-mono text-[10px] md:text-xs tracking-wider uppercase transition-colors border-b-2 -mb-px ${
              activeSub === cat.id ? 'text-[#c8a45e] border-[#c8a45e]' : 'text-[#8b949e] border-transparent hover:text-[#f0f6fc]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {sub && (
        <div className="max-w-3xl">
          {sub.authors.length === 0 ? (
            <div className="text-center py-16 text-[#484f58] font-mono text-xs">待填充</div>
          ) : (
            <div>
              {sub.authors.map((author) => (
                <AuthorEntry key={`${sub.id}-${author.name}`} author={author} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Main Page ---------- */
export default function InfluentialPage() {
  const [activeDiscipline, setActiveDiscipline] = useState('literature');
  const discipline = influentialBooks.find((d) => d.id === activeDiscipline);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <DisciplineNav active={activeDiscipline} onChange={setActiveDiscipline} />

      {discipline?.id === 'literature' && <CategorizedPage categories={discipline.categories} />}
      {discipline?.id === 'philosophy' && <CategorizedPage categories={discipline.categories} />}
      {discipline?.id === 'social-theory' && <CategorizedPage categories={discipline.categories} />}
    </div>
  );
}
