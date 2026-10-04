// EXPORTS: DATA_SOURCES, GLOSSARY

export interface IDataSource {
  id: string
  name: string
  type: '顶会论文' | '官方统计' | '企业公开数据'
  url: string
  note: string
}

/** 数据来源链接（全站可溯源） */
export const DATA_SOURCES: IDataSource[] = [
  {
    id: '1',
    name: 'NeurIPS 2025 论文集',
    type: '顶会论文',
    url: 'https://neurips.cc',
    note: '架构演进与长思维链相关章节',
  },
  {
    id: '2',
    name: 'ICML / ICLR 2026 论文集',
    type: '顶会论文',
    url: 'https://icml.cc',
    note: 'RLVR 与多模态统一架构相关工作',
  },
  {
    id: '3',
    name: '中国信通院 AIGC 产业研究报告',
    type: '官方统计',
    url: 'http://www.caict.ac.cn',
    note: '国内市场规模与政策梳理基准',
  },
  {
    id: '4',
    name: 'IDC《全球 AI 支出指南》',
    type: '官方统计',
    url: 'https://www.idc.com',
    note: '全球市场规模与预测口径',
  },
  {
    id: '5',
    name: '各厂商官方定价页',
    type: '企业公开数据',
    url: 'https://openai.com/api/pricing/',
    note: '推理成本对比数据来源',
  },
  {
    id: '6',
    name: '上市公司公开财报',
    type: '企业公开数据',
    url: 'https://www.sec.gov',
    note: '核心玩家布局与投入数据',
  },
]

export interface IGlossary {
  term: string
  en: string
  definition: string
}

/** 名词解释 */
export const GLOSSARY: IGlossary[] = [
  {
    term: '混合专家架构',
    en: 'MoE, Mixture of Experts',
    definition: '将模型拆分为多个「专家」子网络，推理时仅激活其中一小部分，从而大幅降低计算成本。',
  },
  {
    term: '幻觉率',
    en: 'Hallucination Rate',
    definition: '模型生成与事实不符内容的比例，是衡量生成内容可信度的核心指标。',
  },
  {
    term: '检索增强生成',
    en: 'RAG, Retrieval-Augmented Generation',
    definition: '生成前先从外部知识库检索相关资料，让模型「带参考书答题」，是缓解幻觉的主流工程方案。',
  },
  {
    term: '智能体',
    en: 'Agent',
    definition: '能自主规划任务、调用工具并根据反馈迭代的 AI 系统，被视为大模型落地应用的关键形态。',
  },
  {
    term: 'Token',
    en: 'Token',
    definition: '模型处理文本的最小单位，约等于 0.5-1.5 个汉字；API 计价以 token 为单位。',
  },
  {
    term: '可验证奖励强化学习',
    en: 'RLVR, Reinforcement Learning with Verifiable Rewards',
    definition: '用可自动校验的结果（如代码是否通过测试）作为奖励信号训练模型，取代部分人工偏好标注。',
  },
  {
    term: '上下文窗口',
    en: 'Context Window',
    definition: '模型单次能「记住」的最大 token 数量，决定了长文档与全库代码分析能力上限。',
  },
  {
    term: '渗透率',
    en: 'Penetration Rate',
    definition: '本报告口径：行业内头部企业已进入 AIGC 试点或放量阶段的占比。',
  },
]
