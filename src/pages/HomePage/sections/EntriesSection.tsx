import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Boxes, Building2, Cpu, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { FRAMEWORK_MODULES } from '@/data/report-meta'

const MODULE_ICONS: Record<string, LucideIcon> = {
  '/tech': Cpu,
  '/industry': Building2,
  '/applications': Boxes,
  '/trends': TrendingUp,
}

/** 各板块入口（4 大模块 + 附录） */
export default function EntriesSection() {
  const entries = [
    ...FRAMEWORK_MODULES.map((m) => ({
      path: m.path,
      label: m.label,
      desc: m.desc,
      points: m.points,
      appendix: false,
    })),
    {
      path: '/appendix',
      label: '附录',
      desc: '数据来源与术语',
      points: ['数据来源链接', '名词解释', '完整报告下载'],
      appendix: true,
    },
  ]

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Sections
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">板块入口</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {entries.map((entry, i) => {
          const Icon = entry.appendix ? BookOpen : MODULE_ICONS[entry.path]
          return (
            <motion.div
              key={entry.path}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <NavLink
                to={entry.path}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <span className="mb-3 flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">{entry.label}</h3>
                <p className="mb-3 mt-0.5 text-xs text-muted-foreground">{entry.desc}</p>
                <ul className="mb-4 space-y-1">
                  {entry.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <span className="size-1 shrink-0 rounded-full bg-primary/50" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                  进入板块
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </NavLink>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
