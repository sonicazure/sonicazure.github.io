export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  cover: string;
  doubanUrl?: string;
  isbn?: string;
  rating?: number;
  tags: string[];
  notes: string;
  addedDate: string;
}

/**
 * 精选书籍数据
 * 每本书可添加 doubanUrl（豆瓣页面链接）和 isbn
 * 若提供了 doubanUrl，封面可自动从豆瓣获取，点击可跳转豆瓣
 * 
 * 获取豆瓣信息的方法：
 * 1. 在豆瓣搜索书籍，找到对应书籍页面
 * 2. 复制链接，如 https://book.douban.com/subject/35222540/
 * 3. 填入 doubanUrl 字段即可
 * 
 * 批量获取工具：项目根目录下运行 `node scripts/fetch-douban.js`
 */
export const books: Book[] = [
  {
    id: "book1",
    title: "重构社会",
    author: "Manuel Castells",
    publisher: "社会科学文献出版社",
    year: 2023,
    cover: "/images/book1.jpg",
    doubanUrl: "https://book.douban.com/subject/35222540/",
    isbn: "9787520190036",
    rating: 4.5,
    tags: ["网络社会学", "数字理论", "经典重读"],
    notes: `Castells 的网络社会三部曲在数字时代依然具有惊人的解释力。他对"流动的空间"(space of flows)和"无时间的时间"(timeless time)的分析，在今天看来几乎是对平台资本主义的预言。\n\n## 核心论点\n\n网络社会的权力不再集中在传统的制度节点（国家、企业、教会），而是分布在信息流动的网络结构中。谁控制了协议、标准和接口，谁就掌握了网络时代的权力。\n\n## 批判性反思\n\n但 Castells 的分析有一个盲区：他倾向于将网络视为一个相对中性的基础设施，而低估了平台算法作为"非人类行动者"的能动性。ANT 的视角可以很好地补充这一不足。`,
    addedDate: "2024-01-15"
  },
  {
    id: "book2",
    title: "代码即诗",
    author: "Matthew Kirschenbaum",
    publisher: "MIT Press",
    year: 2022,
    cover: "/images/book2.jpg",
    doubanUrl: "https://book.douban.com/subject/35778213/",
    rating: 5,
    tags: ["数字人文", "编程", "方法论"],
    notes: `这本书对"数字人文"这个标签本身进行了一次精彩的解构。Kirschenbaum 追溯了从人文计算(humanities computing)到数字人文(digital humanities)的术语变迁。\n\n## 最有启发的章节\n\n第四章关于"代码作为文本"的讨论让我重新审视了自己的研究方法。`,
    addedDate: "2023-12-01"
  },
  {
    id: "book3",
    title: "田野笔记",
    author: "Robert Kozinets",
    publisher: "Routledge",
    year: 2021,
    cover: "/images/book3.jpg",
    doubanUrl: "https://book.douban.com/subject/34871590/",
    rating: 4,
    tags: ["方法论", "网络民族志", "田野调查"],
    notes: `Kozinets 的这本书是网络民族志方法的标准参考书。\n\n## 实用价值\n\n关于"数据饱和度"(data saturation)的讨论最有用。`,
    addedDate: "2023-10-20"
  },
  {
    id: "book4",
    title: "媒介理论的哲学思考",
    author: "John Durham Peters",
    publisher: "University of Chicago Press",
    year: 2020,
    cover: "/images/book4.jpg",
    doubanUrl: "https://book.douban.com/subject/34900614/",
    tags: ["媒介理论", "哲学", "经典"],
    notes: `Durham Peters 被誉为当代媒介理论领域最具原创力的思想家之一。`,
    addedDate: "2024-02-10"
  },
  {
    id: "book5",
    title: "规训与惩罚",
    author: "Michel Foucault",
    publisher: "三联书店",
    year: 2019,
    cover: "/images/book1.jpg",
    doubanUrl: "https://book.douban.com/subject/30275832/",
    rating: 5,
    tags: ["福柯", "权力理论", "经典重读"],
    notes: `重读福柯总是会带来新的发现。全景敞视主义在监控资本主义时代获得了新的解释维度。`,
    addedDate: "2023-08-05"
  },
  {
    id: "book6",
    title: "想象的共同体",
    author: "Benedict Anderson",
    publisher: "上海人民出版社",
    year: 2018,
    cover: "/images/book2.jpg",
    doubanUrl: "https://book.douban.com/subject/30174972/",
    rating: 4.5,
    tags: ["民族主义", "传播理论", "经典"],
    notes: `Anderson 的"想象的共同体"概念是传播研究领域引用率最高的理论之一。`,
    addedDate: "2023-06-15"
  }
];
