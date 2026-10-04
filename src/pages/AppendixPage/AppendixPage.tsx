import { Printer } from 'lucide-react'
import { toast } from 'sonner'
import { UniversalLink } from '@lark-apaas/client-toolkit-lite'
import { ArrowUpRight, BookOpen, Download } from 'lucide-react'

import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { DATA_SOURCES, GLOSSARY } from '@/data/appendix'
import { SURVEY_META } from '@/data/report-meta'

const TYPE_STYLE: Record<string, string> = {
  顶会论文: 'bg-secondary text-secondary-foreground',
  官方统计: 'bg-primary/10 text-primary',
  企业公开数据: 'bg-muted text-muted-foreground',
}

/** 附录页：数据来源链接 + 名词解释 + 完整报告下载 */
export default function AppendixPage() {
  const handleDownloadReport = () => {
    toast.info('已打开打印面板，选择「另存为 PDF」即可导出完整报告')
    window.print()
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:px-6 md:py-14">
        <PageHeader
          index="05"
          eyebrow="Appendix"
          title="附录"
          description="全站数据来源链接、核心名词解释与完整报告下载入口，保证每一条数据可溯源。"
        />

        {/* 一、数据来源 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">1. 数据来源链接</h2>
          <div className="print-block overflow-hidden rounded-lg border border-border bg-card">
            <div className="w-full overflow-x-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b border-border bg-muted/50 [&_th]:h-11 [&_th]:px-4 [&_th]:text-left [&_th]:align-middle [&_th]:font-medium [&_th]:text-muted-foreground">
                  <tr>
                    <th className="whitespace-nowrap">来源名称</th>
                    <th className="whitespace-nowrap">类型</th>
                    <th className="min-w-[200px]">用途说明</th>
                    <th className="whitespace-nowrap">链接</th>
                  </tr>
                </thead>
                <tbody className="[&_td]:px-4 [&_td]:py-3 [&_td]:align-middle">
                  {DATA_SOURCES.map((s) => (
                    <tr key={s.id} className="border-b border-border/60 last:border-0">
                      <td className="whitespace-nowrap font-medium">{s.name}</td>
                      <td className="whitespace-nowrap">
                        <span
                          className={`rounded-md px-2 py-0.5 text-xs font-medium ${TYPE_STYLE[s.type]}`}
                        >
                          {s.type}
                        </span>
                      </td>
                      <td className="text-muted-foreground">{s.note}</td>
                      <td className="whitespace-nowrap">
                        <UniversalLink
                          to={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          访问 <ArrowUpRight className="size-3.5" />
                        </UniversalLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 二、名词解释 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">2. 名词解释</h2>
          <div className="print-block grid gap-4 sm:grid-cols-2">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="rounded-lg border border-border bg-card p-5">
                <div className="mb-1.5 flex flex-wrap items-baseline gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{g.term}</h3>
                  <span className="text-xs text-muted-foreground">{g.en}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{g.definition}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 三、完整报告下载 */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">3. 完整报告下载</h2>
          <div className="print-block flex flex-col items-start gap-6 rounded-lg border border-primary/25 bg-secondary/50 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BookOpen className="size-6" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground md:text-lg">
                  {SURVEY_META.fullName}（{SURVEY_META.version}）
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  调研周期 {SURVEY_META.period}。点击下方按钮调用浏览器打印面板，
                  选择「另存为 PDF」即可获得排版完整的离线版报告；各图表数据可在对应板块单独下载
                  CSV。
                </p>
              </div>
            </div>
            <Button size="lg" className="shrink-0 gap-2 rounded-md" onClick={handleDownloadReport}>
              <Download className="size-4" />
              下载完整报告
              <Printer className="size-4 opacity-60" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
