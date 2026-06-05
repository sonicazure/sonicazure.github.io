export interface AnnualBook {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  cover: string;
  doubanUrl?: string;
  rating: number;
  tags: string[];
  review: string;
}

export interface AnnualBest {
  year: number;
  books: AnnualBook[];
}

export const annualBestBooks: AnnualBest[] = [
  {
    year: 2024,
    books: [
      {
        id: "ab24-1",
        title: "重构社会",
        author: "Manuel Castells",
        publisher: "社会科学文献出版社",
        year: 2023,
        cover: "/images/book1.jpg",
        doubanUrl: "https://book.douban.com/subject/35222540/",
        rating: 4.5,
        tags: ["网络社会学", "数字理论", "经典重读"],
        review: `Castells 的网络社会三部曲在数字时代依然具有惊人的解释力。他对"流动的空间"(space of flows)和"无时间的时间"(timeless time)的分析，在今天看来几乎是对平台资本主义的预言。\n\n## 核心论点\n\n网络社会的权力不再集中在传统的制度节点（国家、企业、教会），而是分布在信息流动的网络结构中。谁控制了协议、标准和接口，谁就掌握了网络时代的权力。\n\n## 批判性反思\n\n但 Castells 的分析有一个盲区：他倾向于将网络视为一个相对中性的基础设施，而低估了平台算法作为"非人类行动者"的能动性。ANT 的视角可以很好地补充这一不足。`,
      },
      {
        id: "ab24-2",
        title: "代码即诗",
        author: "Matthew Kirschenbaum",
        publisher: "MIT Press",
        year: 2022,
        cover: "/images/book2.jpg",
        doubanUrl: "https://book.douban.com/subject/35778213/",
        rating: 5,
        tags: ["数字人文", "编程", "方法论"],
        review: `这本书对"数字人文"这个标签本身进行了一次精彩的解构。Kirschenbaum 追溯了从人文计算(humanities computing)到数字人文(digital humanities)的术语变迁，揭示了这个领域如何在不同学科、机构和技术条件的推动下不断重塑自己的边界。\n\n## 最有启发的章节\n\n第四章关于"代码作为文本"的讨论让我重新审视了自己的研究方法。当社会学家分析一个社交平台时，我们通常会研究用户行为、内容特征和社区规范。但 Kirschenbaum 提醒我们，平台的源代码本身也是一种文本——它承载着设计者的假设、偏见和意识形态。`,
      },
    ],
  },
  {
    year: 2023,
    books: [
      {
        id: "ab23-1",
        title: "规训与惩罚",
        author: "Michel Foucault",
        publisher: "三联书店",
        year: 2019,
        cover: "/images/book1.jpg",
        doubanUrl: "https://book.douban.com/subject/30275832/",
        rating: 5,
        tags: ["福柯", "权力理论", "经典重读"],
        review: `重读福柯总是会带来新的发现。这次重读《规训与惩罚》，我特别注意到了他对"全景敞视主义"(panopticism)的分析与当代监控资本主义的关联。\n\n全景敞视监狱的设计原则是：囚犯永远不知道自己是否被观看，因此必须时刻自我规训。而今天的用户往往完全不知道自己被收集了哪些数据、这些数据如何被分析——他们面对的不仅是不对称的可见性，更是一种根本性的不可知性(unknowability)。`,
      },
      {
        id: "ab23-2",
        title: "想象的共同体",
        author: "Benedict Anderson",
        publisher: "上海人民出版社",
        year: 2018,
        cover: "/images/book2.jpg",
        doubanUrl: "https://book.douban.com/subject/30174972/",
        rating: 4.5,
        tags: ["民族主义", "传播理论", "经典"],
        review: `Anderson 的"想象的共同体"概念是传播研究领域引用率最高的理论之一。但他自己晚年的思考其实已经超越了这个概念的原始版本。\n\n在《全球化时代》三部曲中，Anderson 开始关注数字媒体如何改变民族主义的形态。社交媒体创造的"回声室"效应既可能强化民族主义的边界，也可能催生跨越国界的"数字离散社群"(digital diaspora)。`,
      },
    ],
  },
  {
    year: 2022,
    books: [
      {
        id: "ab22-1",
        title: "田野笔记",
        author: "Robert Kozinets",
        publisher: "Routledge",
        year: 2021,
        cover: "/images/book3.jpg",
        doubanUrl: "https://book.douban.com/subject/34871590/",
        rating: 4,
        tags: ["方法论", "网络民族志", "田野调查"],
        review: `Kozinets 的这本书是网络民族志方法的标准参考书。它系统地整理了从数据收集、伦理审查到分析写作的整个流程，并结合了大量实际案例。\n\n## 实用价值\n\n对我来说最有用的部分是关于"数据饱和度"(data saturation)的讨论。在数字环境中，数据几乎是无限的——一个活跃的 Discord 服务器可以在一个月内产生数百万条消息。如何判断什么时候"足够"了？Kozinets 提出了一套结合理论目的、研究问题和实际约束的决策框架。`,
      },
    ],
  },
];
