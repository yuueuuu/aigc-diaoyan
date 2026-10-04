import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'
import { Building2, Coins, Gauge, Layers } from 'lucide-react'

import PageHeader from '@/components/PageHeader'
import ChartCard from '@/components/ChartCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CASES, PAIN_POINTS, PENETRATIONS } from '@/data/applications'
import { CHART_COLORS } from '@/lib/chart-colors'

/** 应用调研页：行业渗透率 + 标杆案例 + 共性痛点 */
export default function ApplicationsPage() {
  const [industry, setIndustry] = useState('all')

  const industries = useMemo(() => [...new Set(CASES.map((c) => c.industry))], [])

  const filteredCases = useMemo(
    () => CASES.filter((c) => industry === 'all' || c.industry === industry),
    [industry],
  )

  const penetrationData = PENETRATIONS.map((p) => ({ industry: p.industry, rate: p.rate }))
  const penetrationCsv: (string | number)[][] = [
    ['行业', '渗透率(%)', '同比(+pp)'],
    ...PENETRATIONS.map((p) => [p.industry, p.rate, p.yoy]),
  ]

  const painCsv: (string | number)[][] = [
    ['落地痛点', '提及率(%)'],
    ...PAIN_POINTS.map((p) => [p.point, p.share]),
  ]

  const maxPain = Math.max(...PAIN_POINTS.map((p) => p.share))

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:px-6 md:py-14">
        <PageHeader
          index="03"
          eyebrow="Application Research"
          title="应用调研"
          description="七大重点行业渗透率、标杆落地案例（方案 / 效果 / 成本）与共性落地痛点统计。"
        />

        {/* 一、行业渗透率 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">1. 重点行业渗透率</h2>
          <ChartCard
            title="七大行业 AIGC 渗透率（2026H1）"
            description="口径：行业内头部企业已进入试点或放量阶段的占比。数据来源：本调研企业访谈与公开案例汇总。"
            csvFilename="aigc-industry-penetration"
            csvRows={penetrationCsv}
          >
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={penetrationData} margin={{ top: 18, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#B5C0CE" />
                  <XAxis dataKey="industry" tick={{ fontSize: 12, fill: '#445F7E' }} interval={0} />
                  <YAxis tick={{ fontSize: 11, fill: '#445F7E' }} unit="%" domain={[0, 80]} />
                  <Tooltip formatter={(value: number) => [`${value}%`, '渗透率']} />
                  <Bar dataKey="rate" fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} maxBarSize={52}>
                    <LabelList
                      dataKey="rate"
                      position="top"
                      fontSize={11}
                      fill="#113969"
                      formatter={(v: number) => `${v}%`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <div className="print-block grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PENETRATIONS.slice(0, 4).map((p) => (
              <div key={p.industry} className="rounded-lg border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">{p.industry}</p>
                <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                  {p.rate}%
                  <span className="ml-1.5 text-xs font-medium text-primary">+{p.yoy}pp</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 二、标杆落地案例 */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-foreground">2. 标杆落地案例</h2>
            <div className="no-print w-full sm:w-52">
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full" aria-label="按行业筛选案例">
                  <SelectValue placeholder="按行业筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部行业</SelectItem>
                  {industries.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredCases.map((c, i) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="print-block rounded-lg border border-border bg-card p-5 md:p-6"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {c.industry}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{c.company}</span>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5 md:col-span-1">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <Layers className="size-3.5" /> 落地 方案
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.solution}</p>
                  </div>
                  <div className="space-y-1.5 md:col-span-1">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <Gauge className="size-3.5" /> 落地 效果
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.effect}</p>
                  </div>
                  <div className="space-y-1.5 md:col-span-1">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <Coins className="size-3.5" /> 投入 成本
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.cost}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground/80">
                      <Building2 className="size-3.5" /> {c.scale}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* 三、共性痛点 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">3. 共性落地痛点统计</h2>
          <ChartCard
            title="企业落地痛点提及率"
            description="企业问卷 N=126，多选题；提及率为选择该项的受访主体占比。数据来源：本调研问卷。"
            csvFilename="aigc-pain-points"
            csvRows={painCsv}
          >
            <div className="space-y-4">
              {PAIN_POINTS.map((p, i) => (
                <div key={p.point} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium text-foreground">{p.point}</span>
                    <span className="text-sm font-bold tabular-nums text-primary">{p.share}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(p.share / maxPain) * 100}%`,
                        backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </section>
      </div>
    </div>
  )
}
