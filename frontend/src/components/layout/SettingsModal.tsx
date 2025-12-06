import { useState } from 'react'
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Music, Youtube, Settings as SettingsIcon, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type SettingsSection = 'general' | 'integrations' | 'about'

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>('general')

  const sections = [
    { id: 'general' as const, label: 'General', icon: SettingsIcon },
    { id: 'integrations' as const, label: 'Integrations', icon: Music },
    { id: 'about' as const, label: 'About', icon: Info },
  ]

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-transparent" />

        <DialogPrimitive.Content
          style={{ backgroundColor: 'hsl(240 8% 16%)' }}
          className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-5xl h-[85vh] border rounded-lg shadow-lg"
        >
          <div className="flex h-full">
            {/* Left Sidebar */}
            <div className="w-64 border-r bg-muted/30 flex flex-col flex-shrink-0 rounded-l-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold">Settings</h2>
              </div>

              <nav className="flex-1 px-3">
                <ul className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon
                    return (
                      <li key={section.id}>
                        <button
                          onClick={() => setActiveSection(section.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                            activeSection === section.id
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {section.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto rounded-r-lg" style={{ backgroundColor: 'hsl(240 8% 16%)' }}>
              <div className="p-6">
                {activeSection === 'general' && <GeneralSettings />}
                {activeSection === 'integrations' && <IntegrationsSettings />}
                {activeSection === 'about' && <AboutSettings />}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100">
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function GeneralSettings() {
  const [concurrentDownloads, setConcurrentDownloads] = useState([3])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">General</h2>
        <p className="text-sm text-muted-foreground">
          Manage your general application preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Download Settings</CardTitle>
          <CardDescription>Configure how downloads are handled</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-download">Auto-start downloads</Label>
              <p className="text-xs text-muted-foreground">
                Automatically start downloads when added to queue
              </p>
            </div>
            <Switch id="auto-download" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Desktop notifications</Label>
              <p className="text-xs text-muted-foreground">
                Show notifications when downloads complete
              </p>
            </div>
            <Switch id="notifications" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="concurrent-downloads">Concurrent downloads</Label>
              <span className="text-sm font-medium">{concurrentDownloads[0]}</span>
            </div>
            <Slider
              id="concurrent-downloads"
              min={1}
              max={10}
              step={1}
              value={concurrentDownloads}
              onValueChange={setConcurrentDownloads}
            />
            <p className="text-xs text-muted-foreground">
              Number of simultaneous downloads (1-10)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="download-path">Download Location</Label>
            <div className="flex gap-2">
              <Input
                id="download-path"
                placeholder="/Users/username/Music"
                className="flex-1"
              />
              <Button variant="outline">Browse</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Audio Quality</CardTitle>
          <CardDescription>Set default quality for downloads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Default Quality</Label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>320kbps (Highest)</option>
              <option>256kbps (High)</option>
              <option>192kbps (Medium)</option>
              <option>128kbps (Low)</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function IntegrationsSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Integrations</h2>
        <p className="text-sm text-muted-foreground">
          Connect your music streaming services
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">Spotify</CardTitle>
                <CardDescription>Download from Spotify playlists and tracks</CardDescription>
              </div>
            </div>
            <Switch />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="spotify-client-id">Client ID</Label>
            <Input id="spotify-client-id" placeholder="Enter Spotify Client ID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spotify-client-secret">Client Secret</Label>
            <Input
              id="spotify-client-secret"
              type="password"
              placeholder="Enter Spotify Client Secret"
            />
          </div>
          <div className="flex gap-2">
            <Button>Connect Spotify</Button>
            <Button variant="outline">Test Connection</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                <Youtube className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">YouTube Music</CardTitle>
                <CardDescription>Download from YouTube Music</CardDescription>
              </div>
            </div>
            <Switch />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            YouTube Music integration coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function AboutSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">About</h2>
        <p className="text-sm text-muted-foreground">
          Information about Downbeat
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <Music className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Downbeat</h3>
              <p className="text-sm text-muted-foreground">Version 0.1.0</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium mb-1">Desktop platform version</p>
              <p className="text-muted-foreground">0.1.0</p>
            </div>

            <div>
              <p className="font-medium mb-1">Architecture</p>
              <p className="text-muted-foreground">arm64</p>
            </div>

            <div>
              <p className="font-medium mb-1">OS platform</p>
              <p className="text-muted-foreground">macOS</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t space-y-2">
            <Button variant="link" className="h-auto p-0 text-sm">
              Website →
            </Button>
            <br />
            <Button variant="link" className="h-auto p-0 text-sm">
              Report an issue →
            </Button>
            <br />
            <Button variant="link" className="h-auto p-0 text-sm">
              Privacy →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
