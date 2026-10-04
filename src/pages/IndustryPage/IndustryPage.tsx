import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import PageHeader from '@/components/PageHeader'
import ChartCard from '@/components/ChartCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FUNDING_TRACKS, MARKET_SIZE, PLAYERS } from '@/data/industry'
import { CHART_COLORS } from '@/lib/chart-colors'

type FundingMetric = 'amount' | 'deals'

/** 产业调研页：市场规模 + 核心玩家 + 投融资 */
export default function IndustryPage() {
  const [metric, setMetric] = useState<FundingMetric>('amount')

  const marketChartData = MARKET_SIZE.map((m) => ({
    year: m.year,
    global: m.global,
    china: m.china,
  }))
  const marketCsv: (string | number)[][] = [
    ['年份', '全球市场规模(亿美元)', '中国市场规模(亿美元)'],
    ...MARKET_SIZE.map((m) => [m.year, m.global, m.china]),
  ]

  const fundingChartData = FUNDING_TRACKS.map((f) => ({
    track: f.track,
    value: metric === 'amount' ? f.amount : f.deals,
  }))
  const fundingCsv: (string | number)[][] = [
    ['赛道', '融资事件(件)', '披露金额(亿元)'],
    ...FUNDING_TRACKS.map((f) => [f.track, f.deals, f.amount]),
  ]

  const fundingUnit = metric === 'amount' ? '亿元' : '件'

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:px-6 md:py-14">
        <PageHeader
          index="02"
          eyebrow="Industry Research"
          title="产业调研"
          description="2025-2026 年全球与国内市场规模、核心玩家布局与投融资热点赛道分布，口径与来源逐项标注。"
        />

        {/* 一、市场规模 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">1. 全球 / 国内市场规模</h2>
          <ChartCard
            title="AIGC 市场规模（全球 vs 中国）"
            description="E 为预测值。数据来源：IDC《全球 AI 支出指南》、中国信通院（2026-09 口径）。"
            csvFilename="aigc-market-size"
            csvRows={marketCsv}
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketChartData} margin={{ top: 18, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#B5C0CE" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#445F7E' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#445F7E' }} unit=" 亿美元" />
                  <Tooltip formatter={(value: number) => [`${value} 亿美元`]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar
                    name="全球"
                    dataKey="global"
                    fill={CHART_COLORS[0]}
                    radius={[3, 3, 0, 0]}
                    maxBarSize={48}
                  >
                    <LabelList dataKey="global" position="top" fontSize={11} fill="#113969" />
                  </Bar>
                  <Bar
                    name="中国"
                    dataKey="china"
                    fill={CHART_COLORS[2]}
                    radius={[3, 3, 0, 0]}
                    maxBarSize={48}
                  >
                    <LabelList dataKey="china" position="top" fontSize={11} fill="#113969" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* 二、核心玩家布局 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">2. 核心玩家布局</h2>
          <div className="print-block rounded-lg border border-border bg-card">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">企业</TableHead>
                    <TableHead className="whitespace-nowrap">区域</TableHead>
                    <TableHead className="whitespace-nowrap">战略定位</TableHead>
                    <TableHead className="min-w-[280px]">布局要点</TableHead>
                    <TableHead className="whitespace-nowrap">代表产品</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PLAYERS.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="whitespace-nowrap font-medium">{p.name}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span
                          className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                            p.region === '国内'
                              ? 'bg-secondary text-secondary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {p.region}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {p.positioning}
                      </TableCell>
                      <TableCell>
                        <span className="block max-w-md">{p.layout}</span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {p.representative}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* 三、投融资 */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-foreground">3. 投融资热点赛道分布</h2>
            <div className="no-print w-full sm:w-56">
              <Select value={metric} onValueChange={(v) => setMetric(v as FundingMetric)}>
                <SelectTrigger className="w-full" aria-label="选择投融资指标">
                  <SelectValue placeholder="选择指标" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">披露融资金额（亿元）</SelectItem>
                  <SelectItem value="deals">融资事件数（件）</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ChartCard
            title="国内 AIGC 投融资赛道分布"
            description="统计周期 2025.01-2026.09，国内公开披露口径。数据来源：公开投融资数据库。"
            csvFilename="aigc-funding-tracks"
            csvRows={fundingCsv}
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fundingChartData}
                  layout="vertical"
                  margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#B5C0CE" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#445F7E' }} unit={` ${fundingUnit}`} />
                  <YAxis
                    type="category"
                    dataKey="track"
                    width={124}
                    tick={{ fontSize: 11, fill: '#445F7E' }}
                  />
                  <Tooltip formatter={(value: number) => [`${value} ${fundingUnit}`]} />
                  <Bar dataKey="value" fill={CHART_COLORS[0]} radius={[0, 3, 3, 0]} maxBarSize={22}>
                    <LabelList dataKey="value" position="right" fontSize={11} fill="#113969" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <p className="text-sm leading-relaxed text-muted-foreground">
            注：Agent 基础设施与垂直行业应用两大赛道合计占 2025 年以来披露融资额的 58%，
            资本集中度较 2024 年（CR2 约 41%）显著上升。
          </p>
        </section>
      </div>
    </div>
  )
}
