"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Search,
  Download,
  Upload,
  FileText,
  ImageIcon,
  Video,
  File,
  Folder,
  Grid3X3,
  List,
  Eye,
  Trash2,
  Share2,
  Star,
  StarOff,
  MoreHorizontal,
  Plus,
  SortAsc,
  SortDesc,
  HardDrive,
  Database,
  Archive,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

// Sample data
const folders = [
  {
    id: "1",
    name: "User Photos",
    type: "folder",
    itemCount: 1250,
    size: "2.4 GB",
    lastModified: "2024-01-15",
    description: "Profile photos for facial recognition",
    isStarred: true,
  },
  {
    id: "2",
    name: "Attendance Reports",
    type: "folder",
    itemCount: 45,
    size: "125 MB",
    lastModified: "2024-01-14",
    description: "Monthly and daily attendance reports",
    isStarred: false,
  },
  {
    id: "3",
    name: "System Backups",
    type: "folder",
    itemCount: 12,
    size: "8.7 GB",
    lastModified: "2024-01-13",
    description: "Database and configuration backups",
    isStarred: true,
  },
  {
    id: "4",
    name: "Training Data",
    type: "folder",
    itemCount: 500,
    size: "1.8 GB",
    lastModified: "2024-01-12",
    description: "ML model training datasets",
    isStarred: false,
  },
]

const files = [
  {
    id: "5",
    name: "attendance_report_january_2024.pdf",
    type: "pdf",
    size: "2.4 MB",
    lastModified: "2024-01-15",
    createdBy: "John Doe",
    tags: ["report", "january", "attendance"],
    isStarred: false,
    downloads: 23,
  },
  {
    id: "6",
    name: "user_database_backup.sql",
    type: "sql",
    size: "45.2 MB",
    lastModified: "2024-01-14",
    createdBy: "System",
    tags: ["backup", "database", "users"],
    isStarred: true,
    downloads: 5,
  },
  {
    id: "7",
    name: "facial_recognition_model_v2.h5",
    type: "model",
    size: "128.7 MB",
    lastModified: "2024-01-13",
    createdBy: "AI Team",
    tags: ["model", "ai", "recognition"],
    isStarred: true,
    downloads: 12,
  },
  {
    id: "8",
    name: "system_configuration.json",
    type: "json",
    size: "15.8 KB",
    lastModified: "2024-01-12",
    createdBy: "Admin",
    tags: ["config", "system", "settings"],
    isStarred: false,
    downloads: 8,
  },
  {
    id: "9",
    name: "employee_photos_batch_1.zip",
    type: "zip",
    size: "234.5 MB",
    lastModified: "2024-01-11",
    createdBy: "HR Team",
    tags: ["photos", "employees", "batch"],
    isStarred: false,
    downloads: 15,
  },
]

const recentActivity = [
  {
    id: "1",
    action: "uploaded",
    fileName: "attendance_report_january_2024.pdf",
    user: "John Doe",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    action: "downloaded",
    fileName: "facial_recognition_model_v2.h5",
    user: "Jane Smith",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    action: "created",
    fileName: "User Photos",
    user: "System",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    action: "shared",
    fileName: "system_configuration.json",
    user: "Admin",
    timestamp: "2 days ago",
  },
]

const storageStats = {
  used: 15.2,
  total: 50,
  breakdown: [
    { category: "User Photos", size: 8.4, color: "bg-gray-800" },
    { category: "Backups", size: 3.2, color: "bg-gray-600" },
    { category: "Reports", size: 2.1, color: "bg-gray-400" },
    { category: "Models", size: 1.5, color: "bg-gray-300" },
  ],
}

