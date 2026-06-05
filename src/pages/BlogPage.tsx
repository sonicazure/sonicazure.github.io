import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogPosts, blogTags, blogYears } from '@/data';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

function BlogList() {
  const [selectedTag, setSelectedTag] = useState("全部");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filtered = blogPosts.filter((post) => {
    const tagMatch = selectedTag === "全部" || post.tags.includes(selectedTag);
    const yearMatch = selectedYear === null || post.year === selectedYear;
    return tagMatch && yearMatch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1
          className="text-2xl md:text-4xl font-bold text-[#f0f6fc] mb-3 md:mb-4"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          博文归档
        </h1>
        <p className="text-sm text-[#8b949e]">
          思考的记录，阅读的延伸，田野的反思
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 md:mb-10 space-y-3 md:space-y-4">
        {/* Year filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[10px] text-[#484f58] uppercase tracking-wider">
            年份
          </span>
          <button
            onClick={() => setSelectedYear(null)}
            className={`font-mono text-xs px-3 py-1 border transition-colors ${
              selectedYear === null
                ? 'border-[#c8a45e] text-[#c8a45e]'
                : 'border-[#30363d] text-[#8b949e] hover:border-[#484f58]'
            }`}
          >
            全部
          </button>
          {blogYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`font-mono text-xs px-3 py-1 border transition-colors ${
                selectedYear === year
                  ? 'border-[#c8a45e] text-[#c8a45e]'
                  : 'border-[#30363d] text-[#8b949e] hover:border-[#484f58]'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Tag filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[10px] text-[#484f58] uppercase tracking-wider">
            标签
          </span>
          {blogTags.slice(0, 8).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`font-mono text-[10px] px-2 py-0.5 transition-colors ${
                selectedTag === tag
                  ? 'text-[#c8a45e] bg-[#c8a45e]/10'
                  : 'text-[#8b949e] hover:text-[#c8a45e]'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Post count */}
      <div className="mb-6 font-mono text-xs text-[#484f58]">
        共 {filtered.length} 篇文章
      </div>

      {/* Post List - GitHub Issues style */}
      <div className="border border-[#30363d] divide-y divide-[#30363d]">
        {filtered.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="block p-3 md:p-4 hover:bg-[#161b22] transition-colors group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xs md:text-sm text-[#f0f6fc] group-hover:text-[#c8a45e] transition-colors line-clamp-2 sm:truncate">
                  {post.title}
                </h3>
                <p className="text-xs text-[#8b949e] mt-1 line-clamp-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="tag-green text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-mono text-[9px] md:text-[10px] text-[#484f58]">
                  {post.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#484f58] font-mono text-sm">
          没有找到匹配的文章
        </div>
      )}
    </div>
  );
}

function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    if (contentRef.current) {
      const h2s = contentRef.current.querySelectorAll('h2');
      const hs = Array.from(h2s).map((h, i) => {
        const hid = `heading-${i}`;
        h.id = hid;
        return { id: hid, text: h.textContent || '', level: 2 };
      });
      setHeadings(hs);
    }
  }, [post]);

  useEffect(() => {
    if (headings.length === 0) return;
    const handleScroll = () => {
      let current = '';
      headings.forEach((h) => {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top < 200) {
          current = h.id;
        }
      });
      setActiveHeading(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-[#8b949e]">文章未找到</p>
        <Link to="/blog" className="text-[#c8a45e] text-sm mt-4 inline-block">
          返回博文列表
        </Link>
      </div>
    );
  }

  // Parse markdown content to HTML
  const parseMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line) => {
        if (line.startsWith('## ')) {
          return `<h2 class="text-xl font-semibold text-[#f0f6fc] mt-10 mb-4" style="font-family:'Noto Serif SC',serif">${line.slice(3)}</h2>`;
        }
        if (line.startsWith('- ')) {
          return `<li class="text-sm text-[#c0cdd9] ml-4 mb-1">${line.slice(2)}</li>`;
        }
        if (line.trim() === '') {
          return '<br/>';
        }
        return `<p class="text-sm text-[#c0cdd9] leading-relaxed mb-4">${line}</p>`;
      })
      .join('\n');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs text-[#8b949e] hover:text-[#c8a45e] transition-colors mb-6 md:mb-8"
          >
            <ArrowLeft size={14} />
            <span className="font-mono">返回列表</span>
          </Link>

          {/* Post Header */}
          <div className="mb-6 md:mb-8">
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f0f6fc] mb-3 md:mb-4 leading-tight"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
              <span className="flex items-center gap-1 text-[10px] md:text-xs text-[#8b949e]">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-[10px] md:text-xs text-[#8b949e]">
                <Clock size={12} />
                {post.readingTime} 分钟阅读
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-3 flex-wrap">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-green text-[9px] md:text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="divider mb-6 md:mb-8" />

          {/* Content */}
          <article
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
          />
        </div>

        {/* Table of Contents Sidebar — hidden on mobile */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            {headings.length > 0 && (
              <div className="border border-[#30363d] bg-[#161b22] p-4 md:p-5">
                <h4 className="font-mono text-[10px] text-[#8b949e] uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
                  <Tag size={12} />
                  目录
                </h4>
                <ul className="space-y-2">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`text-[10px] md:text-xs transition-colors ${
                          activeHeading === h.id
                            ? 'text-[#c8a45e]'
                            : 'text-[#8b949e] hover:text-[#c8a45e]'
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();
  return id ? <BlogDetail /> : <BlogList />;
}
