"use client"

import { useState, useRef, useEffect } from "react"
import {
  Camera,
  CameraOff,
  CheckCircle,
  Clock,
  User,
  MapPin,
  Wifi,
  WifiOff,
  RefreshCw,
  Download,
  Search,
  UserCheck,
  UserX,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

// Sample attendance data
const attendanceRecords = [
  {
    id: "1",
    name: "Hary Lala Rabenamana",
    checkIn: "09:15 AM",
    checkOut: "05:30 PM",
    date: "2024-01-15",
    status: "present",
    location: "Main Office",
    confidence: 98.5,
  },
  {
    id: "2",
    name: "Mamy Dinyah Randriamanampisoa",
    checkIn: "08:45 AM",
    checkOut: "05:15 PM",
    date: "2024-01-15",
    status: "present",
    location: "Main Office",
    confidence: 96.2,
  },
  {
    id: "3",
    name: "Andréa iharimandresy Ranaivoson",
    checkIn: "09:30 AM",
    checkOut: "-",
    date: "2024-01-15",
    status: "checked-in",
    location: "Branch Office",
    confidence: 94.8,
  },
  {
    id: "4",
    name: "Onenantsoa Andry Ny Avo Ranaivo",
    checkIn: "-",
    checkOut: "-",
    date: "2024-01-15",
    status: "absent",
    location: "-",
    confidence: 0,
  },
]

export default function AttendancePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "prompt">("prompt")
  const [recognitionStatus, setRecognitionStatus] = useState<"idle" | "scanning" | "success" | "failed">("idle")
  const [recognizedUser, setRecognizedUser] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isOnline, setIsOnline] = useState(true)
  const [lastSync, setLastSync] = useState(new Date())
  const [debugInfo, setDebugInfo] = useState<string>("")

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Check camera permission on mount
  useEffect(() => {
    checkCameraPermission()
  }, [])

  const startCamera = async () => {
    try {
      console.log("Starting camera...")

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported by this browser")
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      })

      console.log("Camera stream obtained:", stream)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream

        // Force video to play and handle the promise
        try {
          await videoRef.current.play()
          console.log("Video is playing")
          setIsRecording(true)
          setCameraPermission("granted")
        } catch (playError) {
          console.error("Error playing video:", playError)

          // Try to play again after a short delay
          setTimeout(async () => {
            try {
              if (videoRef.current) {
                await videoRef.current.play()
                setIsRecording(true)
                setCameraPermission("granted")
              }
            } catch (retryError) {
              console.error("Retry play failed:", retryError)
              setCameraPermission("denied")
            }
          }, 100)
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error)

      // Handle different types of errors
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setCameraPermission("denied")
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        setCameraPermission("denied")
      } else {
        setCameraPermission("denied")
      }
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsRecording(false)
    setRecognitionStatus("idle")
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("Video or canvas element not available")
      return
    }

    // Check if video is actually playing
    if (videoRef.current.readyState !== 4) {
      console.error("Video not ready for capture")
      return
    }

    const canvas = canvasRef.current
    const video = videoRef.current
    const context = canvas.getContext("2d")

    if (context) {
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480

      try {
        context.drawImage(video, 0, 0)

        // Simulate facial recognition process
        setRecognitionStatus("scanning")

        setTimeout(() => {
          // Simulate recognition result
          const users = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"]
          const randomUser = users[Math.floor(Math.random() * users.length)]
          const success = Math.random() > 0.2 // 80% success rate

          if (success) {
            setRecognitionStatus("success")
            setRecognizedUser(randomUser)
          } else {
            setRecognitionStatus("failed")
            setRecognizedUser(null)
          }

          // Reset after 3 seconds
          setTimeout(() => {
            setRecognitionStatus("idle")
            setRecognizedUser(null)
          }, 3000)
        }, 2000)
      } catch (drawError) {
        console.error("Error drawing to canvas:", drawError)
        setRecognitionStatus("failed")
      }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-gray-800 text-white dark:bg-gray-200 dark:text-black border-0">
            <CheckCircle className="h-3 w-3 mr-1" />
            Present
          </Badge>
        )
      case "checked-in":
        return (
          <Badge className="bg-gray-600 text-white dark:bg-gray-400 dark:text-black border-0">
            <UserCheck className="h-3 w-3 mr-1" />
            Checked In
          </Badge>
        )
      case "absent":
        return (
          <Badge className="bg-gray-400 text-white dark:bg-gray-600 dark:text-white border-0">
            <UserX className="h-3 w-3 mr-1" />
            Absent
          </Badge>
        )
      default:
        return <Badge className="bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-300 border-0">Unknown</Badge>
    }
  }

  const getRecognitionStatusColor = () => {
    switch (recognitionStatus) {
      case "scanning":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
      case "success":
        return "border-green-500 bg-green-50 dark:bg-green-900/20"
      case "failed":
        return "border-red-500 bg-red-50 dark:bg-red-900/20"
      default:
        return "border-gray-300 dark:border-gray-600"
    }
  }

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || record.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const checkCameraPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: "camera" as PermissionName })
      setCameraPermission(result.state as "granted" | "denied" | "prompt")

      result.onchange = () => {
        setCameraPermission(result.state as "granted" | "denied" | "prompt")
      }
    } catch (error) {
      console.log("Permission API not supported")
    }
  }

  // Add this useEffect after the other useEffects
  useEffect(() => {
    if (videoRef.current && isRecording) {
      const video = videoRef.current

      const updateDebugInfo = () => {
        setDebugInfo(`
          Video Ready State: ${video.readyState}
          Video Width: ${video.videoWidth}
          Video Height: ${video.videoHeight}
          Paused: ${video.paused}
          Ended: ${video.ended}
        `)
      }

      video.addEventListener("loadedmetadata", updateDebugInfo)
      video.addEventListener("canplay", updateDebugInfo)
      video.addEventListener("playing", updateDebugInfo)

      const interval = setInterval(updateDebugInfo, 1000)

      return () => {
        video.removeEventListener("loadedmetadata", updateDebugInfo)
        video.removeEventListener("canplay", updateDebugInfo)
        video.removeEventListener("playing", updateDebugInfo)
        clearInterval(interval)
      }
    }
  }, [isRecording])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Facial Recognition Attendance
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Secure attendance tracking with biometric verification
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">{isOnline ? "Online" : "Offline"}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{currentTime.toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Camera className="h-5 w-5" />
                  Camera Scanner
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Position your face in the camera frame for recognition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Camera Preview */}
                <div className={`relative rounded-lg border-2 ${getRecognitionStatusColor()} overflow-hidden`}>
                  {isRecording ? (
                    <div className="relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        controls={false}
                        style={{
                          width: "100%",
                          height: "256px",
                          objectFit: "cover",
                          backgroundColor: "#f3f4f6",
                        }}
                        className="bg-gray-100 dark:bg-gray-800"
                        onLoadedMetadata={() => console.log("Video metadata loaded")}
                        onCanPlay={() => console.log("Video can play")}
                        onPlaying={() => console.log("Video is playing")}
                        onError={(e) => console.error("Video error:", e)}
                      />
                      {/* Face detection overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-2 border-white rounded-lg opacity-50"></div>
                      </div>
                      {/* Recognition status overlay */}
                      {recognitionStatus !== "idle" && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-center text-white">
                            {recognitionStatus === "scanning" && (
                              <>
                                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                                <p>Scanning face...</p>
                              </>
                            )}
                            {recognitionStatus === "success" && (
                              <>
                                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                                <p>Recognition successful!</p>
                                <p className="text-sm mt-1">Welcome, {recognizedUser}</p>
                              </>
                            )}
                            {recognitionStatus === "failed" && (
                              <>
                                <UserX className="h-8 w-8 text-red-400 mx-auto mb-2" />
                                <p>Recognition failed</p>
                                <p className="text-sm mt-1">Please try again</p>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <CameraOff className="h-12 w-12 mx-auto mb-2" />
                        <p>Camera not active</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Debug Information - Remove this in production */}
                {isRecording && debugInfo && (
                  <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    <pre>{debugInfo}</pre>
                  </div>
                )}

                {/* Camera permission alert */}
                {cameraPermission === "denied" && (
                  <Alert className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20">
                    <Camera className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      Camera access denied. Please enable camera permissions in your browser settings.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Camera controls */}
                <div className="flex gap-2">
                  {!isRecording ? (
                    <Button
                      onClick={startCamera}
                      className="flex-1 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Start Camera
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={capturePhoto}
                        disabled={recognitionStatus === "scanning"}
                        className="flex-1 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                      >
                        {recognitionStatus === "scanning" ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Scan Face
                          </>
                        )}
                      </Button>
                      <Button onClick={stopCamera} variant="outline" className="border-gray-300 dark:border-gray-600">
                        <CameraOff className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                <canvas ref={canvasRef} className="hidden" />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-6">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Present</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">1</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Absent</div>
                  </div>
                </div>
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Last sync</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {lastSync.toLocaleTimeString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Records */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Attendance Records</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Real-time attendance tracking and history
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-[180px] border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Attendance Table */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                  <Table>
                    <TableHeader className="bg-gray-50 dark:bg-gray-800">
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Employee</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Check In</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Check Out</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Status</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Location</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Confidence</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow
                          key={record.id}
                          className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">{record.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{record.date}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-900 dark:text-gray-100">{record.checkIn}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-900 dark:text-gray-100">{record.checkOut}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">{record.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {record.confidence > 0 ? (
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-gray-800 dark:bg-gray-200 h-2 rounded-full"
                                    style={{ width: `${record.confidence}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {record.confidence.toFixed(1)}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredRecords.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No attendance records found matching your criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
