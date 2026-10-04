// EXPORTS: ISearchIndexItem, SEARCH_INDEX
import { CORE_FINDINGS, SURVEY_META } from './report-meta';
import { TECH_MILESTONES, TECH_TRACKS, MODEL_METRICS, OSS_ECO } from './tech';
import { MARKET_SIZE, PLAYERS, FUNDING_TRACKS } from './industry';
import { PENETRATIONS, CASES, PAIN_POINTS } from './applications';
import { POLICIES, TRENDS, ADVICES } from './trends';
import { DATA_SOURCES, GLOSSARY } from './appendix';

export interface ISearchIndexItem {
  /** 唯一id */
  id: string;
  /** 来源页面路由 */
  page: string;
  /** 来源板块名 */
  pageLabel: string;
  /** 条目标题 */
  title: string;
  /** 摘要片段 */
  summary: string;
  /** 匹配用关键词 */
  keywords: string[];
}

const TRACK_LABEL = Object.fromEntries(TECH_TRACKS.map((t) => [t.key, t.label]));

/** 全站内容搜索索引：由各板块数据汇总构建 */
export const SEARCH_INDEX: ISearchIndexItem[] = [
  {
    id: 'page-home',
    page: '/',
    pageLabel: '首页',
    title: `${SURVEY_META.fullName}（${SURVEY_META.version}）`,
    summary: `调研周期 ${SURVEY_META.period}；${SURVEY_META.scope}`,
    keywords: ['白皮书', '首页', '调研', 'aigc', '更新日志'],
  },
  {
    id: 'page-tech',
    page: '/tech',
    pageLabel: '技术调研',
    title: '技术调研：迭代路径 / 指标对比 / 开源生态',
    summary: '架构、算法、效能、安全四条主线的核心技术迭代与关键指标对比',
    keywords: ['技术', '架构', '算法', '效能', '安全', 'moe', '幻觉率', '开源'],
  },
  {
    id: 'page-industry',
    page: '/industry',
    pageLabel: '产业调研',
    title: '产业调研：市场规模 / 核心玩家 / 投融资',
    summary: '2025-2026 全球与国内市场规模、核心玩家布局与投融资热点赛道分布',
    keywords: ['产业', '市场规模', '投融资', '玩家', '赛道', '资本'],
  },
  {
    id: 'page-applications',
    page: '/applications',
    pageLabel: '应用调研',
    title: '应用调研：行业渗透率 / 标杆案例 / 落地痛点',
    summary: '七大重点行业渗透率、标杆落地案例与共性痛点统计',
    keywords: ['应用', '渗透率', '案例', '痛点', '落地', '行业'],
  },
  {
    id: 'page-trends',
    page: '/trends',
    pageLabel: '趋势板块',
    title: '趋势板块：政策梳理 / 趋势预判 / 发展建议',
    summary: '国内外政策梳理、1-3 年发展趋势预判与分主体发展建议',
    keywords: ['趋势', '政策', '预判', '建议', 'ai act'],
  },
  {
    id: 'page-appendix',
    page: '/appendix',
    pageLabel: '附录',
    title: '附录：数据来源 / 名词解释 / 报告下载',
    summary: '全站数据来源链接、核心名词解释与完整报告下载入口',
    keywords: ['附录', '来源', '名词', '术语', '下载'],
  },
  ...CORE_FINDINGS.map((f) => ({
    id: `finding-${f.id}`,
    page: '/',
    pageLabel: '核心结论',
    title: f.title,
    summary: f.summary,
    keywords: [f.title, f.source, '结论'],
  })),
  ...TECH_MILESTONES.map((m) => ({
    id: `milestone-${m.id}`,
    page: '/tech',
    pageLabel: '技术调研',
    title: `${m.quarter} · ${m.title}`,
    summary: m.desc,
    keywords: [m.title, m.desc, TRACK_LABEL[m.track], m.quarter, m.source],
  })),
  ...MODEL_METRICS.map((m) => ({
    id: `metric-${m.model}`,
    page: '/tech',
    pageLabel: '技术调研',
    title: `${m.model} 指标`,
    summary: `输出价格 ${m.cost} 元/百万token，速度 ${m.speed} token/s，幻觉率 ${m.hallucination}%，上下文 ${m.context} 万 token`,
    keywords: [m.model, '指标', '成本', '速度', '幻觉率', '上下文', '对比'],
  })),
  ...OSS_ECO.map((o) => ({
    id: `oss-${o.name}`,
    page: '/tech',
    pageLabel: '技术调研',
    title: o.name,
    summary: `Stars ${o.stars} 万，年度合并 PR ${o.prs}，贡献者 ${o.contributors} 人`,
    keywords: [o.name, '开源', '生态', '活跃度', o.license],
  })),
  ...PLAYERS.map((p) => ({
    id: `player-${p.id}`,
    page: '/industry',
    pageLabel: '产业调研',
    title: p.name,
    summary: `${p.region} · ${p.positioning}。${p.layout}`,
    keywords: [p.name, p.region, p.positioning, p.representative, '玩家', '布局'],
  })),
  ...FUNDING_TRACKS.map((f) => ({
    id: `funding-${f.track}`,
    page: '/industry',
    pageLabel: '产业调研',
    title: `投融资赛道：${f.track}`,
    summary: `${f.deals} 起融资事件，披露总额 ${f.amount} 亿元`,
    keywords: [f.track, '投融资', '融资', '赛道', '资本'],
  })),
  ...PENETRATIONS.map((p) => ({
    id: `penetration-${p.industry}`,
    page: '/applications',
    pageLabel: '应用调研',
    title: `${p.industry}行业渗透率 ${p.rate}%`,
    summary: `同比提升 ${p.yoy} 个百分点`,
    keywords: [p.industry, '渗透率', '行业'],
  })),
  ...CASES.map((c) => ({
    id: `case-${c.id}`,
    page: '/applications',
    pageLabel: '应用调研',
    title: `${c.industry}案例：${c.company}`,
    summary: `${c.solution} ${c.effect}`,
    keywords: [c.industry, c.company, '案例', '标杆', '落地'],
  })),
  ...PAIN_POINTS.map((p) => ({
    id: `pain-${p.point}`,
    page: '/applications',
    pageLabel: '应用调研',
    title: `落地痛点：${p.point}`,
    summary: `企业问卷提及率 ${p.share}%`,
    keywords: [p.point, '痛点', '痛点统计'],
  })),
  ...POLICIES.map((p) => ({
    id: `policy-${p.id}`,
    page: '/trends',
    pageLabel: '趋势板块',
    title: p.name,
    summary: p.summary,
    keywords: [p.name, p.date, p.region === 'cn' ? '国内政策' : '国际政策', '政策'],
  })),
  ...TRENDS.map((t) => ({
    id: `trend-${t.id}`,
    page: '/trends',
    pageLabel: '趋势板块',
    title: `${t.horizon}趋势：${t.title}`,
    summary: t.judgment,
    keywords: [t.title, t.horizon, '趋势', '预判', t.basis],
  })),
  ...ADVICES.map((a) => ({
    id: `advice-${a.key}`,
    page: '/trends',
    pageLabel: '趋势板块',
    title: `给${a.label}的建议`,
    summary: a.points.join('；'),
    keywords: [a.label, '建议', '发展建议'],
  })),
  ...GLOSSARY.map((g) => ({
    id: `glossary-${g.term}`,
    page: '/appendix',
    pageLabel: '附录',
    title: g.term,
    summary: g.definition,
    keywords: [g.term, g.en, '名词', '术语', '解释'],
  })),
  ...DATA_SOURCES.map((d) => ({
    id: `source-${d.id}`,
    page: '/appendix',
    pageLabel: '附录',
    title: d.name,
    summary: `${d.type} · ${d.note}`,
    keywords: [d.name, d.type, '数据来源', '溯源'],
  })),
];
