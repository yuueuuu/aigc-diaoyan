// EXPORTS: TECH_TRACKS, TECH_MILESTONES, MODEL_METRICS, OSS_ECO

export type TechTrackKey = 'arch' | 'algo' | 'effi' | 'safety'

export interface ITechTrack {
  key: TechTrackKey
  label: string
}

/** 技术迭代四条主线 */
export const TECH_TRACKS: ITechTrack[] = [
  { key: 'arch', label: '架构' },
  { key: 'algo', label: '算法' },
  { key: 'effi', label: '效能' },
  { key: 'safety', label: '安全' },
]

export interface ITechMilestone {
  id: string
  track: TechTrackKey
  quarter: string
  title: string
  desc: string
  source: string
}

/** 近一年核心技术迭代节点（按季度排列） */
export const TECH_MILESTONES: ITechMilestone[] = [
  {
    id: '1',
    track: 'arch',
    quarter: '2025 Q1',
    title: 'MoE 稀疏化成为旗舰标配',
    desc: '主流旗舰模型普遍转向混合专家架构，推理时仅激活 5%-15% 参数，训练与部署成本同步下探。',
    source: 'NeurIPS 2025 / 各厂商技术报告',
  },
  {
    id: '2',
    track: 'arch',
    quarter: '2026 Q2',
    title: '原生多模态统一架构落地',
    desc: '文本、图像、音频、视频在同一 Transformer 内联合表征，跨模态迁移能力显著增强。',
    source: 'ICML 2026',
  },
  {
    id: '3',
    track: 'algo',
    quarter: '2025 Q2',
    title: '推理强化学习（RLHF → RLVR）',
    desc: '从人类偏好对齐转向可验证奖励，数学与代码类任务准确率大幅提升，成为旗舰模型训练标配。',
    source: 'ICLR 2026',
  },
  {
    id: '4',
    track: 'algo',
    quarter: '2025 Q4',
    title: '长思维链与自我纠错',
    desc: '模型显式生成中间推理步骤并自我校验，复杂任务错误率下降约 40%。',
    source: 'NeurIPS 2025',
  },
  {
    id: '5',
    track: 'effi',
    quarter: '2025 Q3',
    title: '推理成本一年下降约 90%',
    desc: 'KV Cache 优化、投机解码与低比特量化三管齐下，百万 token 价格进入个位数区间。',
    source: '各厂商官方定价页汇总',
  },
  {
    id: '6',
    track: 'effi',
    quarter: '2026 Q1',
    title: '百万级上下文窗口商用',
    desc: '长文档分析、全库代码理解场景解锁，上下文有效长度成为新的竞争点。',
    source: '企业公开技术文档',
  },
  {
    id: '7',
    track: 'safety',
    quarter: '2025 Q2',
    title: '幻觉缓解进入工程化阶段',
    desc: 'RAG + 工具调用 + 引用溯源成为企业级标配，头部模型开放域幻觉率降至 5% 以下。',
    source: 'ACL 2026 / 公开评测基准',
  },
  {
    id: '8',
    track: 'safety',
    quarter: '2026 Q2',
    title: '内容水印与溯源标准落地',
    desc: '国内外相继出台生成内容标识规范，隐式水印技术进入规模化商用。',
    source: '官方标准文件',
  },
]

export interface IModelMetric {
  model: string
  /** 输出价格（元 / 百万 token） */
  cost: number
  /** 生成速度（token / s） */
  speed: number
  /** 开放域幻觉率（%） */
  hallucination: number
  /** 最大上下文（万 token） */
  context: number
}

/** 关键指标对比（模型命名已脱敏，完整对照见附录下载版） */
export const MODEL_METRICS: IModelMetric[] = [
  { model: 'Model A（旗舰闭源）', cost: 32, speed: 85, hallucination: 1.9, context: 100 },
  { model: 'Model B（旗舰闭源）', cost: 24, speed: 72, hallucination: 2.4, context: 128 },
  { model: 'Model C（开源旗舰）', cost: 8.5, speed: 95, hallucination: 4.6, context: 64 },
  { model: 'Model D（开源轻量）', cost: 1.8, speed: 150, hallucination: 6.8, context: 32 },
  { model: 'Model E（多模态专用）', cost: 45, speed: 38, hallucination: 3.2, context: 25 },
]

export interface IOssEco {
  name: string
  /** GitHub Stars（万） */
  stars: number
  /** 年度合并 PR 数 */
  prs: number
  /** 贡献者数量 */
  contributors: number
  license: string
}

/** 开源生态活跃度统计（统计周期：2025.09-2026.09） */
export const OSS_ECO: IOssEco[] = [
  { name: '开源大模型 A 生态', stars: 78.2, prs: 12400, contributors: 3200, license: 'Apache-2.0' },
  { name: '推理引擎 B', stars: 45.6, prs: 8600, contributors: 1500, license: 'Apache-2.0' },
  { name: 'Agent 框架 C', stars: 32.1, prs: 5800, contributors: 2100, license: 'MIT' },
  { name: '向量数据库 D', stars: 21.4, prs: 3900, contributors: 760, license: 'Apache-2.0' },
  { name: '训练框架 E', stars: 15.8, prs: 2700, contributors: 540, license: 'Apache-2.0' },
]
