import PageTransition from "@/components/layout/PageTransition"
import { Card } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

function Settings() {
  // TODO: Load actual settings from backend
  // TODO: Save settings to backend

  return (
    <PageTransition>
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-6">
        <div>
          <h2 className="text-2xl font-semibold text-card-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure your integrations and download preferences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Integrations Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Integrations</h3>

            {/* Spotify Integration Card */}
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <span className="text-xl">🎵</span>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-foreground">Spotify</h4>
                        <p className="text-sm text-muted-foreground">
                          Download songs and playlists from Spotify
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      Not configured
                    </Badge>
                    <Switch disabled />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Configure this integration in the setup wizard
                  </p>
                </div>
              </div>
            </Card>

            {/* YouTube Integration Card */}
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                        <span className="text-xl">📺</span>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-foreground">YouTube</h4>
                        <p className="text-sm text-muted-foreground">
                          Download audio from YouTube videos
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      Not configured
                    </Badge>
                    <Switch disabled />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Configure this integration in the setup wizard
                  </p>
                </div>
              </div>
            </Card>

            {/* Apple Music - Future */}
            <Card className="p-6 bg-card border-border opacity-50">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <span className="text-xl">🍎</span>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-foreground">Apple Music</h4>
                        <p className="text-sm text-muted-foreground">
                          Coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      Coming soon
                    </Badge>
                    <Switch disabled />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Download Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Download Preferences</h3>

            <Card className="p-6 bg-card border-border">
              <div className="space-y-6">
                {/* Download Location */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="download-location" className="text-sm font-medium text-foreground">
                      Download Location
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Choose where downloaded music will be saved
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      id="download-location"
                      type="text"
                      className="flex-1 px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground/50"
                      placeholder="~/Music/Downbeat"
                      disabled
                    />
                    <Button variant="outline" disabled>
                      Browse
                    </Button>
                  </div>
                </div>

                {/* Audio Format */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="audio-format" className="text-sm font-medium text-foreground">
                      Default Audio Format
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Audio quality and format for downloads
                    </p>
                  </div>
                  <select
                    id="audio-format"
                    className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground"
                    disabled
                  >
                    <option>MP3 (320kbps)</option>
                    <option>MP3 (256kbps)</option>
                    <option>MP3 (192kbps)</option>
                    <option>FLAC</option>
                    <option>AAC</option>
                  </select>
                </div>

                {/* Auto-organize */}
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-1">
                    <Label htmlFor="auto-organize" className="text-sm font-medium text-foreground">
                      Auto-organize by Artist
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically create folders for each artist
                    </p>
                  </div>
                  <Switch id="auto-organize" disabled />
                </div>
              </div>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pb-6">
            <Button size="lg" disabled>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}

export default Settings
