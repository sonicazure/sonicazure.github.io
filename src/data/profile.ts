export interface ProfileData {
  name: string;
  nameEn: string;
  email: string;
  links: { label: string; url: string }[];
}

export const profileData: ProfileData = {
  name: "鸣青",
  nameEn: "SonicAzure",
  email: "narrasonzy@gmail.com",
  links: [
    { label: "Google Scholar", url: "#/" },
    { label: "GitHub", url: "https://github.com/sonicazure" },
    { label: "Email", url: "mailto:narrasonzy@gmail.com" },
  ],
};

export interface AcademicTraining {
  flags: string;
  degree: string;
  note: string;
}

export const academicTraining: AcademicTraining[] = [
  { flags: "🇨🇳", degree: "**社会学 (法学学士)**", note: "*美好的走街串巷、同侪论辩和呕沥创作时光*" },
  { flags: "🇨🇳", degree: "**汉语言文学 (辅修学士)**", note: "*只爱听课表缝里抠出的一丁点外国文学*" },
  { flags: "🇬🇧", degree: "**Sociology (MSc)**", note: "*扎实的方法训练，其余查无此校*" },
  { flags: "🇬🇧", degree: "**Architecture & Urban Studies (MPhil)**", note: "*围观假装关心底层和社会公义的世界婆罗门*" },
  { flags: "🇧🇪", degree: "**Cultural Anthropology & Development Studies (AM)**", note: "*重启研究是为了重新直面一些人的生命处境*" },
];

export const researchAreas: string[] = [
  "基础设施研究（Infrastructure Studies）",
  "技术与物质性（Technology & Materiality）",
  "社会理论（Social Theory）",
  "互动情境（Interactive Situation）",
];

export interface ResearchAxis {
  title: string;
  titleColor: string;
  description: string;
  items: string[];
}

export interface ResearchDirections {
  intro: string;
  axes: ResearchAxis[];
}

export const researchDirections: ResearchDirections = {
  intro: "我的学术旨趣主要围绕两条轴线展开。",
  axes: [
    {
      title: "轴线一",
      titleColor: "#c8a45e",
      description:
        "涉及「权力—知识—主体」的创造。但我选取的中介并非其他似乎牢固的切入点，而是想象力的结构、范围、形态和边界。",
      items: [
        "中世纪至晚期现代社会，主体性的塑造和流变中，「思想—行动」图式的哲学和历史社会学；",
        "知识的构型学，以及知识—思考—想象的关系。",
        "旨在推翻占有性人本主义主体的诸当代理论（e.g. 以转译/使用替代占有的信息论；重新理解肢体、感官技术，与物质性的后人类主义；植物哲学）；",
        "小说理论——构造/复写世界的法则和限度；经验可能以各种方式被叙述和编织？",
        "社会理论——经验的总体形构与个体编织。",
      ],
    },
    {
      title: "轴线二",
      titleColor: "#7fb3d5",
      description:
        "围绕人工制品的社会生命展开。此议题旨在对使现代世界成为可能的广阔物质宇宙加以反思。",
      items: [
        "人类如何理解人工制品在物质层面的「衰朽」，以及技术的组织结构如何将其吸纳；",
        "静止/稳定的社会—物质形构表象之下，被隐匿的恒久「维持」实践；",
        "人类与物质交互的过程中，主体认知模式与行动能力的迁移和演化；",
        "「痕迹」与「废墟」——迈向一种堆叠的实践学。",
      ],
    },
  ],
};

export interface WorkEntry {
  flags: string;
  title: string;
}

export const whiteCollarWorks: WorkEntry[] = [
  { flags: "🇨🇳", title: "**用户研究员**" },
  { flags: "🇺🇸", title: "**Research Associate for Urban Studies (remote)**" },
  { flags: "🇨🇳", title: "**公益咨询专员 (乡村建设和弱势群体扶助)**" },
  { flags: "🇧🇪", title: "**Public Affairs Assistant**" },
];

export const blueCollarHeader = "*重生大冰战战惶惶，衣领黢黑汗出如浆*";

export const blueCollarWorks: WorkEntry[] = [
  { flags: "🇨🇳🇬🇧", title: "**交通局越帮越忙后备调度猿**" },
  { flags: "🇬🇧", title: "**白人便利店跪姿上货小时工**" },
  { flags: "🇨🇳", title: "**夕阳出版业做必赔书系编辑**" },
  { flags: "🇨🇳", title: "**下市季农副水产品分销簿记**" },
  { flags: "🇨🇳", title: "**电子厂人见人嫌安全帽督察**" },
  { flags: "🇮🇹🇩🇪", title: "**杀散户昼伏夜出数据分析狮**" },
  { flags: "🇨🇳🇻🇳", title: "**爬八楼再被狗撵臭众包骑手**" },
  { flags: "🇻🇳🇲🇾", title: "**边境线就业拉皮条游龙义工**" },
];
