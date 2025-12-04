import { useState } from "react"
import PageTransition from "@/components/layout/PageTransition"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Alert, AlertDescription } from "../components/ui/alert"
import { X, AlertCircle, Music } from "lucide-react"

interface QueueItem {
  url: string
  isValid: boolean
  error?: string
}

function Downloads() {
  const [urlInput, setUrlInput] = useState("")
  const [queue, setQueue] = useState<QueueItem[]>([])

  const validateUrl = (url: string): { isValid: boolean; error?: string } => {
    try {
      const urlObj = new URL(url)

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

    const urls = urlInput
      .split(/[,\n]/)
      .map(url => url.trim())
      .filter(url => url.length > 0)

    const newItems: QueueItem[] = urls.map(url => ({
      url,
      ...validateUrl(url)
    }))

    setQueue([...queue, ...newItems])
    setUrlInput("")
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
    setQueue([])
  }

  const validCount = queue.filter(item => item.isValid).length
  const invalidCount = queue.filter(item => !item.isValid).length

  return (
    <PageTransition>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-card-foreground">Download Queue</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add Spotify or YouTube URLs to download
              </p>
            </div>
            {queue.length > 0 && (
              <div className="flex items-center gap-2">
                {validCount > 0 && (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    {validCount} valid
                  </Badge>
                )}
                {invalidCount > 0 && (
                  <Badge variant="destructive">
                    {invalidCount} invalid
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Input Section */}
              <div className="space-y-3">
                <Textarea
                  className="min-h-[120px] bg-card border-border resize-none placeholder:text-muted-foreground/30"
                  placeholder="Paste URLs here (comma or newline separated)...&#10;&#10;Example:&#10;https://open.spotify.com/track/...&#10;https://youtube.com/watch?v=..."
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {queue.length} {queue.length === 1 ? 'item' : 'items'} in queue
                  </h3>
                  <div className="flex gap-2">
                    {invalidCount > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearInvalid}
                        className="text-xs"
                      >
                        Clear Invalid
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQueue([])}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>

                {invalidCount > 0 && (
                  <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {invalidCount} invalid URL{invalidCount !== 1 ? 's' : ''} detected. Only valid URLs will be downloaded.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  {queue.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                        item.isValid
                          ? 'bg-card border-border hover:border-muted-foreground/20'
                          : 'bg-destructive/5 border-destructive/20'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate font-mono">
                          {item.url}
                        </p>
                        {!item.isValid && item.error && (
                          <p className="text-xs text-destructive mt-1">
                            {item.error}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isValid ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/10 text-xs">
                            Valid
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/10 text-xs">
                            Invalid
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(index)}
                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleDownload}
                  className="w-full h-12 text-base"
                  disabled={validCount === 0}
                >
                  Download {validCount} {validCount === 1 ? 'Song' : 'Songs'}
                </Button>
              </div>
            )}

            {/* Empty State */}
            {queue.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <Music className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  No songs in queue
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add some URLs above to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Downloads
