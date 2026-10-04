// EXPORTS: POLICIES, TRENDS, ADVICES

export type PolicyRegion = 'cn' | 'global'

export interface IPolicy {
  id: string
  region: PolicyRegion
  date: string
  name: string
  summary: string
}

/** 国内外政策梳理（按时间倒序） */
export const POLICIES: IPolicy[] = [
  {
    id: '1',
    region: 'cn',
    date: '2026-08',
    name: '《生成式人工智能服务管理暂行办法》修订要点落地',
    summary: '强化训练数据合规与生成内容标识要求，明确备案与评估流程。',
  },
  {
    id: '2',
    region: 'global',
    date: '2026-06',
    name: '欧盟 AI Act 高风险条款进入执行期',
    summary: '通用模型须公开训练数据摘要，违规最高可处全球营业额 7% 罚款。',
  },
  {
    id: '3',
    region: 'cn',
    date: '2026-03',
    name: '国家级 AI 产业投资基金第二期扩容',
    summary: '重点投向基础模型与算力基础设施，引导长期资本入场。',
  },
  {
    id: '4',
    region: 'global',
    date: '2026-01',
    name: '美国 AI 出口管制新规生效',
    summary: '高端算力与模型权重分级管制，跨境技术合作合规成本上升。',
  },
  {
    id: '5',
    region: 'cn',
    date: '2025-09',
    name: '《人工智能生成合成内容标识办法》正式实施',
    summary: '隐式水印 + 显式标识双轨制，平台需提供检测与核验能力。',
  },
  {
    id: '6',
    region: 'global',
    date: '2025-11',
    name: '国际 AI 安全研究所网络扩容',
    summary: '中美欧等 20 国加入大模型安全测评合作框架。',
  },
]

export type TrendHorizon = '1年内' | '1-3年'

export interface ITrend {
  id: string
  horizon: TrendHorizon
  title: string
  judgment: string
  basis: string
}

/** 1-3 年发展趋势预判 */
export const TRENDS: ITrend[] = [
  {
    id: '1',
    horizon: '1年内',
    title: 'Agent 从演示走向生产环境',
    judgment:
      '具备工具调用与长任务规划能力的 Agent，在客服、研发等封闭场景率先规模化落地。',
    basis: '头部厂商 Agent API 调用量季度环比增速超 200%',
  },
  {
    id: '2',
    horizon: '1年内',
    title: '端侧模型放量',
    judgment: '3B-7B 本地模型成为旗舰手机与 PC 标配，隐私敏感场景率先迁移至端侧。',
    basis: '终端厂商 2026 新品发布节奏与芯片 NPU 规格',
  },
  {
    id: '3',
    horizon: '1-3年',
    title: '推理成本再降一个数量级',
    judgment: '算法与硬件协同优化推动「单位智能」价格持续下探，逼近基础设施化定价。',
    basis: '2024-2026 历史成本下降曲线外推',
  },
  {
    id: '4',
    horizon: '1-3年',
    title: '垂直行业模型整合洗牌',
    judgment: '通用模型能力外溢挤压单点工具类创业公司，行业解决方案向头部集中。',
    basis: '投融资赛道集中度数据（CR5 持续上升）',
  },
  {
    id: '5',
    horizon: '1-3年',
    title: '生成内容溯源成为全球共识',
    judgment: '水印与内容凭证从合规要求变为平台默认能力，跨平台核验网络初步成形。',
    basis: '中欧美政策生效时间表交叉比对',
  },
]

export interface IAdvice {
  key: 'practitioner' | 'researcher' | 'decision'
  label: string
  points: string[]
}

/** 分主体发展建议 */
export const ADVICES: IAdvice[] = [
  {
    key: 'practitioner',
    label: '行业从业者',
    points: [
      '将 Agent 工程化能力（工具编排、评测、观测）纳入核心技能栈。',
      '持续跟踪推理成本曲线，及时切换更具性价比的模型组合。',
      '深度参与开源生态是建立技术影响力与职业壁垒的最短路径。',
    ],
  },
  {
    key: 'researcher',
    label: '科研人员',
    points: [
      '推理强化学习（RLVR）与自我纠错机制仍是开放问题，值得深耕。',
      '关注公开评测基准的失效问题，构建领域自定义评测集。',
      '与产业共建数据集是学术成果落地的有效抓手。',
    ],
  },
  {
    key: 'decision',
    label: '企业决策方',
    points: [
      '优先选择「降本确定性」场景试点，量化 ROI 后再放量推广。',
      '选择支持私有化 / 混合部署的供应商，前置降低合规风险。',
      '建立跨部门 AI 治理小组，统一数据口径与安全标准。',
    ],
  },
]
