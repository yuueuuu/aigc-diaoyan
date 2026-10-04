import { NavLink } from 'react-router-dom'

import { FRAMEWORK_MODULES, SURVEY_META } from '@/data/report-meta'

/** 调研框架图：总框架 → 四大模块（纯 CSS 结构化呈现） */
export default function FrameworkSection() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Framework
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">调研框架</h2>
        <p className="text-muted-foreground">
          四大调研模块层层递进：技术看清迭代主线，产业看清市场格局，应用看清落地实况，趋势看清未来方向。
        </p>
      </div>

      <div className="print-block rounded-lg border border-border bg-card p-5 md:p-8">
        {/* 总框架 */}
        <div className="mx-auto max-w-md rounded-lg border border-primary/30 bg-secondary/60 px-6 py-4 text-center">
          <p className="text-sm font-semibold text-secondary-foreground">
            {SURVEY_META.title} · 调研总框架
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            调研周期 {SURVEY_META.period} · {SURVEY_META.scope}
          </p>
        </div>

        {/* 连接线 */}
        <div className="mx-auto h-6 w-px bg-border" />
        <div className="relative">
          <div className="absolute inset-x-[12.5%] top-0 h-px bg-border" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {FRAMEWORK_MODULES.map((module) => (
              <div key={module.path} className="flex flex-col items-center">
                <div className="h-5 w-px bg-border" />
                <NavLink
                  to={module.path}
                  className="w-full rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-muted/60"
                >
                  <p className="text-sm font-semibold text-foreground">{module.label}</p>
                  <p className="mb-3 mt-0.5 text-xs text-muted-foreground">{module.desc}</p>
                  <ul className="space-y-1.5">
                    {module.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <span className="size-1 shrink-0 rounded-full bg-primary/50" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
