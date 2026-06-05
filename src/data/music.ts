export interface MusicAlbum {
  id: string;
  title: string;
  artist: string;
  year: number;
  cover: string;
  doubanUrl?: string;
  genre: string;
  rating?: number;
  review: string;
  tags: string[];
  addedDate: string;
}

export const musicAlbums: MusicAlbum[] = [
  {
    id: "album1",
    title: "Entropy",
    artist: "Autechre",
    year: 2024,
    cover: "/images/music1.jpg",
    genre: "实验电子 / IDM",
    rating: 4.5,
    tags: ["实验电子", "IDM", "氛围音乐"],
    review: `Autechre 的最新专辑《Entropy》是对他们三十年音乐探索的一次总结与超越。\n\n## 写作伴侣\n\n这张专辑已经成为我最近的写作伴侣。它的非旋律性不会分散注意力，而不断变化的节奏纹理恰好为思考提供了一种微妙的动力。`,
    addedDate: "2024-03-01",
  },
  {
    id: "album2",
    title: "The Epic",
    artist: "Kamasi Washington",
    year: 2023,
    cover: "/images/music1.jpg",
    genre: "爵士 / 灵性爵士",
    rating: 5,
    tags: ["爵士", "灵性爵士", "长篇"],
    review: `Kamasi Washington 的三碟巨作《The Epic》不是一张适合"背景音乐"式聆听的专辑。它要求你拿出完整的三个小时，沉浸在一个宏大的音乐叙事中。`,
    addedDate: "2023-11-20",
  },
  {
    id: "album3",
    title: "In a Silent Way",
    artist: "Miles Davis",
    year: 1969,
    cover: "/images/music1.jpg",
    genre: "爵士融合 / 氛围",
    rating: 5,
    tags: ["爵士", "融合爵士", "经典"],
    review: `Miles Davis 的这张专辑标志着爵士乐从波普和硬波普向融合与氛围的转向。`,
    addedDate: "2023-09-10",
  },
  {
    id: "album4",
    title: "Selected Ambient Works 85-92",
    artist: "Aphex Twin",
    year: 1992,
    cover: "/images/music1.jpg",
    genre: "氛围电子 / IDM",
    rating: 5,
    tags: ["氛围电子", "IDM", "经典"],
    review: `Aphex Twin 的这张专辑定义了"氛围电子"(ambient electronic)这个流派的基本语法。`,
    addedDate: "2023-07-05",
  },
];

/* ---------- 年度专辑 ---------- */
export interface AnnualAlbum {
  id: string;
  title: string;
  artist: string;
  year: number;
  cover: string;
  doubanUrl?: string;
  rating: number;
  tags: string[];
  review: string;
}

export interface AnnualMusic {
  year: number;
  albums: AnnualAlbum[];
}

export const annualMusic: AnnualMusic[] = [
  {
    year: 2024,
    albums: [
      {
        id: "am24-1",
        title: "Entropy",
        artist: "Autechre",
        year: 2024,
        cover: "/images/music1.jpg",
        rating: 4.5,
        tags: ["实验电子", "IDM"],
        review: `Autechre 的算法音乐为思考复杂系统的有序与无序提供了声音隐喻。`,
      },
    ],
  },
  {
    year: 2023,
    albums: [
      {
        id: "am23-1",
        title: "The Epic",
        artist: "Kamasi Washington",
        year: 2023,
        cover: "/images/music1.jpg",
        rating: 5,
        tags: ["爵士", "灵性"],
        review: `三碟巨作，宏大的音乐叙事。灵性爵士的当代复兴。`,
      },
      {
        id: "am23-2",
        title: "In a Silent Way",
        artist: "Miles Davis",
        year: 1969,
        cover: "/images/music1.jpg",
        rating: 5,
        tags: ["爵士融合", "氛围"],
        review: `悬浮的、冥想式的声音景观。录音室作为乐器的革命。`,
      },
    ],
  },
];

/* ---------- 私藏 Live ---------- */
export interface LiveEntry {
  id: string;
  title: string;
  artist: string;
  cover: string;
  doubanUrl?: string;
  venue?: string;
  year?: number;
  rating?: number;
  tags: string[];
}

export interface AnnualLive {
  year: number;
  navText: string;
  lives: LiveEntry[];
}

export const liveHistory: AnnualLive[] = [
  {
    year: 2024,
    navText: `这一年的现场经历让我重新思考了"在场"的意义。当数字技术可以完美复制声音，我们为什么还要挤进烟雾缭绕的 livehouse？答案或许在于身体的共在——那种与陌生人共享同一频率振动的体验，是任何流媒体都无法替代的。`,
    lives: [
      { id: "lv24-1", title: "Entropy Tour", artist: "Autechre", cover: "/images/music1.jpg", venue: "Berghain, Berlin", year: 2024, rating: 5, tags: ["实验电子", "IDM"] },
      { id: "lv24-2", title: "The Epic Live", artist: "Kamasi Washington", cover: "/images/music1.jpg", venue: "Royal Albert Hall, London", year: 2024, rating: 5, tags: ["爵士", "灵性"] },
    ],
  },
];

/* ---------- 共振之音 ---------- */
export interface ResonanceCategory {
  id: string;
  label: string;
  description: string;
  items: { name: string; note?: string }[];
}

export const resonanceCategories: ResonanceCategory[] = [
  {
    id: "chinese-rock",
    label: "中国摇滚",
    description: "那些在这片土地上发出过真实声音的名字。",
    items: [],
  },
  {
    id: "cantopop",
    label: "港乐",
    description: "粤语流行音乐的黄金年代与后来者们。",
    items: [],
  },
];
