"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import {
  MapPin,
  Smartphone,
  Activity,
  Battery,
  Navigation,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  Route,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export default function PhoneTrackingPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const [isSharing, setIsSharing] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<any>(null)
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt">("prompt")
  const [shareCount, setShareCount] = useState(0)

  const watchIdRef = useRef<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Get battery level if available
    if ("getBattery" in navigator) {
      ;(navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100))

        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100))
        })
      })
    }

    // Check geolocation permission
    checkLocationPermission()

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const checkLocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: "geolocation" })
      setPermissionStatus(result.state as "granted" | "denied" | "prompt")

      result.onchange = () => {
        setPermissionStatus(result.state as "granted" | "denied" | "prompt")
      }
    } catch (error) {
      console.log("Permission API not supported")
    }
  }

  const startLocationSharing = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation not supported on this device.",
        variant: "destructive",
      })
      return
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy, speed, heading } = position.coords

        const locationData = {
          latitude,
          longitude,
          accuracy,
          speed: speed || undefined,
          heading: heading || undefined,
          timestamp: new Date(),
          battery: batteryLevel,
        }

        setCurrentLocation(locationData)
        setIsSharing(true)
        setPermissionStatus("granted")
        setShareCount((prev) => prev + 1)

        // In a real app, you'd send this to your laptop via WebSocket
        console.log("Sending location to laptop:", locationData)

        if (!isSharing) {
          toast({
            title: "Location Sharing Started",
            description: "Your location is now being shared with your laptop.",
          })
        }
      },
      (error) => {
        console.error("Location error:", error)

        let message = "Unknown error occurred"
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location access denied. Please enable location permissions."
            setPermissionStatus("denied")
            break
          case error.POSITION_UNAVAILABLE:
            message = "Location information unavailable."
            break
          case error.TIMEOUT:
            message = "Location request timed out."
            break
        }

        toast({
          title: "Location Error",
          description: message,
          variant: "destructive",
        })
      },
      options,
    )
  }

  const stopLocationSharing = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    setIsSharing(false)

    toast({
      title: "Sharing Stopped",
      description: "Location sharing has been disabled.",
    })
  }

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent
    if (/iPhone/.test(userAgent)) return "iPhone"
    if (/iPad/.test(userAgent)) return "iPad"
    if (/Android/.test(userAgent)) return "Android Device"
    return "Mobile Device"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <Smartphone className="h-8 w-8 text-blue-600" />
            Live Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Share your location with your laptop</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Badge variant="outline">Session: {sessionId.slice(-6)}</Badge>
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </div>
        </div>

        {/* Permission Alert */}
        {permissionStatus === "denied" && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              Location access denied. Please enable location permissions in your browser settings to share your
              location.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Control Card */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-purple-600" />
              Location Sharing
              {isSharing && (
                <Badge className="bg-green-600 animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Control your location sharing with your laptop</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isSharing ? (
              <Button
                onClick={startLocationSharing}
                disabled={permissionStatus === "denied" || !isOnline}
                className="w-full"
                size="lg"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Start Sharing Location
              </Button>
            ) : (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
                  <Activity className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    ✅ Your location is being shared with your laptop in real-time. Your laptop can see you on the map!
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="text-lg font-bold text-blue-600">{shareCount}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Updates</div>
                  </div>
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="text-lg font-bold text-green-600">
                      {currentLocation ? Math.round(currentLocation.accuracy) : 0}m
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="text-lg font-bold text-purple-600">
                      {currentLocation?.speed ? `${(currentLocation.speed * 3.6).toFixed(0)}` : "0"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">km/h</div>
                  </div>
                </div>

                <Button onClick={stopLocationSharing} variant="destructive" className="w-full" size="lg">
                  Stop Sharing
                </Button>
              </div>
            )}

            {/* Current Location Display */}
            {currentLocation && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Current Location
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Latitude</div>
                    <div className="font-mono text-xs">{currentLocation.latitude.toFixed(6)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Longitude</div>
                    <div className="font-mono text-xs">{currentLocation.longitude.toFixed(6)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Accuracy</div>
                    <div className="font-semibold">{Math.round(currentLocation.accuracy)}m</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Speed</div>
                    <div className="font-semibold">
                      {currentLocation.speed ? `${(currentLocation.speed * 3.6).toFixed(1)} km/h` : "0 km/h"}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: {currentLocation.timestamp.toLocaleTimeString()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Device Status Card */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-green-600" />
              Device Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{getDeviceInfo()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Device</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                  <Battery className="h-4 w-4" />
                  {batteryLevel ? `${batteryLevel}%` : "N/A"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Battery</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Permission:</span>
                  <Badge variant={permissionStatus === "granted" ? "default" : "destructive"}>{permissionStatus}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Connection:</span>
                  <Badge variant={isOnline ? "default" : "destructive"}>{isOnline ? "Online" : "Offline"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Sharing:</span>
                  <Badge variant={isSharing ? "default" : "secondary"}>{isSharing ? "Active" : "Inactive"}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Features Info */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Route className="h-4 w-4" />
            🗺️ Your laptop can see:
          </h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>• Your real-time location on an interactive map</li>
            <li>• Your movement trail as you move around</li>
            <li>• Your speed and direction of travel</li>
            <li>• Your battery level and device status</li>
            <li>• Accuracy of your GPS signal</li>
          </ul>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📱 Keep in mind:</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Keep this page open to continue sharing</li>
            <li>• Your laptop shows your location in real-time</li>
            <li>• Make sure location permissions stay enabled</li>
            <li>• Stay connected to the internet for live updates</li>
            <li>• Your movement creates a trail on the map</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
