import { useState } from "react"
import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"
import { X } from "lucide-react" // You might need to install lucide-react: pnpm add lucide-react

function App() {
  const [urlInput, setUrlInput] = useState("")
  const [urlList, setUrlList] = useState<string[]>([])

  const handleAddUrls = () => {
    if (!urlInput.trim()) return
    
    // Split by commas or newlines and filter out empty strings
    const newUrls = urlInput
      .split(/[,\n]/)
      .map(url => url.trim())
      .filter(url => url.length > 0)
    
    setUrlList([...urlList, ...newUrls])
    setUrlInput("") // Clear the textarea
  }

  const handleRemoveUrl = (index: number) => {
    setUrlList(urlList.filter((_, i) => i !== index))
  }

  const handleDownload = () => {
    console.log("Downloading:", urlList)
    // TODO: Call your Wails backend function here
    // For example: DownloadSongs(urlList)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Downbeat</h1>
          <p className="text-gray-600">
            Paste Spotify song or playlist URLs below. Add multiple links separated by commas or line breaks.
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-3 bg-white p-6 rounded-lg shadow">
          <Textarea
            className="min-h-[120px]"
            placeholder="Paste Spotify URLs here (comma or newline separated)...&#10;Example: https://open.spotify.com/track/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <Button 
            onClick={handleAddUrls} 
            className="w-full"
            disabled={!urlInput.trim()}
          >
            Add to Queue
          </Button>
        </div>

        {/* Queue Section */}
        {urlList.length > 0 && (
          <div className="space-y-3 bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Queue ({urlList.length} {urlList.length === 1 ? 'item' : 'items'})
              </h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setUrlList([])}
              >
                Clear All
              </Button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {urlList.map((url, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-gray-700 truncate flex-1">
                    {url}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveUrl(index)}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleDownload}
              className="w-full"
              size="lg"
            >
              Download {urlList.length} {urlList.length === 1 ? 'Song' : 'Songs'}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {urlList.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">
              No songs in queue. Add some URLs above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
