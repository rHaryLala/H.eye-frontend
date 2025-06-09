"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Camera, User, Search, Filter, Download, Eye, MapPin, CheckCircle, XCircle, AlertTriangle, BarChart3, TrendingUp, Users, Activity, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, FileSpreadsheet, Printer } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample attendance history data from presence table
const attendanceHistory = [
  {
    id: "1",
    userId: "user_001",
    userName: "Rasolonjatovo Andry",
    userRole: "Employee",
    date: "2024-01-15",
    time: "08:45:23",
    cameraId: "cam_001",
    cameraName: "Main Entrance",
    cameraLocation: "Building A - Front Door",
    status: "recognized",
    confidence: 98.5,
    eventType: "entry",
    duration: null,
    ipAddress: "192.168.1.100",
    sessionId: "sess_001_20240115",
  },
  {
    id: "2",
    userId: "user_002",
    userName: "Rakotovao Lanto",
    userRole: "Manager",
    date: "2024-01-15",
    time: "08:52:17",
    cameraId: "cam_002",
    cameraName: "Reception Area",
    cameraLocation: "Building A - Lobby",
    status: "recognized",
    confidence: 96.8,
    eventType: "entry",
    duration: null,
    ipAddress: "192.168.1.101",
    sessionId: "sess_002_20240115",
  },
  {
    id: "3",
    userId: "user_003",
    userName: "Ramanambintsoa Hery",
    userRole: "Employee",
    date: "2024-01-15",
    time: "09:15:42",
    cameraId: "cam_001",
    cameraName: "Main Entrance",
    cameraLocation: "Building A - Front Door",
    status: "recognized",
    confidence: 94.2,
    eventType: "entry",
    duration: null,
    ipAddress: "192.168.1.100",
    sessionId: "sess_003_20240115",
  },
  {
    id: "4",
    userId: "unknown",
    userName: "Olona tsy fantatra",
    userRole: "Visitor",
    date: "2024-01-15",
    time: "09:23:15",
    cameraId: "cam_001",
    cameraName: "Main Entrance",
    cameraLocation: "Building A - Front Door",
    status: "not_recognized",
    confidence: 45.3,
    eventType: "detection",
    duration: null,
    ipAddress: "192.168.1.100",
    sessionId: null,
  },
  {
    id: "5",
    userId: "user_001",
    userName: "Rasolonjatovo Andry",
    userRole: "Employee",
    date: "2024-01-15",
    time: "12:30:45",
    cameraId: "cam_003",
    cameraName: "Parking Entrance",
    cameraLocation: "Parking Lot - Gate",
    status: "recognized",
    confidence: 97.1,
    eventType: "exit",
    duration: "3h 45m",
    ipAddress: "192.168.1.103",
    sessionId: "sess_001_20240115",
  },
  {
    id: "6",
    userId: "user_004",
    userName: "Razanaparany Fara",
    userRole: "HR",
    date: "2024-01-15",
    time: "13:15:30",
    cameraId: "cam_002",
    cameraName: "Reception Area",
    cameraLocation: "Building A - Lobby",
    status: "recognized",
    confidence: 99.2,
    eventType: "entry",
    duration: null,
    ipAddress: "192.168.1.101",
    sessionId: "sess_004_20240115",
  },
  {
    id: "7",
    userId: "user_002",
    userName: "Rakotovao Lanto",
    userRole: "Manager",
    date: "2024-01-15",
    time: "17:45:12",
    cameraId: "cam_001",
    cameraName: "Main Entrance",
    cameraLocation: "Building A - Front Door",
    status: "recognized",
    confidence: 95.7,
    eventType: "exit",
    duration: "8h 53m",
    ipAddress: "192.168.1.100",
    sessionId: "sess_002_20240115",
  },
  {
    id: "8",
    userId: "unknown",
    userName: "Olona tsy fantatra",
    userRole: "Visitor",
    date: "2024-01-15",
    time: "18:20:33",
    cameraId: "cam_004",
    cameraName: "Emergency Exit",
    cameraLocation: "Building A - Back Door",
    status: "not_recognized",
    confidence: 38.9,
    eventType: "detection",
    duration: null,
    ipAddress: "192.168.1.102",
    sessionId: null,
  },
]

const dailyStats = {
  totalDetections: 156,
  recognizedUsers: 45,
  unknownDetections: 12,
  averageConfidence: 94.2,
  peakHour: "09:00 - 10:00",
  activeCameras: 4,
}

