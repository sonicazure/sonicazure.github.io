import { useState } from 'react';
import { readingHistory } from '@/data/readingHistory';
import { Calendar, BookMarked, Star, ExternalLink } from 'lucide-react';

export default function ReadingHistoryPage() {
  const [selectedYear, setSelectedYear] = useState(readingHistory[0].year);

  const current = readingHistory.find((h) => h.year === selectedYear);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Year Selector */}
      <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 flex-wrap">
        <Calendar size={12} className="text-[#484f58]" />
        {readingHistory.map((h) => (
          <button
            key={h.year}
            onClick={() => setSelectedYear(h.year)}
            className={`font-mono text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 border transition-colors ${
              selectedYear === h.year
                ? 'border-[#c8a45e] text-[#c8a45e]'
                : 'border-[#30363d] text-[#8b949e] hover:border-[#484f58]'
            }`}
          >
            {h.year}
          </button>
        ))}
      </div>

      {current && (
        <>
          {/* Stats */}
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <BookMarked size={12} className="text-[#c8a45e]" />
            <span className="font-mono text-[10px] md:text-xs text-[#8b949e]">
              共 {current.total} 本
            </span>
            <span className="font-mono text-[10px] text-[#484f58] ml-2">
              已展示 {current.books.length} 本
            </span>
          </div>

          {/* Navigation Text */}
          <div className="mb-8 md:mb-10 border-l-[3px] border-[#c8a45e] pl-4 md:pl-5">
            <p className="text-xs md:text-sm text-[#c0cdd9] leading-relaxed whitespace-pre-line italic">
              {current.navText}
            </p>
          </div>

          {/* Book Grid — 6 per row */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
            {current.books.map((book) => {
              const Wrapper = book.doubanUrl
                ? ({ children }: { children: React.ReactNode }) => (
                    <a
                      href={book.doubanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      {children}
                    </a>
                  )
                : ({ children }: { children: React.ReactNode }) => (
                    <div className="group">{children}</div>
                  );

              return (
                <Wrapper key={book.id}>
                  {/* Cover */}
                  <div className="relative overflow-hidden border border-[#30363d] group-hover:border-[#c8a45e] transition-colors">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full aspect-[2/3] object-cover block"
                      loading="lazy"
                    />
                    {book.doubanUrl && (
                      <div className="absolute inset-0 bg-[#0d1117]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <ExternalLink size={11} className="text-[#c8a45e]" />
                        <span className="text-[9px] font-mono text-[#c8a45e]">豆瓣</span>
                      </div>
                    )}
                  </div>

                  {/* Info below */}
                  <div className="mt-2">
                    <p
                      className="text-[10px] md:text-xs text-[#f0f6fc] leading-tight line-clamp-2 group-hover:text-[#c8a45e] transition-colors"
                      style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                    >
                      {book.title}
                    </p>
                    <p className="mt-0.5 text-[9px] text-[#484f58] line-clamp-1">
                      {book.author}
                    </p>
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                      {book.rating && (
                        <span className="flex items-center gap-0.5 text-[9px] text-[#c8a45e]">
                          <Star size={8} fill="#c8a45e" />
                          {book.rating}
                        </span>
                      )}
                      {book.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] font-mono px-1 py-0.5 bg-[#2f7d5f]/10 text-[#2f7d5f]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
