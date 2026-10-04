import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CornerDownRight, SearchX, TrendingUp } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SEARCH_INDEX } from '@/data/search-index'

const HOT_KEYWORDS = ['市场规模', '幻觉率', 'Agent', '渗透率', '投融资']

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** 全站内容搜索浮层：实时匹配搜索索引，按板块分组展示结果 */
export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    if (!q) return []
    return SEARCH_INDEX.filter((item) =>
      [item.title, item.summary, item.pageLabel, ...item.keywords]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [keyword])

  const grouped = useMemo(() => {
    const map = new Map<string, typeof results>()
    results.forEach((r) => {
      const list = map.get(r.pageLabel) ?? []
      list.push(r)
      map.set(r.pageLabel, list)
    })
    return [...map.entries()]
  }, [results])

  const goToPage = (page: string) => {
    handleOpenChange(false)
    navigate(page)
  }

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next)
    if (!next) setKeyword('')
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="top-[12%] max-h-[72vh] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="space-y-2 border-b border-border px-5 pb-4 pt-5 text-left">
          <DialogTitle className="text-base font-semibold">全站搜索</DialogTitle>
          <DialogDescription className="sr-only">输入关键词查找报告内容</DialogDescription>
          <div className="relative">
            <Input
              autoFocus
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索：市场规模 / 幻觉率 / Agent / 政策…"
              className="h-10"
            />
          </div>
        </DialogHeader>

        <div className="max-h-[48vh] overflow-y-auto px-2 py-2">
          {!keyword.trim() && (
            <div className="space-y-2 px-3 py-2">
              <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <TrendingUp className="size-3.5" /> 热门搜索
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {HOT_KEYWORDS.map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => setKeyword(word)}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}

          {keyword.trim() && results.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-3 py-10 text-center">
              <SearchX className="size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">未找到相关内容，请更换关键词</p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {HOT_KEYWORDS.slice(0, 3).map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => setKeyword(word)}
                    className="rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}

          {grouped.map(([label, items]) => (
            <div key={label} className="space-y-1 px-3 py-2">
              <p className="px-1 text-xs font-semibold text-muted-foreground">{label}</p>
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToPage(item.page)}
                  className="flex w-full items-start gap-2.5 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-muted"
                >
                  <CornerDownRight className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.summary}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    查看
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
