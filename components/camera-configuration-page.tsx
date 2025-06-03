"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Camera,
  CameraOff,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  MapPin,
  Wifi,
  WifiOff,
  Monitor,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MoreHorizontal,
  Search,
  Download,
  Upload,
  Zap,
  Activity,
  Signal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample camera data
const cameras = [
  {
    id: "1",
    name: "Main Entrance",
    location: "Building A - Front Door",
    streamUrl: "rtsp://192.168.1.100:554/stream1",
    status: "active",
    isOnline: true,
    resolution: "1920x1080",
    fps: 30,
    lastSeen: "2024-01-15 14:30:25",
    eventsDetected: 1250,
    aiProcessing: true,
    description: "Primary entrance monitoring for facial recognition",
    installDate: "2023-06-01",
    model: "Hikvision DS-2CD2185FWD-I",
    ipAddress: "192.168.1.100",
    port: 554,
    username: "admin",
    protocol: "RTSP",
    quality: 95,
  },
  {
    id: "2",
    name: "Reception Area",
    location: "Building A - Lobby",
    streamUrl: "rtsp://192.168.1.101:554/stream1",
    status: "active",
    isOnline: true,
    resolution: "1920x1080",
    fps: 25,
    lastSeen: "2024-01-15 14:29:45",
    eventsDetected: 890,
    aiProcessing: true,
    description: "Reception desk monitoring and visitor tracking",
    installDate: "2023-06-15",
    model: "Dahua IPC-HFW4431R-Z",
    ipAddress: "192.168.1.101",
    port: 554,
    username: "admin",
    protocol: "RTSP",
    quality: 88,
  },
  {
    id: "3",
    name: "Emergency Exit",
    location: "Building A - Back Door",
    streamUrl: "rtsp://192.168.1.102:554/stream1",
    status: "inactive",
    isOnline: false,
    resolution: "1280x720",
    fps: 20,
    lastSeen: "2024-01-14 16:22:10",
    eventsDetected: 45,
    aiProcessing: false,
    description: "Emergency exit monitoring",
    installDate: "2023-07-01",
    model: "Axis M3046-V",
    ipAddress: "192.168.1.102",
    port: 554,
    username: "admin",
    protocol: "RTSP",
    quality: 0,
  },
  {
    id: "4",
    name: "Parking Entrance",
    location: "Parking Lot - Gate",
    streamUrl: "rtsp://192.168.1.103:554/stream1",
    status: "active",
    isOnline: true,
    resolution: "1920x1080",
    fps: 30,
    lastSeen: "2024-01-15 14:31:02",
    eventsDetected: 567,
    aiProcessing: true,
    description: "Vehicle and personnel access monitoring",
    installDate: "2023-08-15",
    model: "Hikvision DS-2CD2385FWD-I",
    ipAddress: "192.168.1.103",
    port: 554,
    username: "admin",
    protocol: "RTSP",
    quality: 92,
  },
]

const systemStats = {
  totalCameras: 4,
  activeCameras: 3,
  onlineCameras: 3,
  totalEvents: 2752,
  aiProcessingLoad: 75,
  networkBandwidth: 45.2,
  storageUsed: 2.8,
  storageTotal: 10,
}

interface CameraFormData {
  name: string
  location: string
  streamUrl: string
  description: string
  ipAddress: string
  port: string
  username: string
  password: string
  protocol: string
  resolution: string
  fps: string
  status: "active" | "inactive"
  aiProcessing: boolean
}