const recentActivity = [
  {
    id: "1",
    userName: "Rasolonjatovo Andry",
    action: "Entry",
    camera: "Main Entrance",
    time: "2 minutes ago",
    status: "recognized",
  },
  {
    id: "2",
    userName: "Unknown Person",
    action: "Detection",
    camera: "Reception Area",
    time: "5 minutes ago",
    status: "not_recognized",
  },
  {
    id: "3",
    userName: "Ravonison Lalaina",
    action: "Exit",
    camera: "Parking Entrance",
    time: "8 minutes ago",
    status: "recognized",
  },
  {
    id: "4",
    userName: "Rakotobe Mamy",
    action: "Entry",
    camera: "Main Entrance",
    time: "12 minutes ago",
    status: "recognized",
  },
  {
    id: "5",
    userName: "Raharimanana Fara",
    action: "Entry",
    camera: "Side Door",
    time: "15 minutes ago",
    status: "recognized",
  },
  {
    id: "6",
    userName: "Ratsimba Hery",
    action: "Exit",
    camera: "Back Gate",
    time: "18 minutes ago",
    status: "recognized",
  },
  {
    id: "7",
    userName: "Rakotomanga Vola",
    action: "Entry",
    camera: "Main Entrance",
    time: "22 minutes ago",
    status: "recognized",
  },
  {
    id: "8",
    userName: "Unknown Person",
    action: "Detection",
    camera: "Warehouse Area",
    time: "25 minutes ago",
    status: "not_recognized",
  },
  {
    id: "9",
    userName: "Randriamampionona Lova",
    action: "Exit",
    camera: "Parking Entrance",
    time: "30 minutes ago",
    status: "recognized",
  },
  {
    id: "10",
    userName: "Razanaparany Tahina",
    action: "Entry",
    camera: "Reception Area",
    time: "33 minutes ago",
    status: "recognized",
  },
]

