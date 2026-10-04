// EXPORTS: SURVEY_META, DATA_SOURCE_BADGES, CORE_FINDINGS, CHANGELOG, FRAMEWORK_MODULES

/** 调研总体信息 */
export const SURVEY_META = {
  title: '2025-2026 AIGC调研',
  fullName: '《2025-2026 AIGC前沿调研》',
  period: '2025.01 — 2026.09',
  version: 'v1.4',
  updated: '2026-09-30',
  scope: '覆盖全球 12 个重点市场、38 家头部企业、6 大技术方向',
}

export interface IDataBadge {
  label: string
  detail: string
}

/** 数据来源类别（首页标注） */
export const DATA_SOURCE_BADGES: IDataBadge[] = [
  { label: '顶会论文', detail: 'NeurIPS / ICML / ICLR / ACL 2025-2026' },
  { label: '官方统计', detail: '国家统计局 / 中国信通院 / IDC / Gartner' },
  { label: '企业公开数据', detail: '上市公司财报 / 官方技术报告 / 定价页' },
]

export interface ICoreFinding {
  id: string
  title: string
  summary: string
  source: string
}

/** 核心结论摘要（首页展示） */
export const CORE_FINDINGS: ICoreFinding[] = [
  {
    id: '1',
    title: '推理成本一年下降约 90%',
    summary:
      'MoE 稀疏化、KV Cache 优化与投机解码三线并进，旗舰模型百万 token 推理价格进入个位数区间，推理侧成本较 2024 年初下降约 90%。',
    source: '各厂商官方定价页汇总',
  },
  {
    id: '2',
    title: '全球市场规模 2026 年预计突破千亿美元',
    summary:
      '2025 年全球 AIGC 市场规模约 720 亿美元，2026 年预计达 1,080 亿美元；中国市场约 178 亿美元，占比约四分之一。',
    source: 'IDC《全球 AI 支出指南》/ 中国信通院',
  },
  {
    id: '3',
    title: '金融、软件研发、传媒渗透率位列前三',
    summary:
      '七大重点行业中，金融（68%）、软件研发（64%）、传媒内容（61%）渗透率最高，超六成头部企业已从试点进入放量阶段。',
    source: '本调研企业访谈与公开案例汇总',
  },
  {
    id: '4',
    title: '投融资向 Agent 基础设施集中',
    summary:
      '2025 年国内 AIGC 融资中，Agent 基础设施与垂直行业应用两大赛道合计占比 58%，成为资本明确下注的主线。',
    source: '公开投融资数据库统计',
  },
  {
    id: '5',
    title: '幻觉与合规仍是落地最大障碍',
    summary:
      '企业调研显示 62% 的受访主体将数据安全与合规列为首要顾虑，57% 受幻觉率不可控困扰；RAG + 工具调用已成为企业级标配缓解方案。',
    source: '本调研企业问卷（N=126）',
  },
]

export interface IChangelogItem {
  date: string
  version: string
  note: string
}

/** 更新日志 */
export const CHANGELOG: IChangelogItem[] = [
  {
    date: '2026-09-30',
    version: 'v1.4',
    note: '更新 2026H2 投融资数据与政策梳理；新增七大行业渗透率同比对比。',
  },
  {
    date: '2026-06-30',
    version: 'v1.3',
    note: '补充开源生态活跃度统计口径说明；修正幻觉率数据来源标注。',
  },
  {
    date: '2026-03-31',
    version: 'v1.2',
    note: '新增核心玩家布局图谱与标杆落地案例成本区间。',
  },
  {
    date: '2025-12-31',
    version: 'v1.1',
    note: '首版发布：技术 / 产业 / 应用 / 趋势四大板块框架确立。',
  },
]

export interface IFrameworkModule {
  path: string
  label: string
  desc: string
  points: string[]
}

/** 调研框架（首页框架图数据） */
export const FRAMEWORK_MODULES: IFrameworkModule[] = [
  {
    path: '/tech',
    label: '技术调研',
    desc: '核心技术迭代主线',
    points: ['架构演进', '算法突破', '效能优化', '安全对齐'],
  },
  {
    path: '/industry',
    label: '产业调研',
    desc: '市场与资本格局',
    points: ['市场规模', '核心玩家', '投融资赛道'],
  },
  {
    path: '/applications',
    label: '应用调研',
    desc: '行业落地实况',
    points: ['行业渗透率', '标杆案例', '共性痛点'],
  },
  {
    path: '/trends',
    label: '趋势板块',
    desc: '政策与前瞻预判',
    points: ['政策梳理', '趋势预判', '分主体建议'],
  },
]