export default function CameraConfigurationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState<any>(null)
  const [showPreview, setShowPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<CameraFormData>({
    name: "",
    location: "",
    streamUrl: "",
    description: "",
    ipAddress: "",
    port: "554",
    username: "",
    password: "",
    protocol: "RTSP",
    resolution: "1920x1080",
    fps: "30",
    status: "active",
    aiProcessing: true,
  })

  const videoRef = useRef<HTMLVideoElement>(null)

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      streamUrl: "",
      description: "",
      ipAddress: "",
      port: "554",
      username: "",
      password: "",
      protocol: "RTSP",
      resolution: "1920x1080",
      fps: "30",
      status: "active",
      aiProcessing: true,
    })
  }

  const handleAddCamera = () => {
    setSelectedCamera(null)
    resetForm()
    setShowAddDialog(true)
  }

  const handleEditCamera = (camera: any) => {
    setSelectedCamera(camera)
    setFormData({
      name: camera.name,
      location: camera.location,
      streamUrl: camera.streamUrl,
      description: camera.description,
      ipAddress: camera.ipAddress,
      port: camera.port.toString(),
      username: camera.username,
      password: "••••••••",
      protocol: camera.protocol,
      resolution: camera.resolution,
      fps: camera.fps.toString(),
      status: camera.status,
      aiProcessing: camera.aiProcessing,
    })
    setShowEditDialog(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Camera data:", formData)
    setShowAddDialog(false)
    setShowEditDialog(false)
    resetForm()
    // Here you would save to the camera table
  }

  const handleTestConnection = () => {
    console.log("Testing connection to:", formData.streamUrl)
    // Here you would test the RTSP connection
  }

  const getStatusBadge = (status: string, isOnline: boolean) => {
    if (status === "active" && isOnline) {
      return (
        <Badge className="bg-gray-800 text-white dark:bg-gray-200 dark:text-black border-0">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      )
    } else if (status === "active" && !isOnline) {
      return (
        <Badge className="bg-gray-600 text-white dark:bg-gray-400 dark:text-black border-0">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Offline
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-gray-400 text-white dark:bg-gray-600 dark:text-white border-0">
          <XCircle className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      )
    }
  }

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return "text-gray-800 dark:text-gray-200"
    if (quality >= 70) return "text-gray-600 dark:text-gray-400"
    if (quality >= 50) return "text-gray-500 dark:text-gray-500"
    return "text-gray-400 dark:text-gray-600"
  }

  const filteredCameras = cameras.filter((camera) => {
    const matchesSearch =
      camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && camera.status === "active") ||
      (filterStatus === "inactive" && camera.status === "inactive") ||
      (filterStatus === "online" && camera.isOnline) ||
      (filterStatus === "offline" && !camera.isOnline)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Camera Configuration
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage and configure surveillance cameras for facial recognition system
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                <Download className="h-4 w-4 mr-2" />
                Export Config
              </Button>
              <Button
                onClick={handleAddCamera}
                className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Camera
              </Button>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Cameras</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{systemStats.totalCameras}</p>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Camera className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Cameras</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{systemStats.activeCameras}</p>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Events Detected</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{systemStats.totalEvents}</p>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Activity className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI Processing</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{systemStats.aiProcessingLoad}%</p>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Zap className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <div className="mt-2">
                <Progress value={systemStats.aiProcessingLoad} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* System Status Sidebar */}
          <div className="space-y-6">
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Monitor className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Network Bandwidth</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {systemStats.networkBandwidth} Mbps
                    </span>
                  </div>
                  <Progress value={(systemStats.networkBandwidth / 100) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Storage Used</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {systemStats.storageUsed} / {systemStats.storageTotal} GB
                    </span>
                  </div>
                  <Progress value={(systemStats.storageUsed / systemStats.storageTotal) * 100} className="h-2" />
                </div>

                <Separator className="bg-gray-200 dark:bg-gray-700" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">WebRTC Module</span>
                    <Badge className="bg-gray-800 text-white dark:bg-gray-200 dark:text-black border-0">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">AI Processing</span>
                    <Badge className="bg-gray-800 text-white dark:bg-gray-200 dark:text-black border-0">Running</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Event Detection</span>
                    <Badge className="bg-gray-800 text-white dark:bg-gray-200 dark:text-black border-0">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-gray-300 dark:border-gray-600">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart All Cameras
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-300 dark:border-gray-600">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-300 dark:border-gray-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-300 dark:border-gray-600">
                  <Activity className="h-4 w-4 mr-2" />
                  View Event Logs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters and Search */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search cameras by name or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-[180px] border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cameras</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Camera Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCameras.map((camera) => (
                <Card key={camera.id} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {camera.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4" />
                          {camera.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(camera.status, camera.isOnline)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setShowPreview(camera.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview Stream
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditCamera(camera)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Camera
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Advanced Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Camera
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Camera Preview */}
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      {camera.isOnline ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Live Stream</p>
                            <p className="text-xs text-gray-400">
                              {camera.resolution} @ {camera.fps}fps
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <CameraOff className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Camera Offline</p>
                          </div>
                        </div>
                      )}
                      {camera.isOnline && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-red-600 text-white border-0">
                            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                            LIVE
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Camera Details */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">IP Address:</span>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{camera.ipAddress}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Model:</span>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{camera.model}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Events Detected:</span>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{camera.eventsDetected}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Signal Quality:</span>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gray-800 dark:bg-gray-200 h-2 rounded-full"
                                style={{ width: `${camera.quality}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs font-medium ${getQualityColor(camera.quality)}`}>
                              {camera.quality}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Signal className="h-4 w-4" />
                          Last seen: {camera.lastSeen}
                        </div>
                        <div className="flex items-center gap-2">
                          {camera.aiProcessing && (
                            <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-0">
                              <Zap className="h-3 w-3 mr-1" />
                              AI Processing
                            </Badge>
                          )}
                          {camera.isOnline ? (
                            <Wifi className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          ) : (
                            <WifiOff className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCameras.length === 0 && (
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardContent className="text-center py-12">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No cameras found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No cameras match your current search and filter criteria.
                  </p>
                  <Button
                    onClick={handleAddCamera}
                    className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Camera
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Add/Edit Camera Dialog */}
        <Dialog
          open={showAddDialog || showEditDialog}
          onOpenChange={() => {
            setShowAddDialog(false)
            setShowEditDialog(false)
            resetForm()
          }}
        >
          <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">
                {selectedCamera ? "Edit Camera" : "Add New Camera"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Configure camera settings for facial recognition system integration
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="connection">Connection</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Camera Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Main Entrance"
                        className="border-gray-300 dark:border-gray-600"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Physical Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Building A - Front Door"
                        className="border-gray-300 dark:border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Primary entrance monitoring for facial recognition"
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger className="border-gray-300 dark:border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aiProcessing">AI Processing</Label>
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch
                          id="aiProcessing"
                          checked={formData.aiProcessing}
                          onCheckedChange={(checked) => setFormData({ ...formData, aiProcessing: checked })}
                        />
                        <Label htmlFor="aiProcessing" className="text-sm text-gray-600 dark:text-gray-400">
                          Enable facial recognition processing
                        </Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="connection" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="streamUrl">Stream URL *</Label>
                    <Input
                      id="streamUrl"
                      value={formData.streamUrl}
                      onChange={(e) => setFormData({ ...formData, streamUrl: e.target.value })}
                      placeholder="rtsp://192.168.1.100:554/stream1"
                      className="border-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ipAddress">IP Address *</Label>
                      <Input
                        id="ipAddress"
                        value={formData.ipAddress}
                        onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                        placeholder="192.168.1.100"
                        className="border-gray-300 dark:border-gray-600"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input
                        id="port"
                        value={formData.port}
                        onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                        placeholder="554"
                        className="border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="protocol">Protocol</Label>
                      <Select
                        value={formData.protocol}
                        onValueChange={(value) => setFormData({ ...formData, protocol: value })}
                      >
                        <SelectTrigger className="border-gray-300 dark:border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RTSP">RTSP</SelectItem>
                          <SelectItem value="HTTP">HTTP</SelectItem>
                          <SelectItem value="HTTPS">HTTPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="admin"
                        className="border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="border-gray-300 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleTestConnection}
                    className="border-gray-300 dark:border-gray-600"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resolution">Resolution</Label>
                      <Select
                        value={formData.resolution}
                        onValueChange={(value) => setFormData({ ...formData, resolution: value })}
                      >
                        <SelectTrigger className="border-gray-300 dark:border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                          <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                          <SelectItem value="640x480">640x480 (VGA)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fps">Frame Rate (FPS)</Label>
                      <Select value={formData.fps} onValueChange={(value) => setFormData({ ...formData, fps: value })}>
                        <SelectTrigger className="border-gray-300 dark:border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 FPS</SelectItem>
                          <SelectItem value="25">25 FPS</SelectItem>
                          <SelectItem value="20">20 FPS</SelectItem>
                          <SelectItem value="15">15 FPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddDialog(false)
                    setShowEditDialog(false)
                    resetForm()
                  }}
                  className="border-gray-300 dark:border-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                >
                  {selectedCamera ? "Update Camera" : "Add Camera"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Stream Preview Dialog */}
        <Dialog open={!!showPreview} onOpenChange={() => setShowPreview(null)}>
          <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">Camera Stream Preview</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Live stream from {cameras.find((c) => c.id === showPreview)?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-500 dark:text-gray-400">Live Stream Preview</p>
                  <p className="text-sm text-gray-400">WebRTC stream would be displayed here</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowPreview(null)}
                className="border-gray-300 dark:border-gray-600"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
