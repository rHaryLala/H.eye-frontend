"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { MapPin, Smartphone, Send, Activity, Battery, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export default function TrackingPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const [isConnected, setIsConnected] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [deviceName, setDeviceName] = useState("")
  const [currentLocation, setCurrentLocation] = useState<any>(null)
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null)

  const watchIdRef = useRef<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Get battery level if available
    if ("getBattery" in navigator) {
      ;(navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100))

        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100))
        })
      })
    }

    // Auto-detect device name
    const userAgent = navigator.userAgent
    if (/iPhone/.test(userAgent)) {
      setDeviceName("iPhone")
    } else if (/iPad/.test(userAgent)) {
      setDeviceName("iPad")
    } else if (/Android/.test(userAgent)) {
      setDeviceName("Android Device")
    } else {
      setDeviceName("Mobile Device")
    }
  }, [])

  const connectToSession = () => {
    if (!deviceName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a device name.",
        variant: "destructive",
      })
      return
    }

    setIsConnected(true)
    toast({
      title: "Connected",
      description: `Connected to session ${sessionId.slice(-8)}`,
    })
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

        // In a real app, you'd send this to a WebSocket server
        console.log("Sending location:", locationData)

        toast({
          title: "Location Shared",
          description: "Your location is being shared with the laptop.",
        })
      },
      (error) => {
        console.error("Location error:", error)
        toast({
          title: "Location Error",
          description: "Unable to get location. Please check permissions.",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <Smartphone className="h-8 w-8 text-blue-600" />
            Mobile Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Share your location with the laptop</p>
          <Badge variant="outline" className="mt-2">
            Session: {sessionId.slice(-8)}
          </Badge>
        </div>

        {!isConnected ? (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Connect to Session
              </CardTitle>
              <CardDescription>Enter your device name to start sharing location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deviceName">Device Name</Label>
                <Input
                  id="deviceName"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  placeholder="e.g., My iPhone"
                />
              </div>

              <Button onClick={connectToSession} disabled={!deviceName.trim()} className="w-full" size="lg">
                <Send className="h-4 w-4 mr-2" />
                Connect to Laptop
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
              <Activity className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Connected to laptop session. Ready to share location.
              </AlertDescription>
            </Alert>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-purple-600" />
                  Location Sharing
                </CardTitle>
                <CardDescription>Control your location sharing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isSharing ? (
                  <Button onClick={startLocationSharing} className="w-full" size="lg">
                    <MapPin className="h-4 w-4 mr-2" />
                    Start Sharing Location
                  </Button>
                ) : (
                  <Button onClick={stopLocationSharing} variant="destructive" className="w-full" size="lg">
                    Stop Sharing
                  </Button>
                )}

                {currentLocation && (
                  <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold">Current Location</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <Label className="text-gray-600 dark:text-gray-400">Latitude</Label>
                        <div className="font-mono">{currentLocation.latitude.toFixed(6)}</div>
                      </div>
                      <div>
                        <Label className="text-gray-600 dark:text-gray-400">Longitude</Label>
                        <div className="font-mono">{currentLocation.longitude.toFixed(6)}</div>
                      </div>
                      <div>
                        <Label className="text-gray-600 dark:text-gray-400">Accuracy</Label>
                        <div>{Math.round(currentLocation.accuracy)}m</div>
                      </div>
                      <div>
                        <Label className="text-gray-600 dark:text-gray-400">Speed</Label>
                        <div>{currentLocation.speed ? `${(currentLocation.speed * 3.6).toFixed(1)} km/h` : "N/A"}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  Device Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{deviceName}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Device</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-xl font-bold text-green-600 flex items-center justify-center gap-1">
                      <Battery className="h-4 w-4" />
                      {batteryLevel ? `${batteryLevel}%` : "N/A"}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Battery</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
