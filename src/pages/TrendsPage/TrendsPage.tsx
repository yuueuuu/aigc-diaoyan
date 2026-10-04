import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Globe2, Landmark } from 'lucide-react'

import PageHeader from '@/components/PageHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ADVICES, POLICIES, TRENDS } from '@/data/trends'
import type { PolicyRegion } from '@/data/trends'

type RegionFilter = PolicyRegion | 'all'

const HORIZON_STYLE: Record<string, string> = {
  '1年内': 'border-primary/30 bg-secondary text-secondary-foreground',
  '1-3年': 'border-border bg-muted text-muted-foreground',
}

/** 趋势板块页：政策梳理 + 趋势预判 + 分主体建议 */
export default function TrendsPage() {
  const [region, setRegion] = useState<RegionFilter>('all')

  const policies = useMemo(
    () => POLICIES.filter((p) => region === 'all' || p.region === region),
    [region],
  )

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:px-6 md:py-14">
        <PageHeader
          index="04"
          eyebrow="Trends & Outlook"
          title="趋势板块"
          description="国内外政策梳理、1-3 年发展趋势预判与分主体发展建议，判断依据逐条标注。"
        />

        {/* 一、政策梳理 */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-foreground">1. 国内外政策梳理</h2>
            <div className="no-print flex flex-wrap gap-1.5">
              {(
                [
                  ['all', '全部'],
                  ['cn', '国内'],
                  ['global', '国际'],
                ] as [RegionFilter, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRegion(key)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    region === key
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
            <div className="space-y-4">
              {policies.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="relative pl-8"
                >
                  <span className="absolute left-0 top-2.5 size-[15px] rounded-full border-2 border-primary bg-background" />
                  <div className="print-block rounded-lg border border-border bg-card p-4 md:p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold tabular-nums text-secondary-foreground">
                        {p.region === 'cn' ? (
                          <Landmark className="size-3.5" />
                        ) : (
                          <Globe2 className="size-3.5" />
                        )}
                        {p.region === 'cn' ? '国内' : '国际'}
                      </span>
                      <span className="text-xs tabular-nums text-muted-foreground">{p.date}</span>
                    </div>
                    <h3 className="mb-1.5 text-sm font-semibold text-foreground md:text-base">
                      {p.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 二、趋势预判 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">2. 1-3 年发展趋势预判</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {TRENDS.map((t, i) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="print-block rounded-lg border border-border bg-card p-5"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${HORIZON_STYLE[t.horizon]}`}
                  >
                    {t.horizon}
                  </span>
                  <span className="text-xs text-muted-foreground">预判</span>
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{t.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{t.judgment}</p>
                <p className="rounded-md bg-muted/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground/70">判断依据：</span>
                  {t.basis}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* 三、分主体建议 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">3. 分主体发展建议</h2>
          <Tabs defaultValue="practitioner">
            <TabsList className="no-print h-auto w-full justify-start gap-1 rounded-md bg-muted p-1 sm:w-auto">
              {ADVICES.map((a) => (
                <TabsTrigger
                  key={a.key}
                  value={a.key}
                  className="rounded-sm px-4 py-2 text-sm data-[state=active]:bg-card data-[state=active]:text-primary"
                >
                  {a.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {ADVICES.map((a) => (
              <TabsContent key={a.key} value={a.key} className="mt-4">
                <div className="print-block rounded-lg border border-border bg-card p-5 md:p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
                    <FileText className="size-4 text-primary" />
                    给{a.label}的三点建议
                  </h3>
                  <ol className="space-y-3">
                    {a.points.map((point, idx) => (
                      <li key={point} className="flex gap-3">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-bold tabular-nums text-secondary-foreground">
                          {idx + 1}
                        </span>
                        <p className="pt-0.5 text-sm leading-relaxed text-muted-foreground">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </div>
    </div>
  )
}
