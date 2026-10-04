// EXPORTS: MARKET_SIZE, PLAYERS, FUNDING_TRACKS

export interface IMarketSize {
  year: string
  /** 全球市场规模（亿美元） */
  global: number
  /** 中国市场规模（亿美元） */
  china: number
}

/** 市场规模（E 为预测值） */
export const MARKET_SIZE: IMarketSize[] = [
  { year: '2025', global: 720, china: 178 },
  { year: '2026E', global: 1080, china: 268 },
  { year: '2027E', global: 1560, china: 390 },
]

export interface IPlayer {
  id: string
  name: string
  region: '海外' | '国内'
  positioning: string
  layout: string
  representative: string
}

/** 核心玩家布局 */
export const PLAYERS: IPlayer[] = [
  {
    id: '1',
    name: 'OpenAI',
    region: '海外',
    positioning: '闭源旗舰 + 通用助手',
    layout: '订阅与 API 双轮驱动，向 Agent 操作系统方向演进。',
    representative: 'GPT 系列旗舰模型',
  },
  {
    id: '2',
    name: 'Google',
    region: '海外',
    positioning: '全栈自研 + 云端分发',
    layout: '自研 TPU 压低成本，模型深度整合搜索与办公套件。',
    representative: 'Gemini 系列',
  },
  {
    id: '3',
    name: 'Meta',
    region: '海外',
    positioning: '开源生态主导',
    layout: '以开源权重换取生态位，衍生模型数量全球第一。',
    representative: 'Llama 系列',
  },
  {
    id: '4',
    name: '字节跳动',
    region: '国内',
    positioning: '模型 + 应用闭环',
    layout: '以低价 API 策略快速放量，火山引擎承接企业侧需求。',
    representative: '豆包系列',
  },
  {
    id: '5',
    name: '阿里云',
    region: '国内',
    positioning: '开源 + 云服务并行',
    layout: '开源权重与闭源 API 双线推进，云上调用量国内领先。',
    representative: '通义千问系列',
  },
  {
    id: '6',
    name: 'DeepSeek',
    region: '国内',
    positioning: '高效开源路线',
    layout: '以极致性价比开源权重冲击全球市场，引发行业定价重构。',
    representative: 'DeepSeek-V/R 系列',
  },
]

export interface IFundingTrack {
  track: string
  /** 融资事件数（件） */
  deals: number
  /** 披露融资总额（亿元） */
  amount: number
}

/** 投融资热点赛道分布（2025.01-2026.09，国内公开披露口径） */
export const FUNDING_TRACKS: IFundingTrack[] = [
  { track: 'Agent 基础设施', deals: 86, amount: 412 },
  { track: '垂直行业应用', deals: 121, amount: 298 },
  { track: '多模态与视频生成', deals: 54, amount: 186 },
  { track: '推理与算力优化', deals: 38, amount: 124 },
  { track: 'AI 安全与合规', deals: 22, amount: 46 },
]
