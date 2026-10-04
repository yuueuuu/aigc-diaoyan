import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'

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
import { MODEL_METRICS, OSS_ECO, TECH_MILESTONES, TECH_TRACKS } from '@/data/tech'
import type { TechTrackKey } from '@/data/tech'
import { CHART_COLORS } from '@/lib/chart-colors'

type TrackFilter = TechTrackKey | 'all'
type MetricDim = 'cost' | 'speed' | 'hallucination' | 'context'

const DIMENSIONS: { value: MetricDim; label: string; unit: string }[] = [
  { value: 'cost', label: '输出成本（元/百万token）', unit: '元' },
  { value: 'speed', label: '生成速度（token/s）', unit: 'token/s' },
  { value: 'hallucination', label: '幻觉率（%）', unit: '%' },
  { value: 'context', label: '上下文窗口（万token）', unit: '万token' },
]

const TRACK_LABEL = Object.fromEntries(TECH_TRACKS.map((t) => [t.key, t.label]))

/** 技术调研页：迭代路径 + 指标对比 + 开源生态 */
export default function TechPage() {
  const [track, setTrack] = useState<TrackFilter>('all')
  const [dim, setDim] = useState<MetricDim>('cost')

  const milestones = useMemo(
    () => TECH_MILESTONES.filter((m) => track === 'all' || m.track === track),
    [track],
  )

  const dimMeta = DIMENSIONS.find((d) => d.value === dim)!

  const metricChartData = MODEL_METRICS.map((m) => ({ model: m.model, value: m[dim] }))

  const metricCsv: (string | number)[][] = [
    ['模型', '输出成本(元/百万token)', '生成速度(token/s)', '幻觉率(%)', '上下文窗口(万token)'],
    ...MODEL_METRICS.map((m) => [m.model, m.cost, m.speed, m.hallucination, m.context]),
  ]

  const ossChartData = OSS_ECO.map((o) => ({ name: o.name, stars: o.stars }))
  const ossCsv: (string | number)[][] = [
    ['项目', 'Stars(万)', '年度合并PR', '贡献者数', '许可证'],
    ...OSS_ECO.map((o) => [o.name, o.stars, o.prs, o.contributors, o.license]),
  ]

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:px-6 md:py-14">
        <PageHeader
          index="01"
          eyebrow="Technology Research"
          title="技术调研"
          description="近一年 AIGC 核心技术迭代路径（架构 / 算法 / 效能 / 安全）、关键指标对比与开源生态活跃度统计。"
        />

        {/* 一、迭代路径 */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-foreground">1. 核心技术迭代路径</h2>
            <div className="no-print flex flex-wrap gap-1.5">
              {([['all', '全部'], ...TECH_TRACKS.map((t) => [t.key, t.label])] as [TrackFilter, string][]).map(
                ([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTrack(key)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      track === key
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="relative pl-8"
                >
                  <span className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-primary bg-background" />
                  <div className="print-block rounded-lg border border-border bg-card p-4 md:p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold tabular-nums text-secondary-foreground">
                        {m.quarter}
                      </span>
                      <span className="rounded-md border border-primary/30 px-2 py-0.5 text-xs font-medium text-primary">
                        {TRACK_LABEL[m.track]}
                      </span>
                    </div>
                    <h3 className="mb-1.5 text-sm font-semibold text-foreground md:text-base">
                      {m.title}
                    </h3>
                    <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                    <p className="text-xs text-muted-foreground/80">来源：{m.source}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 二、关键指标对比 */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-foreground">2. 关键指标对比</h2>
            <div className="no-print w-full sm:w-72">
              <Select value={dim} onValueChange={(v) => setDim(v as MetricDim)}>
                <SelectTrigger className="w-full" aria-label="选择对比维度">
                  <SelectValue placeholder="选择对比维度" />
                </SelectTrigger>
                <SelectContent>
                  {DIMENSIONS.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ChartCard
            title={`模型${dimMeta.label}对比`}
            description="模型命名已脱敏，完整对照表见附录下载版。数据来源：各厂商官方定价页与公开评测基准（2026-09 采集）。"
            csvFilename="aigc-model-metrics"
            csvRows={metricCsv}
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metricChartData} margin={{ top: 18, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#B5C0CE" />
                  <XAxis
                    dataKey="model"
                    tick={{ fontSize: 11, fill: '#445F7E' }}
                    interval={0}
                    tickFormatter={(v: string) => v.split('（')[0]}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#445F7E' }} />
                  <Tooltip
                    formatter={(value: number) => [`${value} ${dimMeta.unit}`, dimMeta.label]}
                    labelFormatter={(label: string) => label}
                  />
                  <Bar dataKey="value" fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} maxBarSize={56}>
                    <LabelList dataKey="value" position="top" fontSize={11} fill="#113969" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <div className="print-block rounded-lg border border-border bg-card">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">模型（脱敏）</TableHead>
                    <TableHead className="whitespace-nowrap text-right">
                      输出成本（元/百万token）
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-right">
                      生成速度（token/s）
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-right">幻觉率（%）</TableHead>
                    <TableHead className="whitespace-nowrap text-right">
                      上下文窗口（万token）
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MODEL_METRICS.map((m) => (
                    <TableRow key={m.model}>
                      <TableCell className="whitespace-nowrap font-medium">{m.model}</TableCell>
                      <TableCell className="text-right tabular-nums">{m.cost}</TableCell>
                      <TableCell className="text-right tabular-nums">{m.speed}</TableCell>
                      <TableCell className="text-right tabular-nums">{m.hallucination}</TableCell>
                      <TableCell className="text-right tabular-nums">{m.context}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* 三、开源生态 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">3. 开源生态活跃度统计</h2>
          <ChartCard
            title="代表性开源项目 Stars 规模"
            description="统计周期 2025.09-2026.09；项目命名已脱敏，完整清单见附录。数据来源：GitHub 公开数据。"
            csvFilename="aigc-oss-eco"
            csvRows={ossCsv}
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ossChartData}
                  layout="vertical"
                  margin={{ top: 4, right: 32, left: 8, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#B5C0CE" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#445F7E' }} unit=" 万" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={128}
                    tick={{ fontSize: 11, fill: '#445F7E' }}
                  />
                  <Tooltip formatter={(value: number) => [`${value} 万`, 'GitHub Stars']} />
                  <Bar dataKey="stars" fill={CHART_COLORS[1]} radius={[0, 3, 3, 0]} maxBarSize={22}>
                    <LabelList dataKey="stars" position="right" fontSize={11} fill="#113969" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <div className="print-block rounded-lg border border-border bg-card">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">项目（脱敏）</TableHead>
                    <TableHead className="whitespace-nowrap text-right">Stars（万）</TableHead>
                    <TableHead className="whitespace-nowrap text-right">
                      年度合并 PR（个）
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-right">贡献者（人）</TableHead>
                    <TableHead className="whitespace-nowrap">许可证</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {OSS_ECO.map((o) => (
                    <TableRow key={o.name}>
                      <TableCell className="font-medium">{o.name}</TableCell>
                      <TableCell className="text-right tabular-nums">{o.stars}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {o.prs.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {o.contributors.toLocaleString()}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{o.license}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
