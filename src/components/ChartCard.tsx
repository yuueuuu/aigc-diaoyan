import type { ReactNode } from 'react'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { downloadCsv } from '@/lib/download'

interface ChartCardProps {
  /** 图表标题 */
  title: string
  /** 图表说明（含统计口径） */
  description?: string
  /** 下载文件名（不含扩展名） */
  csvFilename: string
  /** CSV 数据（首行为表头） */
  csvRows: (string | number)[][]
  children: ReactNode
}

/** 图表容器：统一卡片外观 + 数据下载（CSV）入口 */
export default function ChartCard({
  title,
  description,
  csvFilename,
  csvRows,
  children,
}: ChartCardProps) {
  const handleDownload = () => {
    downloadCsv(csvFilename, csvRows)
    toast.success('数据已下载（CSV 格式，可直接用 Excel 打开）')
  }

  return (
    <Card className="print-block">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="min-w-0 space-y-1.5">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && <CardDescription className="leading-relaxed">{description}</CardDescription>}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 gap-1.5"
          onClick={handleDownload}
        >
          <Download className="size-3.5" />
          下载数据
        </Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