export default function AttendanceHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCamera, setFilterCamera] = useState("all")
  const [filterEventType, setFilterEventType] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<string>("")
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Page load animation
  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  const getStatusBadge = (status: string, confidence: number) => {
    switch (status) {
      case "recognized":
        return (
          <Badge className="bg-gray-800 text-white dark:bg-gray-200 dark:text-black border-0 transition-all duration-300 hover:scale-105">
            <CheckCircle className="h-3 w-3 mr-1" />
            Recognized ({confidence.toFixed(1)}%)
          </Badge>
        )
      case "not_recognized":
        return (
          <Badge className="bg-gray-400 text-white dark:bg-gray-600 dark:text-white border-0 transition-all duration-300 hover:scale-105">
            <XCircle className="h-3 w-3 mr-1" />
            Not Recognized ({confidence.toFixed(1)}%)
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-0 transition-all duration-300 hover:scale-105">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  const getEventTypeBadge = (eventType: string) => {
    switch (eventType) {
      case "entry":
        return (
          <Badge className="bg-gray-600 text-white dark:bg-gray-400 dark:text-black border-0 transition-all duration-300 hover:scale-105">
            <TrendingUp className="h-3 w-3 mr-1" />
            Entry
          </Badge>
        )
      case "exit":
        return (
          <Badge className="bg-gray-500 text-white dark:bg-gray-500 dark:text-white border-0 transition-all duration-300 hover:scale-105">
            <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
            Exit
          </Badge>
        )
      case "detection":
        return (
          <Badge className="bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-0 transition-all duration-300 hover:scale-105">
            <Eye className="h-3 w-3 mr-1" />
            Detection
          </Badge>
        )
      default:
        return <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-0 transition-all duration-300 hover:scale-105">Unknown</Badge>
    }
  }

  const filteredHistory = attendanceHistory.filter((record) => {
    const matchesSearch =
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.cameraName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.cameraLocation.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    const matchesCamera = filterCamera === "all" || record.cameraId === filterCamera
    const matchesEventType = filterEventType === "all" || record.eventType === filterEventType

    return matchesSearch && matchesStatus && matchesCamera && matchesEventType
  })

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    console.log("Refreshing attendance history data...")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLastUpdated(new Date())
    setIsRefreshing(false)
    console.log("Data refreshed successfully")
  }

  const handleExport = async (format: string) => {
    setIsExporting(true)
    setExportFormat(format)
    console.log(`Exporting attendance history data as ${format}...`)
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Create and download file based on format
    const data = filteredHistory
    const timestamp = new Date().toISOString().split('T')[0]
    
    switch (format) {
      case 'csv':
        exportToCSV(data, `attendance-history-${timestamp}.csv`)
        break
      case 'excel':
        exportToExcel(data, `attendance-history-${timestamp}.xlsx`)
        break
      case 'pdf':
        exportToPDF(data, `attendance-history-${timestamp}.pdf`)
        break
    }
    
    setIsExporting(false)
    setExportFormat("")
    console.log(`${format.toUpperCase()} export completed successfully`)
  }

  const exportToCSV = (data: any[], filename: string) => {
    const headers = ['User Name', 'Role', 'Date', 'Time', 'Camera', 'Location', 'Status', 'Confidence', 'Event Type', 'Duration']
    const csvContent = [
      headers.join(','),
      ...data.map(record => [
        `"${record.userName}"`,
        `"${record.userRole}"`,
        record.date,
        record.time,
        `"${record.cameraName}"`,
        `"${record.cameraLocation}"`,
        record.status,
        record.confidence,
        record.eventType,
        record.duration || ''
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  const exportToExcel = (data: any[], filename: string) => {
    // Simulate Excel export
    console.log('Excel export would be implemented with a library like xlsx')
    // In a real implementation, you would use a library like 'xlsx' or 'exceljs'
  }

  const exportToPDF = (data: any[], filename: string) => {
    // Simulate PDF export
    console.log('PDF export would be implemented with a library like jsPDF')
    // In a real implementation, you would use a library like 'jsPDF' or 'pdfmake'
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    delay = 0,
  }: { title: string; value: string | number; icon: any; delay?: number }) => (
    <Card
      className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-1000 ease-out hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 hover:scale-105 ${
        isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-all duration-300">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-all duration-300">{value}</p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-12">
            <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Header */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Attendance History
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 transition-all duration-500 delay-200">
                Complete record of facial recognition detections and user presence tracking
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 transition-transform duration-300 hover:rotate-180" />
                    Refresh
                  </>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-black dark:border-t-transparent"></div>
                        Exporting {exportFormat.toUpperCase()}...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                        Export Data
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="animate-in slide-in-from-top-2 duration-200">
                  <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleExport('csv')}
                    className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport('excel')}
                    className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport('pdf')}
                    className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Daily Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Detections" value={dailyStats.totalDetections} icon={Activity} delay={300} />
          <StatCard title="Recognized Users" value={dailyStats.recognizedUsers} icon={Users} delay={400} />
          <StatCard title="Unknown Detections" value={dailyStats.unknownDetections} icon={AlertTriangle} delay={500} />
          <StatCard title="Avg. Confidence" value={`${dailyStats.averageConfidence}%`} icon={BarChart3} delay={600} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div
            className={`space-y-6 transition-all duration-1000 ease-out delay-700 ${
              isPageLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Recent Activity */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Clock className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg animate-in slide-in-from-bottom-2`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 transition-all duration-300"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-gray-100 transition-all duration-300">
                        <span className="font-medium">{activity.userName}</span> - {activity.action}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{activity.camera}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {activity.status === "recognized" ? (
                        <CheckCircle className="h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 hover:scale-110" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-400 transition-transform duration-300 hover:scale-110" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Peak Hour</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{dailyStats.peakHour}</span>
                  </div>
                  <div className="flex justify-between text-sm transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Active Cameras</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{dailyStats.activeCameras}</span>
                  </div>
                  <div className="flex justify-between text-sm transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Recognition Rate</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {((dailyStats.recognizedUsers / dailyStats.totalDetections) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div
            className={`lg:col-span-3 space-y-6 transition-all duration-1000 ease-out delay-900 ${
              isPageLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Filters */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50">
              <CardContent className="p-6">
                <Tabs defaultValue="filters" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 transition-all duration-300">
                    <TabsTrigger value="filters" className="transition-all duration-300">Filters</TabsTrigger>
                    <TabsTrigger value="date" className="transition-all duration-300">Date Range</TabsTrigger>
                  </TabsList>

                  <TabsContent value="filters" className="space-y-4 mt-4 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="search">Search</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-all duration-300" />
                          <Input
                            id="search"
                            placeholder="Search users, cameras..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 border-gray-300 dark:border-gray-600 transition-all duration-300 focus:scale-105 focus:shadow-md"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Recognition Status</Label>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md">
                            <SelectValue placeholder="All Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="recognized">Recognized</SelectItem>
                            <SelectItem value="not_recognized">Not Recognized</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="camera">Camera</Label>
                        <Select value={filterCamera} onValueChange={setFilterCamera}>
                          <SelectTrigger className="border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md">
                            <SelectValue placeholder="All Cameras" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Cameras</SelectItem>
                            <SelectItem value="cam_001">Main Entrance</SelectItem>
                            <SelectItem value="cam_002">Reception Area</SelectItem>
                            <SelectItem value="cam_003">Parking Entrance</SelectItem>
                            <SelectItem value="cam_004">Emergency Exit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select value={filterEventType} onValueChange={setFilterEventType}>
                          <SelectTrigger className="border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md">
                            <SelectValue placeholder="All Events" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="entry">Entry</SelectItem>
                            <SelectItem value="exit">Exit</SelectItem>
                            <SelectItem value="detection">Detection</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="date" className="space-y-4 mt-4 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-4">
                      <div className="space-y-2">
                        <Label>Date Range</Label>
                        <Input
                          type="date"
                          className="border-gray-300 dark:border-gray-600 transition-all duration-300 focus:scale-105 focus:shadow-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>To</Label>
                        <Input
                          type="date"
                          className="border-gray-300 dark:border-gray-600 transition-all duration-300 focus:scale-105 focus:shadow-md"
                        />
                      </div>
                      <Button variant="outline" className="mt-6 border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md">
                        <Filter className="h-4 w-4 mr-2" />
                        Apply Filter
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Attendance History Table */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 dark:text-gray-100">Attendance Records</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredHistory.length)} of{" "}
                      {filteredHistory.length} records
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50 dark:bg-gray-800">
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">User</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Date & Time</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Camera</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Status</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Event Type</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Duration</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedHistory.map((record, index) => (
                        <TableRow
                          key={record.id}
                          className={`border-gray-200 dark:border-gray-700 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-[1.01] hover:shadow-md animate-in slide-in-from-bottom-2`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100 transition-all duration-300">{record.userName}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{record.userRole}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 hover:scale-110" />
                              <div>
                                <div className="text-gray-900 dark:text-gray-100">{record.date}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{record.time}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Camera className="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 hover:scale-110" />
                              <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">{record.cameraName}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {record.cameraLocation}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(record.status, record.confidence)}</TableCell>
                          <TableCell>{getEventTypeBadge(record.eventType)}</TableCell>
                          <TableCell>
                            <div className="text-gray-900 dark:text-gray-100">
                              {record.duration || <span className="text-gray-400 dark:text-gray-500">-</span>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedRecord(record)}
                                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 hover:scale-110"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 max-w-2xl animate-in zoom-in-95 duration-300">
                                <DialogHeader>
                                  <DialogTitle className="text-gray-900 dark:text-gray-100">
                                    Attendance Record Details
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                                    Complete information from the presence table
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedRecord && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          User Information
                                        </Label>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                          <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {selectedRecord.userName}
                                          </p>
                                          <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {selectedRecord.userRole}
                                          </p>
                                          <p className="text-xs text-gray-500 dark:text-gray-500">
                                            ID: {selectedRecord.userId}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          Detection Details
                                        </Label>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                          <p className="text-sm text-gray-900 dark:text-gray-100">
                                            Confidence: {selectedRecord.confidence.toFixed(1)}%
                                          </p>
                                          <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Event: {selectedRecord.eventType}
                                          </p>
                                          <p className="text-xs text-gray-500 dark:text-gray-500">
                                            Session: {selectedRecord.sessionId || "N/A"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          Camera Information
                                        </Label>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                          <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {selectedRecord.cameraName}
                                          </p>
                                          <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {selectedRecord.cameraLocation}
                                          </p>
                                          <p className="text-xs text-gray-500 dark:text-gray-500">
                                            IP: {selectedRecord.ipAddress}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          Timestamp
                                        </Label>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                          <p className="text-sm text-gray-900 dark:text-gray-100">
                                            {selectedRecord.date}
                                          </p>
                                          <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {selectedRecord.time}
                                          </p>
                                          {selectedRecord.duration && (
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                              Duration: {selectedRecord.duration}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="itemsPerPage" className="text-sm text-gray-600 dark:text-gray-400">
                      Items per page:
                    </Label>
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={(value) => {
                        setItemsPerPage(Number(value))
                        setCurrentPage(1)
                      }}
                    >
                      <SelectTrigger className="w-20 border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-600 dark:text-gray-400 px-4">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-from-bottom-2 {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-from-top-2 {
          0% {
            opacity: 0;
            transform: translateY(-8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoom-in-95 {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .animate-slide-in-from-bottom-2 {
          animation: slide-in-from-bottom-2 0.3s ease-out;
        }

        .animate-slide-in-from-top-2 {
          animation: slide-in-from-top-2 0.3s ease-out;
        }

        .animate-zoom-in-95 {
          animation: zoom-in-95 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}