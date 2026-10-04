import { Printer } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { DATA_SOURCE_BADGES, SURVEY_META } from '@/data/report-meta'

const HERO_IMAGE =
  '/spark/app/app_17fct6sw0n9/runtime/api/v1/storage/object/bucket_aadkyi4sszsgi_static/static%2Faadkyiqwtiigw_ve_miaoda'

/** 首页首屏：报告标题 + 调研周期 + 数据来源标注 + 主视觉 */
export default function HeroSection() {
  const scrollToFindings = () => {
    document.getElementById('findings')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleExportPdf = () => {
    window.print()
  }

  return (
    <section className="w-full bg-primary text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-5 md:px-6 md:py-20">
        <div className="space-y-6 md:col-span-3">
          <p className="inline-flex items-center gap-2 rounded-md border border-white/25 px-3 py-1 text-xs font-medium text-white/80">
            前沿调研白皮书 · {SURVEY_META.version} · 更新于 {SURVEY_META.updated}
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {SURVEY_META.fullName}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {SURVEY_META.scope}。面向行业从业者、科研人员与企业决策方，
            全部数据可溯源、结论可复核。
          </p>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              调研周期
            </p>
            <p className="text-lg font-semibold tabular-nums">{SURVEY_META.period}</p>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              数据来源
            </p>
            <div className="flex flex-wrap gap-2">
              {DATA_SOURCE_BADGES.map((badge) => (
                <span
                  key={badge.label}
                  title={badge.detail}
                  className="rounded-md border border-white/25 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85"
                >
                  {badge.label}
                  <span className="ml-1.5 hidden text-white/50 sm:inline">· {badge.detail}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              size="lg"
              className="rounded-md bg-white px-6 text-primary hover:bg-white/90"
              onClick={scrollToFindings}
            >
              查看核心结论
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-1.5 rounded-md border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              onClick={handleExportPdf}
            >
              <Printer className="size-4" /> 导出 PDF
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-lg border border-white/15 shadow-lg">
            <Image
              src={HERO_IMAGE}
              alt="深蓝抽象数据网络主视觉"
              className="block aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
