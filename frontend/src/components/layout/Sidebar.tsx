import { Link, useLocation } from 'react-router-dom'
import { Home, Settings, Library as LibraryIcon, FolderOpen, BarChart3, Music } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

interface SidebarProps {
  isOpen: boolean
}

const navigation = [
  { path: '/downloads', label: 'Downloads', icon: Home },
  { path: '/library', label: 'Library', icon: LibraryIcon },
  { path: '/settings', label: 'Settings', icon: Settings },
  // TODO: Uncomment these when ready
  // { path: '/explorer', label: 'Folder Explorer', icon: FolderOpen },
  // { path: '/analytics', label: 'Analytics', icon: BarChart3 },
]

function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 border-r-0"
      )}
    >
      <div className={cn(
        "flex flex-col h-full transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6 flex-shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Music className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-card-foreground whitespace-nowrap">Downbeat</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-hidden">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-muted-foreground hover:bg-muted hover:text-foreground",
                    isActive && "bg-muted text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4 flex-shrink-0 space-y-3">
          {/* User */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
              <span className="text-xs font-medium text-primary">GU</span>
            </div>
            <div className="flex flex-col text-sm overflow-hidden">
              <span className="font-medium text-card-foreground whitespace-nowrap">Guest User</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">Sign in to sync</span>
            </div>
          </div>

          {/* Version */}
          <div className="px-3">
            <p className="text-xs text-muted-foreground text-center">
              Downbeat v0.1.0
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
