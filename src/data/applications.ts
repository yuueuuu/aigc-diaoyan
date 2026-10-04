// EXPORTS: PENETRATIONS, CASES, PAIN_POINTS

export interface IPenetration {
  industry: string
  /** 渗透率（%，头部企业已进入试点或放量阶段的占比） */
  rate: number
  /** 同比变化（+pp） */
  yoy: number
}

/** 七大重点行业渗透率（2026H1，头部企业口径） */
export const PENETRATIONS: IPenetration[] = [
  { industry: '金融', rate: 68, yoy: 14 },
  { industry: '软件研发', rate: 64, yoy: 18 },
  { industry: '传媒内容', rate: 61, yoy: 15 },
  { industry: '教育培训', rate: 47, yoy: 12 },
  { industry: '智能制造', rate: 35, yoy: 10 },
  { industry: '医疗健康', rate: 33, yoy: 9 },
  { industry: '政务服务', rate: 28, yoy: 7 },
]

export interface ICase {
  id: string
  industry: string
  company: string
  solution: string
  effect: string
  cost: string
  scale: string
}

/** 标杆落地案例（企业名已脱敏） */
export const CASES: ICase[] = [
  {
    id: '1',
    industry: '金融',
    company: '某头部股份制银行',
    solution: '智能客服 + 信贷报告生成助手，私有化部署接入行内知识库。',
    effect: '客服人力成本下降 35%，信贷报告撰写时间从 2 小时缩短至 15 分钟。',
    cost: '年投入约 1,200 万元（含私有化部署与运维）',
    scale: '覆盖全行 3.2 万名员工',
  },
  {
    id: '2',
    industry: '软件研发',
    company: '某互联网大厂',
    solution: 'AI 编程助手嵌入 IDE，覆盖需求理解、代码生成、单测补全全流程。',
    effect: '代码采纳率 32%，需求平均交付周期缩短 20%。',
    cost: '年 License 与算力投入约 8,000 万元',
    scale: '1.2 万名研发人员',
  },
  {
    id: '3',
    industry: '传媒内容',
    company: '某省级广电集团',
    solution: 'AIGC 短视频批量生产平台，脚本、配音、剪辑一站式生成。',
    effect: '日产能从 20 条提升至 300 条，单条制作成本下降 60%。',
    cost: '平台建设投入约 2,000 万元',
    scale: '覆盖 12 个频道新媒体矩阵',
  },
  {
    id: '4',
    industry: '教育培训',
    company: '某在线教育上市公司',
    solution: 'AI 助教答疑 + 个性化习题生成，接入学习行为数据。',
    effect: '学员完课率提升 18%，题库生产成本下降 45%。',
    cost: '年投入约 3,000 万元',
    scale: '服务 800 万注册学员',
  },
  {
    id: '5',
    industry: '智能制造',
    company: '某新能源汽车厂商',
    solution: '设计端 AIGC 渲染 + 营销素材自动化生成流水线。',
    effect: '新车型营销素材制作周期从 6 周压缩至 1 周。',
    cost: '年节省外包费用约 2,600 万元',
    scale: '覆盖 3 个品牌线',
  },
  {
    id: '6',
    industry: '医疗健康',
    company: '某三甲医院集团',
    solution: '病历质控 + 影像报告辅助生成，院内私有化部署。',
    effect: '病历合格率提升 12pp，报告书写时间缩短 50%。',
    cost: '私有化部署约 1,500 万元',
    scale: '覆盖 5 家医院',
  },
]

export interface IPainPoint {
  point: string
  /** 提及率（%，多选） */
  share: number
}

/** 共性落地痛点统计（企业问卷 N=126，多选） */
export const PAIN_POINTS: IPainPoint[] = [
  { point: '数据安全与合规顾虑', share: 62 },
  { point: '幻觉导致的准确率不可控', share: 57 },
  { point: '投入产出难以量化', share: 49 },
  { point: '人才与组织能力缺口', share: 41 },
  { point: '与现有系统整合难度大', share: 38 },
]
