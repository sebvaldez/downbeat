import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { Bell, Menu } from 'lucide-react'
import { Button } from '../ui/button'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true) // Default to open

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-3 rounded-lg hover:bg-muted transition-colors relative z-50"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <Menu className="w-6 h-6 text-muted-foreground" />
            </button>
            <h1 className="text-xl font-semibold text-card-foreground">Downbeat</h1>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
