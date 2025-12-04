import { useState } from "react"
import { Search, LayoutGrid, List, Download, Trash2, FolderOpen } from "lucide-react"
import PageTransition from "@/components/layout/PageTransition"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Checkbox } from "../components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"


// Mock data - TODO: Replace with actual data from backend
interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  fileSize: string
  downloadDate: string
  source: "Spotify" | "YouTube"
  format: string
  genre?: string
}

const mockTracks: Track[] = [
  {
    id: "1",
    title: "Summer Breeze",
    artist: "The Artists",
    album: "Best Hits",
    duration: "3:45",
    fileSize: "5.2 MB",
    downloadDate: "2024-12-04",
    source: "Spotify",
    format: "MP3",
    genre: "Pop"
  },
  {
    id: "2",
    title: "Midnight Dreams",
    artist: "Luna Echo",
    album: "Night Sessions",
    duration: "4:12",
    fileSize: "6.1 MB",
    downloadDate: "2024-12-03",
    source: "YouTube",
    format: "MP3",
    genre: "Electronic"
  },
  {
    id: "3",
    title: "Electric Storm",
    artist: "Voltage",
    album: "High Energy",
    duration: "3:28",
    fileSize: "4.8 MB",
    downloadDate: "2024-12-02",
    source: "Spotify",
    format: "FLAC",
    genre: "Rock"
  },
]

function Library() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedTracks, setSelectedTracks] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<keyof Track | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter tracks based on search and filters
  const filteredTracks = mockTracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSource = selectedSources.length === 0 || selectedSources.includes(track.source)
    const matchesGenre = selectedGenres.length === 0 || (track.genre && selectedGenres.includes(track.genre))

    return matchesSearch && matchesSource && matchesGenre
  })

  // Sort tracks
  const sortedTracks = [...filteredTracks].sort((a, b) => {
    if (!sortColumn) return 0

    const aVal = a[sortColumn]
    const bVal = b[sortColumn]

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (column: keyof Track) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const toggleSelectAll = () => {
    if (selectedTracks.length === sortedTracks.length) {
      setSelectedTracks([])
    } else {
      setSelectedTracks(sortedTracks.map(t => t.id))
    }
  }

  const toggleSelectTrack = (id: string) => {
    setSelectedTracks(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const handleBulkDelete = () => {
    console.log("Deleting tracks:", selectedTracks)
    // TODO: Implement backend deletion
    setSelectedTracks([])
  }

  const handleBulkExport = () => {
    console.log("Exporting tracks:", selectedTracks)
    // TODO: Implement export functionality
  }

  return (
    <PageTransition>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-card-foreground">Library</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredTracks.length} {filteredTracks.length === 1 ? 'track' : 'tracks'} in your library
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("table")}
                className={viewMode === "table" ? "bg-muted" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-muted" : ""}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title, artist, or album..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              {/* Source Filter - TODO: Replace with proper multi-select component */}
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => {
                    setSelectedSources(prev =>
                      prev.includes("Spotify") ? prev.filter(s => s !== "Spotify") : [...prev, "Spotify"]
                    )
                  }}
                >
                  🎵 Spotify {selectedSources.includes("Spotify") && "✓"}
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => {
                    setSelectedSources(prev =>
                      prev.includes("YouTube") ? prev.filter(s => s !== "YouTube") : [...prev, "YouTube"]
                    )
                  }}
                >
                  📺 YouTube {selectedSources.includes("YouTube") && "✓"}
                </Badge>
              </div>

              {/* Genre Filter - TODO: Replace with proper multi-select component */}
              <div className="flex gap-2">
                {["Pop", "Rock", "Electronic"].map(genre => (
                  <Badge
                    key={genre}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => {
                      setSelectedGenres(prev =>
                        prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
                      )
                    }}
                  >
                    {genre} {selectedGenres.includes(genre) && "✓"}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTracks.length > 0 && (
          <div className="border-b border-border bg-muted/50 px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedTracks.length} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleBulkExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkDelete} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {sortedTracks.length === 0 ? (
            <EmptyState hasFilters={searchQuery !== "" || selectedSources.length > 0 || selectedGenres.length > 0} />
          ) : viewMode === "table" ? (
            <TableView
              tracks={sortedTracks}
              selectedTracks={selectedTracks}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              onSelectAll={toggleSelectAll}
              onSelectTrack={toggleSelectTrack}
            />
          ) : (
            <GridView tracks={sortedTracks} selectedTracks={selectedTracks} onSelectTrack={toggleSelectTrack} />
          )}
        </div>
      </div>
    </PageTransition>
  )
}

// Empty State Component
function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
        <Download className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">
        {hasFilters ? "No tracks found" : "Your library is empty"}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        {hasFilters
          ? "Try adjusting your search or filters"
          : "Start downloading music to build your library"}
      </p>
    </div>
  )
}

// Table View Component
function TableView({
  tracks,
  selectedTracks,
  sortColumn,
  sortDirection,
  onSort,
  onSelectAll,
  onSelectTrack,
}: {
  tracks: Track[]
  selectedTracks: string[]
  sortColumn: keyof Track | null
  sortDirection: "asc" | "desc"
  onSort: (column: keyof Track) => void
  onSelectAll: () => void
  onSelectTrack: (id: string) => void
}) {
  const SortIcon = ({ column }: { column: keyof Track }) => {
    if (sortColumn !== column) return null
    return <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
  }

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTracks.length === tracks.length}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort("title")}>
              Title <SortIcon column="title" />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort("artist")}>
              Artist <SortIcon column="artist" />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort("album")}>
              Album <SortIcon column="album" />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort("duration")}>
              Duration <SortIcon column="duration" />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort("fileSize")}>
              Size <SortIcon column="fileSize" />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort("downloadDate")}>
              Downloaded <SortIcon column="downloadDate" />
            </TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Format</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track) => (
            <TableRow key={track.id} className="border-border">
              <TableCell>
                <Checkbox
                  checked={selectedTracks.includes(track.id)}
                  onCheckedChange={() => onSelectTrack(track.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{track.title}</TableCell>
              <TableCell className="text-muted-foreground">{track.artist}</TableCell>
              <TableCell className="text-muted-foreground">{track.album}</TableCell>
              <TableCell className="text-muted-foreground">{track.duration}</TableCell>
              <TableCell className="text-muted-foreground">{track.fileSize}</TableCell>
              <TableCell className="text-muted-foreground">{track.downloadDate}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {track.source === "Spotify" ? "🎵" : "📺"} {track.source}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {track.format}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Grid View Component
function GridView({
  tracks,
  selectedTracks,
  onSelectTrack,
}: {
  tracks: Track[]
  selectedTracks: string[]
  onSelectTrack: (id: string) => void
}) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
          >
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <Checkbox
                    checked={selectedTracks.includes(track.id)}
                    onCheckedChange={() => onSelectTrack(track.id)}
                    className="bg-card"
                  />
                  <Badge variant="outline" className="text-xs">
                    {track.source === "Spotify" ? "🎵" : "📺"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Badge variant="secondary" className="text-xs">
                    {track.format}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-card-foreground line-clamp-1">{track.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{track.artist}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{track.duration}</span>
                <span>{track.fileSize}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Library
