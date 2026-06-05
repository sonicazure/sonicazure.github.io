import { useState } from 'react';
import { resonanceCategories } from '@/data/music';
import { Music } from 'lucide-react';

export default function ResonancePage() {
  const [activeCat, setActiveCat] = useState(resonanceCategories[0].id);
  const current = resonanceCategories.find((c) => c.id === activeCat);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 flex-wrap">
        {resonanceCategories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)}
            className={`font-mono text-xs md:text-sm px-4 md:px-6 py-2 md:py-2.5 border transition-colors ${activeCat === cat.id ? 'border-[#c8a45e] text-[#c8a45e]' : 'border-[#30363d] text-[#8b949e] hover:border-[#484f58]'}`}>
            {cat.label}
          </button>
        ))}
      </div>

      {current && (
        <>
          <p className="text-xs md:text-sm text-[#8b949e] mb-6 md:mb-8 italic">{current.description}</p>
          {current.items.length === 0 ? (
            <div className="text-center py-20">
              <Music size={24} className="text-[#30363d] mx-auto mb-3" />
              <p className="text-sm text-[#8b949e] mb-1">{current.label}</p>
              <p className="font-mono text-[10px] text-[#30363d]">待填充</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {current.items.map((item) => (
                <div key={item.name} className="card-academic p-3 text-center">
                  <p className="text-xs text-[#f0f6fc]">{item.name}</p>
                  {item.note && <p className="text-[10px] text-[#8b949e] mt-1">{item.note}</p>}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
