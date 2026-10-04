import { motion } from 'framer-motion'

import { CORE_FINDINGS } from '@/data/report-meta'

/** 首页核心结论摘要（3-5 条） */
export default function FindingsSection() {
  return (
    <section id="findings" className="scroll-mt-20 space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Executive Summary
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">核心结论摘要</h2>
        <p className="text-muted-foreground">
          五条主线索结论，每条均标注数据来源，点击对应板块可查看完整论证。
        </p>
      </div>

      <div className="space-y-4">
        {CORE_FINDINGS.map((finding, i) => (
          <motion.article
            key={finding.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="print-block flex gap-5 rounded-lg border border-border bg-card p-5 md:p-6"
          >
            <span className="text-2xl font-bold leading-none tabular-nums text-primary/30 md:text-3xl">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <h3 className="text-base font-semibold text-foreground md:text-lg">
                {finding.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{finding.summary}</p>
              <p className="text-xs text-muted-foreground/80">
                来源：<span className="font-medium text-foreground/70">{finding.source}</span>
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
