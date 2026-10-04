interface PageHeaderProps {
  /** 板块编号，如 01 */
  index: string
  /** 顶部小标签 */
  eyebrow: string
  /** 页面主标题 */
  title: string
  /** 副标题说明 */
  description: string
}

/** 内页统一页头：编号 + 小标签 + 大标题 + 说明 */
export default function PageHeader({ index, eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold tabular-nums text-primary">{index}</span>
        <span className="h-px w-8 bg-primary/40" />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </span>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
      <p className="max-w-3xl leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
