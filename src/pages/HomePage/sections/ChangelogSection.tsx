import { motion } from 'framer-motion'
import { History } from 'lucide-react'

import { CHANGELOG } from '@/data/report-meta'

/** 更新日志 */
export default function ChangelogSection() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Changelog
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">更新日志</h2>
      </div>

      <div className="relative">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
        <div className="space-y-5">
          {CHANGELOG.map((log, i) => (
            <motion.div
              key={log.version}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative pl-8"
            >
              <span className="absolute left-0 top-1.5 flex size-[15px] items-center justify-center rounded-full border-2 border-primary bg-background">
                <History className="hidden" />
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold tabular-nums text-secondary-foreground">
                  {log.version}
                </span>
                <span className="text-xs tabular-nums text-muted-foreground">{log.date}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{log.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
