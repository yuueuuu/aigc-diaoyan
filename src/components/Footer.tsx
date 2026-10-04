import { NavLink } from 'react-router-dom'
import { FileText } from 'lucide-react'

import { NAV_ITEMS } from '@/lib/navigation'
import { SURVEY_META } from '@/data/report-meta'

export default function Footer() {
  return (
    <footer className="no-print w-full bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-md bg-white/10">
                <FileText className="size-5" />
              </span>
              <span className="font-bold">{SURVEY_META.fullName}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              面向行业从业者、科研人员与企业决策方的 AIGC 前沿调研。
              调研周期 {SURVEY_META.period}，当前版本 {SURVEY_META.version}。
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">板块导航</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `text-sm transition-colors ${
                        isActive ? 'text-white' : 'text-white/70 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">数据声明</h3>
            <p className="text-sm leading-relaxed text-white/70">
              本报告所有数据均标注来源（顶会论文 / 官方统计 / 企业公开数据），
              仅供研究参考，不构成投资建议。完整来源清单见附录。
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4 text-center text-xs text-white/60">
          © 2026 {SURVEY_META.title} · 调研周期 {SURVEY_META.period} · 最后更新{' '}
          {SURVEY_META.updated}
        </div>
      </div>
    </footer>
  )
}
