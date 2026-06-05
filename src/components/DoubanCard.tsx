import { ExternalLink } from 'lucide-react';

interface DoubanCardProps {
  cover: string;
  title: string;
  subtitle?: string;
  doubanUrl?: string;
  children?: React.ReactNode;
  aspectRatio?: 'book' | 'square';
}

/**
 * 通用豆瓣卡片组件
 * - 若提供了 doubanUrl，点击封面会跳转到豆瓣页面
 * - 若提供了 isbn，可通过豆瓣图片CDN自动获取封面
 * 
 * 使用方式：
 * <DoubanCard
 *   cover="/images/book1.jpg"
 *   title="书名"
 *   subtitle="作者"
 *   doubanUrl="https://book.douban.com/subject/35222540/"
 * />
 */
export default function DoubanCard({
  cover,
  title,
  subtitle,
  doubanUrl,
  children,
  aspectRatio = 'book',
}: DoubanCardProps) {
  const aspectClass = aspectRatio === 'book' ? 'aspect-[2/3]' : 'aspect-square';

  const CoverContent = (
    <div className={`relative overflow-hidden border border-[#30363d] group-hover:border-[#c8a45e] transition-colors ${aspectClass}`}>
      <img
        src={cover}
        alt={title}
        className="w-full h-full object-cover block"
        loading="lazy"
      />
      {doubanUrl && (
        <div className="absolute inset-0 bg-[#0d1117]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
          <ExternalLink size={12} className="text-[#c8a45e]" />
          <span className="text-[10px] font-mono text-[#c8a45e]">豆瓣</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="group">
      {doubanUrl ? (
        <a
          href={doubanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {CoverContent}
        </a>
      ) : (
        CoverContent
      )}
      <div className="mt-2">
        <p
          className="text-xs text-[#f0f6fc] leading-tight line-clamp-2 group-hover:text-[#c8a45e] transition-colors"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-[10px] text-[#8b949e] mt-0.5 line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * 从豆瓣URL提取ID
 * 如 https://book.douban.com/subject/35222540/ → 35222540
 */
export function extractDoubanId(url: string): string | null {
  const match = url.match(/subject\/(\d+)/);
  return match ? match[1] : null;
}

/**
 * 获取豆瓣封面图片URL
 * 可直接用于 img 标签的 src 属性
 */
export function getDoubanCoverUrl(doubanId: string, size: 's' | 'm' | 'l' = 'l'): string {
  return `https://img9.doubanio.com/view/subject/${size}/public/s${doubanId}.jpg`;
}
