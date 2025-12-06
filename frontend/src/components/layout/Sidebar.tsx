import { Link, useLocation } from 'react-router-dom'
import { Download, Library } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
}

function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation()

  const navItems = [
    { path: '/downloads', label: 'Downloads', icon: Download },
    { path: '/library', label: 'Library', icon: Library },
  ]

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-0'
      } border-r border-border bg-card transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0`}
    >
      <div className="flex flex-col h-full">
        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium whitespace-nowrap">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar