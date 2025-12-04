import { useState } from "react"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Alert, AlertDescription } from "../components/ui/alert"
import { X, AlertCircle } from "lucide-react"

interface QueueItem {
  url: string
  isValid: boolean
  error?: string
}

function Downloads() {
  const [urlInput, setUrlInput] = useState("")
  const [queue, setQueue] = useState<QueueItem[]>([])

  const validateUrl = (url: string): { isValid: boolean; error?: string } => {
    // Basic URL validation
    try {
      const urlObj = new URL(url)
      
      // Check for Spotify or YouTube domains
      const validDomains = [
        'open.spotify.com',
        'spotify.com',
        'youtube.com',
        'youtu.be',
        'music.youtube.com'
      ]
      
      const isValidDomain = validDomains.some(domain => 
        urlObj.hostname.includes(domain)
      )
      
      if (!isValidDomain) {
        return { 
          isValid: false, 
          error: 'Only Spotify and YouTube URLs are supported' 
        }
      }
      
      return { isValid: true }
    } catch {
      return { 
        isValid: false, 
        error: 'Invalid URL format' 
      }
    }
  }

  const handleAddUrls = () => {
    if (!urlInput.trim()) return
    
    // Split by commas or newlines and filter out empty strings
    const urls = urlInput
      .split(/[,\n]/)
      .map(url => url.trim())
      .filter(url => url.length > 0)
    
    // Validate each URL and add to queue
    const newItems: QueueItem[] = urls.map(url => ({
      url,
      ...validateUrl(url)
    }))
    
    setQueue([...queue, ...newItems])
    setUrlInput("") // Clear the textarea
  }

  const handleRemoveItem = (index: number) => {
    setQueue(queue.filter((_, i) => i !== index))
  }

  const handleClearInvalid = () => {
    setQueue(queue.filter(item => item.isValid))
  }

  const handleDownload = () => {
    const validUrls = queue.filter(item => item.isValid).map(item => item.url)
    console.log("Downloading:", validUrls)
    // TODO: Call Wails backend function here
    setQueue([]) // Clear queue after starting download
  }

  const validCount = queue.filter(item => item.isValid).length
  const invalidCount = queue.filter(item => !item.isValid).length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Download Music</h2>
        <p className="text-gray-600">
          Paste Spotify or YouTube URLs below. Add multiple links separated by commas or line breaks.
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-3 bg-white p-6 rounded-lg shadow">
        <Textarea
          className="min-h-[120px]"
          placeholder="Paste URLs here (comma or newline separated)...&#10;Example: https://open.spotify.com/track/..."
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
      {queue.length > 0 && (
        <div className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Queue ({queue.length} {queue.length === 1 ? 'item' : 'items'})
              </h3>
              {validCount > 0 && (
                <Badge variant="default" className="bg-green-500">
                  {validCount} valid
                </Badge>
              )}
              {invalidCount > 0 && (
                <Badge variant="destructive">
                  {invalidCount} invalid
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              {invalidCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClearInvalid}
                >
                  Clear Invalid
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setQueue([])}
              >
                Clear All
              </Button>
            </div>
          </div>

          {invalidCount > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {invalidCount} invalid URL{invalidCount !== 1 ? 's' : ''} detected. Only valid URLs will be downloaded.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {queue.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between gap-3 p-3 rounded border transition-colors ${
                  item.isValid 
                    ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">
                    {item.url}
                  </p>
                  {!item.isValid && item.error && (
                    <p className="text-xs text-red-600 mt-1">
                      {item.error}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {item.isValid ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Valid
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      Invalid
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(index)}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleDownload}
            className="w-full"
            size="lg"
            disabled={validCount === 0}
          >
            Download {validCount} {validCount === 1 ? 'Song' : 'Songs'}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {queue.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">
            No songs in queue
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Add some URLs above to get started
          </p>
        </div>
      )}
    </div>
  )
}

export default Downloads
