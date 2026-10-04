import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FileText, Menu, Printer, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import SearchDialog from '@/components/SearchDialog'
import { NAV_ITEMS } from '@/lib/navigation'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleExportPdf = () => {
    window.print()
  }

  return (
    <header className="no-print sticky top-0 z-50 w-full border-b border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <NavLink to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10">
            <FileText className="size-5" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold md:text-base">
              2025-2026 AIGC调研
            </span>
            <span className="hidden text-[11px] text-white/60 sm:block">
              前沿调研白皮书 · 数据可溯源
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-1.5 rounded-md text-white/80 hover:bg-white/10 hover:text-white"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">全站搜索</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 rounded-md border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            onClick={handleExportPdf}
          >
            <Printer className="size-4" />
            <span className="hidden sm:inline">导出 PDF</span>
          </Button>

          {/* 移动端菜单 */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-md text-white/80 hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="打开导航菜单"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>2025-2026 AIGC调研</SheetTitle>
                <SheetDescription>前沿调研白皮书导航</SheetDescription>
              </SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-4">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