export default function DataLibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [currentPath, setCurrentPath] = useState(["Data Library"])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const allItems = [...folders, ...files]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return Folder
      case "pdf":
        return FileText
      case "image":
        return ImageIcon
      case "video":
        return Video
      case "sql":
      case "json":
        return Database
      case "zip":
        return Archive
      case "model":
        return Database
      default:
        return File
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "folder":
        return "text-blue-600 dark:text-blue-400"
      case "pdf":
        return "text-red-600 dark:text-red-400"
      case "image":
        return "text-green-600 dark:text-green-400"
      case "video":
        return "text-purple-600 dark:text-purple-400"
      case "sql":
      case "json":
        return "text-yellow-600 dark:text-yellow-400"
      case "zip":
        return "text-orange-600 dark:text-orange-400"
      case "model":
        return "text-indigo-600 dark:text-indigo-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const filteredItems = allItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || item.type === selectedCategory || (selectedCategory === "starred" && item.isStarred)
    return matchesSearch && matchesCategory
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    let aValue: any = a[sortBy as keyof typeof a]
    let bValue: any = b[sortBy as keyof typeof b]

    if (sortBy === "size") {
      aValue = Number.parseFloat(aValue.replace(/[^\d.]/g, ""))
      bValue = Number.parseFloat(bValue.replace(/[^\d.]/g, ""))
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadFiles(files)
    setShowUploadDialog(true)
  }

  const handleUploadSubmit = () => {
    console.log("Uploading files:", uploadFiles)
    setShowUploadDialog(false)
    setUploadFiles([])
    // Here you would handle the actual file upload
  }

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Data Library
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage and organize your files, reports, and data assets
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                <Plus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
            {currentPath.map((path, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-4 w-4" />}
                <span
                  className={
                    index === currentPath.length - 1
                      ? "font-medium"
                      : "cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
                  }
                >
                  {path}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Storage Usage */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <HardDrive className="h-5 w-5" />
                  Storage Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Used</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {storageStats.used} GB of {storageStats.total} GB
                    </span>
                  </div>
                  <Progress value={(storageStats.used / storageStats.total) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  {storageStats.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-gray-600 dark:text-gray-400">{item.category}</span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{item.size} GB</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Filters */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory("all")}
                >
                  <File className="h-4 w-4 mr-2" />
                  All Files
                </Button>
                <Button
                  variant={selectedCategory === "starred" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory("starred")}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Starred
                </Button>
                <Button
                  variant={selectedCategory === "folder" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory("folder")}
                >
                  <Folder className="h-4 w-4 mr-2" />
                  Folders
                </Button>
                <Button
                  variant={selectedCategory === "pdf" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory("pdf")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </Button>
                <Button
                  variant={selectedCategory === "image" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory("image")}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Images
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400 mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                        <span className="font-medium">{activity.fileName}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search files and folders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[140px] border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="lastModified">Date Modified</SelectItem>
                        <SelectItem value="size">Size</SelectItem>
                        <SelectItem value="type">Type</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                      className="border-gray-300 dark:border-gray-600"
                    >
                      {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    </Button>
                    <Separator orientation="vertical" className="h-8 bg-gray-300 dark:bg-gray-600" />
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className="border-gray-300 dark:border-gray-600"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className="border-gray-300 dark:border-gray-600"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedItems.length} item(s) selected
                    </span>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File Grid/List */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sortedItems.map((item) => {
                      const IconComponent = getFileIcon(item.type)
                      return (
                        <div
                          key={item.id}
                          className="group relative p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                        >
                          <div className="absolute top-2 left-2">
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onCheckedChange={() => toggleItemSelection(item.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Toggle star
                              }}
                            >
                              {item.isStarred ? (
                                <Star className="h-4 w-4 fill-current text-yellow-500" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <IconComponent className={`h-12 w-12 mb-3 ${getFileTypeColor(item.type)}`} />
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1 truncate w-full">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.size}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.lastModified}</p>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedItems.length === sortedItems.length}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedItems(sortedItems.map((item) => item.id))
                              } else {
                                setSelectedItems([])
                              }
                            }}
                          />
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">Name</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">Size</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">Modified</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">Created By</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">Tags</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedItems.map((item) => {
                        const IconComponent = getFileIcon(item.type)
                        return (
                          <TableRow
                            key={item.id}
                            className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() => toggleItemSelection(item.id)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <IconComponent className={`h-5 w-5 ${getFileTypeColor(item.type)}`} />
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                                  {item.type === "folder" && (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {(item as any).itemCount} items
                                    </div>
                                  )}
                                </div>
                                {item.isStarred && <Star className="h-4 w-4 fill-current text-yellow-500" />}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">{item.size}</TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">{item.lastModified}</TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">
                              {(item as any).createdBy || "-"}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {(item as any).tags?.slice(0, 2).map((tag: string, index: number) => (
                                  <Badge
                                    key={index}
                                    className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-0 text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                                {(item as any).tags?.length > 2 && (
                                  <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-0 text-xs">
                                    +{(item as any).tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                )}

                {sortedItems.length === 0 && (
                  <div className="text-center py-12">
                    <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No files found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">Upload Files</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Upload files to the current folder
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Selected Files</Label>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {uploadFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900 dark:text-gray-100">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description for these files..."
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (Optional)</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas"
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowUploadDialog(false)}
                className="border-gray-300 dark:border-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUploadSubmit}
                className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
