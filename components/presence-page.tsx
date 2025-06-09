"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Camera, Users, Clock, CheckCircle, Download, Trash2, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface AttendanceRecord {
  id: string
  name: string
  timestamp: Date
  photo: string
  status: "present" | "absent"
}

export default function AttendanceApp() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [currentName, setCurrentName] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const { toast } = useToast()

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("attendanceRecords")
    if (saved) {
      try {
        const records = JSON.parse(saved).map((record: any) => ({
          ...record,
          timestamp: new Date(record.timestamp),
        }))
        setAttendanceRecords(records)
      } catch (error) {
        console.error("Error loading attendance records:", error)
      }
    }
  }, [])

  // Save to localStorage
  const saveToStorage = (records: AttendanceRecord[]) => {
    localStorage.setItem("attendanceRecords", JSON.stringify(records))
  }

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsStreaming(true)

        toast({
          title: "Camera Started",
          description: "Camera is now active and ready for capture.",
        })
      }
    } catch (error) {
      console.error("Camera error:", error)
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      })
    }
  }, [toast])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsStreaming(false)

    toast({
      title: "Camera Stopped",
      description: "Camera has been deactivated.",
    })
  }, [toast])

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !currentName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a name and start the camera.",
        variant: "destructive",
      })
      return
    }

    const canvas = canvasRef.current
    const video = videoRef.current
    const context = canvas.getContext("2d")

    if (context) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0)

      const photoDataUrl = canvas.toDataURL("image/jpeg", 0.8)

      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        name: currentName.trim(),
        timestamp: new Date(),
        photo: photoDataUrl,
        status: "present",
      }

      const updatedRecords = [newRecord, ...attendanceRecords]
      setAttendanceRecords(updatedRecords)
      saveToStorage(updatedRecords)
      setCurrentName("")

      toast({
        title: "Attendance Recorded",
        description: `${newRecord.name} has been marked present.`,
      })
    }
  }, [currentName, attendanceRecords, toast])

  const getTodayRecords = () => {
    const today = new Date().toDateString()
    return attendanceRecords.filter((record) => record.timestamp.toDateString() === today)
  }

  const clearAllRecords = () => {
    setAttendanceRecords([])
    localStorage.removeItem("attendanceRecords")
    toast({
      title: "Data Cleared",
      description: "All attendance records have been deleted.",
    })
  }

  const exportData = () => {
    const csvContent = [
      ["Name", "Date", "Time", "Status"],
      ...attendanceRecords.map((record) => [
        record.name,
        record.timestamp.toLocaleDateString(),
        record.timestamp.toLocaleTimeString(),
        record.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `attendance-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Attendance data exported successfully.",
    })
  }

  const deleteRecord = (id: string) => {
    const updatedRecords = attendanceRecords.filter((record) => record.id !== id)
    setAttendanceRecords(updatedRecords)
    saveToStorage(updatedRecords)

    toast({
      title: "Record Deleted",
      description: "Attendance record has been removed.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Camera-Based Attendance Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Automated attendance tracking system with photo capture</p>
        </div>

        <Tabs defaultValue="capture" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="capture" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Capture
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Records
            </TabsTrigger>
          </TabsList>

          <TabsContent value="capture" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Camera Section */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Video Capture
                  </CardTitle>
                  <CardDescription>Activate the camera to capture attendance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-64 object-cover" />
                    {!isStreaming && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <div className="text-center text-white">
                          <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Camera Inactive</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!isStreaming ? (
                      <Button onClick={startCamera} className="flex-1">
                        <Camera className="h-4 w-4 mr-2" />
                        Start Camera
                      </Button>
                    ) : (
                      <Button onClick={stopCamera} variant="outline" className="flex-1">
                        Stop Camera
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recording Section */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Record Attendance
                  </CardTitle>
                  <CardDescription>Enter name and capture photo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Person's Name</Label>
                    <Input
                      id="name"
                      value={currentName}
                      onChange={(e) => setCurrentName(e.target.value)}
                      placeholder="Enter name..."
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={capturePhoto}
                    disabled={!isStreaming || !currentName.trim()}
                    className="w-full"
                    size="lg"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Capture and Record
                  </Button>

                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Today's attendance: {getTodayRecords().length}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{getTodayRecords().length}</div>
                      <div className="text-sm text-gray-500">Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{attendanceRecords.length}</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold">Attendance Records</h2>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {attendanceRecords.length} total
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={exportData}
                  variant="outline"
                  disabled={attendanceRecords.length === 0}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
                <Button
                  onClick={clearAllRecords}
                  variant="destructive"
                  disabled={attendanceRecords.length === 0}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>

            {attendanceRecords.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No attendance records found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Start by capturing attendance in the Capture tab</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {attendanceRecords.map((record) => (
                  <Card key={record.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={record.photo || "/placeholder.svg"}
                            alt={`Photo of ${record.name}`}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                          />
                          <div className="absolute -bottom-1 -right-1">
                            <Badge variant={record.status === "present" ? "default" : "secondary"} className="text-xs">
                              {record.status === "present" ? "✓" : "✗"}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{record.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3" />
                            {record.timestamp.toLocaleDateString()} at {record.timestamp.toLocaleTimeString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge
                            variant={record.status === "present" ? "default" : "secondary"}
                            className="flex items-center gap-1"
                          >
                            <UserCheck className="h-3 w-3" />
                            {record.status === "present" ? "Present" : "Absent"}
                          </Badge>
                          <Button
                            onClick={() => deleteRecord(record.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
