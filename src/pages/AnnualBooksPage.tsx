import { useState } from 'react';
import { annualBestBooks } from '@/data/annualBooks';
import { Calendar, Star, ChevronDown, ChevronUp } from 'lucide-react';

export default function AnnualBooksPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(annualBestBooks[0].year);

  const current = annualBestBooks.find((a) => a.year === selectedYear);

  const parseReview = (review: string) => {
    return review
      .split('\n')
      .map((line) => {
        if (line.startsWith('## ')) {
          return `<h3 class="text-sm font-semibold text-[#f0f6fc] mt-6 mb-2" style="font-family:'Noto Sans SC',sans-serif">${line.slice(3)}</h3>`;
        }
        if (line.startsWith('- ')) {
          return `<li class="text-xs text-[#c0cdd9] ml-4 mb-1">${line.slice(2)}</li>`;
        }
        if (line.trim() === '') return '<br/>';
        return `<p class="text-xs text-[#c0cdd9] leading-relaxed mb-3">${line}</p>`;
      })
      .join('\n');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Year Selector */}
      <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 flex-wrap">
        <Calendar size={12} className="text-[#484f58]" />
        {annualBestBooks.map((a) => (
          <button
            key={a.year}
            onClick={() => {
              setSelectedYear(a.year);
              setExpandedId(null);
            }}
            className={`font-mono text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 border transition-colors ${
              selectedYear === a.year
                ? 'border-[#c8a45e] text-[#c8a45e]'
                : 'border-[#30363d] text-[#8b949e] hover:border-[#484f58]'
            }`}
          >
            {a.year}
          </button>
        ))}
      </div>

      {/* Book List */}
      {current && (
        <div className="space-y-4">
          {current.books.map((book) => (
            <div key={book.id} className="card-academic overflow-hidden">
              <div
                className="p-4 md:p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === book.id ? null : book.id)}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="flex-shrink-0 w-16 md:w-20">
                    <a
                      href={book.doubanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="block relative group"
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full aspect-[2/3] object-cover"
                      />
                      {book.doubanUrl && (
                        <div className="absolute inset-0 bg-[#0d1117]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[10px] font-mono text-[#c8a45e]">豆瓣</span>
                        </div>
                      )}
                    </a>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3
                          className="text-sm md:text-base font-semibold text-[#f0f6fc] hover:text-[#c8a45e] transition-colors line-clamp-2"
                          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                        >
                          {book.title}
                        </h3>
                        <p className="text-[10px] md:text-xs text-[#c8a45e] mt-0.5">
                          {book.author}
                        </p>
                        <p className="text-[10px] md:text-xs text-[#8b949e] mt-0.5">
                          {book.publisher} · {book.year}
                        </p>
                      </div>
                      {expandedId === book.id ? (
                        <ChevronUp size={16} className="text-[#8b949e] flex-shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-[#8b949e] flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {book.tags.map((tag) => (
                        <span key={tag} className="tag-green text-[9px] md:text-[10px]">
                          {tag}
                        </span>
                      ))}
                      <span className="flex items-center gap-1 text-[10px] text-[#c8a45e]">
                        <Star size={10} fill="#c8a45e" />
                        {book.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {expandedId === book.id && (
                <div className="border-t border-[#30363d] px-4 md:px-5 py-4 md:py-5">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-full min-h-[60px] bg-[#c8a45e] flex-shrink-0 rounded-full" />
                    <div
                      className="flex-1"
                      dangerouslySetInnerHTML={{ __html: parseReview(book.review) }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
