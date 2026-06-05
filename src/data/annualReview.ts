export interface AnnualBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  tags: string[];
  review: string;
}

export interface AnnualReview {
  year: number;
  totalBooks: number;
  highlightQuote: string;
  books: AnnualBook[];
}

export const annualReviews: AnnualReview[] = [
  {
    year: 2024,
    totalBooks: 23,
    highlightQuote: "今年最大的阅读收获，是重新理解了'理论'与'经验'之间的关系——它们不是对立的两极，而是在实践中不断相互构成的螺旋。",
    books: [
      {
        id: "y24b1",
        title: "重构社会",
        author: "Manuel Castells",
        cover: "/images/book1.jpg",
        tags: ["网络社会学", "数字理论"],
        review: "Castells 的网络社会理论在平台资本主义时代展现出惊人的预见性。"
      },
      {
        id: "y24b2",
        title: "代码即诗",
        author: "Matthew Kirschenbaum",
        cover: "/images/book2.jpg",
        tags: ["数字人文", "编程"],
        review: "对'代码作为文本'的论证为数字社会学研究开辟了新的分析路径。"
      },
      {
        id: "y24b3",
        title: "Entropy",
        author: "(专辑)",
        cover: "/images/music1.jpg",
        tags: ["实验电子", "音乐"],
        review: "Autechre 的算法音乐为思考复杂系统的有序与无序提供了声音隐喻。"
      },
      {
        id: "y24b4",
        title: "媒介理论的哲学思考",
        author: "John Durham Peters",
        cover: "/images/book4.jpg",
        tags: ["媒介理论", "哲学"],
        review: "将媒介哲学的讨论提升到了对人类存在条件本身的反思。"
      },
      {
        id: "y24b5",
        title: "田野笔记",
        author: "Robert Kozinets",
        cover: "/images/book3.jpg",
        tags: ["方法论", "网络民族志"],
        review: "网络民族志方法的标准参考书，但对平台政治的忽视需要补充。"
      },
      {
        id: "y24b6",
        title: "想象的共同体",
        author: "Benedict Anderson",
        cover: "/images/book2.jpg",
        tags: ["民族主义", "传播理论"],
        review: "重读经典，关注数字媒体如何改变民族主义的表达形态。"
      }
    ]
  },
  {
    year: 2023,
    totalBooks: 31,
    highlightQuote: "2023年是'回归田野'的一年。在屏幕之外，我重新学会了用身体去感知社会。",
    books: [
      {
        id: "y23b1",
        title: "规训与惩罚",
        author: "Michel Foucault",
        cover: "/images/book1.jpg",
        tags: ["福柯", "权力理论"],
        review: "全景敞视主义在监控资本主义时代获得了新的解释维度。"
      },
      {
        id: "y23b2",
        title: "The Epic",
        author: "Kamasi Washington",
        cover: "/images/music1.jpg",
        tags: ["爵士", "灵性"],
        review: "音乐作为田野调查的伴侣，深化了对社区文化的理解。"
      },
      {
        id: "y23b3",
        title: "In a Silent Way",
        author: "Miles Davis",
        cover: "/images/music1.jpg",
        tags: ["爵士", "融合"],
        review: "现象学的'在世存在'在这张专辑中找到了完美的声音对应。"
      },
      {
        id: "y23b4",
        title: "Selected Ambient Works",
        author: "Aphex Twin",
        cover: "/images/music1.jpg",
        tags: ["氛围电子", "IDM"],
        review: "写作时的声音伴侣，不同写作阶段需要不同的音乐氛围。"
      },
      {
        id: "y23b5",
        title: "代码即诗",
        author: "Matthew Kirschenbaum",
        cover: "/images/book2.jpg",
        tags: ["数字人文", "重读"],
        review: "第二次阅读，重点关注方法论部分的具体操作细节。"
      }
    ]
  }
];
