import { Card } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { Button } from "../components/ui/button"

function Settings() {
  // TODO: Load actual settings from backend
  // TODO: Save settings to backend

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">
          Configure your integrations and download preferences
        </p>
      </div>

      {/* Integrations Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Integrations</h3>
        
        {/* Spotify Integration Card */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎵</span>
                  <h4 className="text-lg font-semibold">Spotify</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Download songs and playlists from Spotify
                </p>
              </div>
              <Switch disabled />
            </div>
            
            {/* TODO: Add credential inputs when implementing OAuth */}
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">
                Configure this integration in the setup wizard
              </p>
            </div>
          </div>
        </Card>

        {/* YouTube Integration Card */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📺</span>
                  <h4 className="text-lg font-semibold">YouTube</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Download audio from YouTube videos
                </p>
              </div>
              <Switch disabled />
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">
                Configure this integration in the setup wizard
              </p>
            </div>
          </div>
        </Card>

        {/* Apple Music - Future */}
        <Card className="p-6 opacity-50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍎</span>
                  <h4 className="text-lg font-semibold">Apple Music</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Coming soon
                </p>
              </div>
              <Switch disabled />
            </div>
          </div>
        </Card>
      </div>

      {/* Download Preferences Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Download Preferences</h3>
        
        <Card className="p-6">
          <div className="space-y-6">
            {/* Download Location */}
            <div className="space-y-2">
              <Label htmlFor="download-location">Download Location</Label>
              <div className="flex gap-2">
                <input
                  id="download-location"
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="~/Music/Downbeat"
                  disabled
                />
                <Button variant="outline" disabled>
                  Browse
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Choose where downloaded music will be saved
              </p>
            </div>

            {/* Audio Format */}
            <div className="space-y-2">
              <Label htmlFor="audio-format">Default Audio Format</Label>
              <select
                id="audio-format"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                disabled
              >
                <option>MP3 (320kbps)</option>
                <option>MP3 (256kbps)</option>
                <option>MP3 (192kbps)</option>
                <option>FLAC</option>
                <option>AAC</option>
              </select>
              <p className="text-xs text-gray-500">
                Audio quality and format for downloads
              </p>
            </div>

            {/* Auto-organize */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-organize">Auto-organize by Artist</Label>
                <p className="text-xs text-gray-500">
                  Automatically create folders for each artist
                </p>
              </div>
              <Switch id="auto-organize" disabled />
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" disabled>
          Save Settings
        </Button>
      </div>
    </div>
  )
}

export default Settings
