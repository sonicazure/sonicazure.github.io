export interface ResearchProject {
  id: string;
  title: string;
  subtitle?: string;
  status: "ONGOING" | "PLANNED" | "COMPLETED" | "PENDING" | "IDEA";
  startDate?: string;
  description?: string;
  methodology?: string;
  progress: number;
  milestones?: { date: string; description: string }[];
  outputs?: { type: string; title: string; status: string }[];
}

/* ---------- 已完成的研究项目 ---------- */
export const completedProjects: ResearchProject[] = [
  {
    id: "comp1",
    title: "在流动中实践陌生：地铁空间内的匿名互动秩序",
    status: "COMPLETED",
    progress: 100,
  },
  {
    id: "comp2",
    title: "Typification and the Self: A Spectrum of Interpretive Social Theory",
    subtitle: "「类型化」与「自我」：一个诠释性社会理论的谱系",
    status: "COMPLETED",
    progress: 100,
  },
  {
    id: "comp3",
    title: "The Birth of Exo-past: Subjectivation in the Age of Mobile Photography Technology",
    subtitle: "「外过去」的诞生：移动影像时代的主体化论纲【记忆的去身体化和语法化】",
    status: "COMPLETED",
    progress: 100,
  },
];

/* ---------- 已成型的研究计划 ---------- */
export const maturePlans: ResearchProject[] = [
  {
    id: "plan1",
    title: "物流进疆：一项运动式治理的考察",
    status: "PENDING",
    progress: 0,
  },
  {
    id: "plan2",
    title: "数字信息的消散与遗忘",
    status: "PENDING",
    progress: 0,
  },
  {
    id: "plan3",
    title: "人工制品：衰朽—维护—废墟",
    status: "PENDING",
    progress: 0,
  },
  {
    id: "plan4",
    title: "重组ANT：思考事物—情境—网络的关系",
    status: "PENDING",
    progress: 0,
  },
];

/* ---------- 画饼中的研究议题 ---------- */
export const futurePlans: ResearchProject[] = [
  {
    id: "dream1",
    title: "夜常生活论纲",
    status: "IDEA",
    progress: 0,
  },
  {
    id: "dream2",
    title: "「批判」与情感主义",
    status: "IDEA",
    progress: 0,
  },
  {
    id: "dream3",
    title: "物的可供性与分布式认知",
    status: "IDEA",
    progress: 0,
  },
  {
    id: "dream4",
    title: '导向实践理论的"痕迹学"',
    status: "IDEA",
    progress: 0,
  },
];

/* Legacy exports for backward compatibility */
export const researchProjects: ResearchProject[] = [...completedProjects, ...maturePlans];
