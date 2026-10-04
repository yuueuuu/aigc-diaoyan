export interface INavItem {
  path: string
  label: string
}

/** 全站一级导航配置（Header / Sheet 移动菜单 / Footer 共用） */
export const NAV_ITEMS: INavItem[] = [
  { path: '/', label: '首页' },
  { path: '/tech', label: '技术调研' },
  { path: '/industry', label: '产业调研' },
  { path: '/applications', label: '应用调研' },
  { path: '/trends', label: '趋势板块' },
  { path: '/appendix', label: '附录' },
]
