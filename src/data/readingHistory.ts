export interface HistoryBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  doubanUrl?: string;
  rating?: number;
  tags: string[];
}

export interface AnnualHistory {
  year: number;
  total: number;
  navText: string;
  books: HistoryBook[];
}

export const readingHistory: AnnualHistory[] = [
  {
    year: 2024,
    total: 23,
    navText: `这一年我读得最集中的是社会理论和方法论。数字社会学作为一个仍在形成中的交叉领域，迫使我不得不在 STS、媒介理论和传统社会学方法论之间不断往返。Castells 的网络社会理论虽然写作于二十年前，但其对"流动的空间"的分析几乎预言了今天的平台资本主义形态。Kirschenbaum 则从数字人文的角度提醒我们，代码本身也是一种文本——一种承载着设计者意识形态的社会学文献。下半年我开始系统阅读 Kozinets 的网络民族志方法论，为即将展开的数字游民田野调查做准备。这一年最大的收获，是重新理解了"理论"与"经验"之间的关系——它们不是对立的两极，而是在实践中不断相互构成的螺旋。`,
    books: [
      { id: "rh24-1", title: "重构社会", author: "Manuel Castells", cover: "/images/book1.jpg", doubanUrl: "https://book.douban.com/subject/35222540/", rating: 4.5, tags: ["网络社会学", "数字理论"] },
      { id: "rh24-2", title: "代码即诗", author: "Matthew Kirschenbaum", cover: "/images/book2.jpg", doubanUrl: "https://book.douban.com/subject/35778213/", rating: 5, tags: ["数字人文", "编程"] },
      { id: "rh24-3", title: "Entropy", author: "Autechre", cover: "/images/music1.jpg", tags: ["实验电子", "音乐"] },
      { id: "rh24-4", title: "媒介理论的哲学思考", author: "John Durham Peters", cover: "/images/book4.jpg", doubanUrl: "https://book.douban.com/subject/34900614/", tags: ["媒介理论", "哲学"] },
      { id: "rh24-5", title: "田野笔记", author: "Robert Kozinets", cover: "/images/book3.jpg", doubanUrl: "https://book.douban.com/subject/34871590/", rating: 4, tags: ["方法论", "网络民族志"] },
      { id: "rh24-6", title: "想象的共同体", author: "Benedict Anderson", cover: "/images/book2.jpg", doubanUrl: "https://book.douban.com/subject/30174972/", rating: 4.5, tags: ["民族主义", "传播理论"] },
    ],
  },
  {
    year: 2023,
    total: 31,
    navText: `2023年是"回归田野"的一年。在屏幕之外，我重新学会了用身体去感知社会。福柯的全景敞视主义在监控资本主义时代获得了新的解释维度——当算法成为无形的管理者，规训的权力变得更加隐蔽却也更加无处不在。Anderson 的"想象的共同体"让我开始关注数字媒体如何改变民族主义的表达形态。音乐方面，Kamasi Washington 的三碟巨作《The Epic》成为我洛杉矶田野调查的伴侣，爵士乐中那种在混乱中寻找秩序的执着，与我在社区访谈中听到的故事形成了某种共振。`,
    books: [
      { id: "rh23-1", title: "规训与惩罚", author: "Michel Foucault", cover: "/images/book1.jpg", doubanUrl: "https://book.douban.com/subject/30275832/", rating: 5, tags: ["福柯", "权力理论"] },
      { id: "rh23-2", title: "The Epic", author: "Kamasi Washington", cover: "/images/music1.jpg", rating: 5, tags: ["爵士", "灵性"] },
      { id: "rh23-3", title: "In a Silent Way", author: "Miles Davis", cover: "/images/music1.jpg", rating: 5, tags: ["爵士", "融合"] },
      { id: "rh23-4", title: "Selected Ambient Works", author: "Aphex Twin", cover: "/images/music1.jpg", rating: 5, tags: ["氛围电子", "IDM"] },
      { id: "rh23-5", title: "代码即诗", author: "Matthew Kirschenbaum", cover: "/images/book2.jpg", doubanUrl: "https://book.douban.com/subject/35778213/", rating: 5, tags: ["数字人文", "重读"] },
    ],
  },
];
