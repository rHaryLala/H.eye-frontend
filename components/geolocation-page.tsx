"use client"

import { useState, useEffect, useRef } from "react"
import {
  MapPin,
  Smartphone,
  Laptop,
  QrCode,
  Share2,
  Copy,
  RefreshCw,
  Globe,
  Activity,
  Battery,
  Signal,
  Map,
  Crosshair,
  Route,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface PhoneLocation {
  latitude: number
  longitude: number
  accuracy: number
  speed?: number
  heading?: number
  battery?: number
  timestamp: Date
  address?: string
}

interface LocationHistory {
  id: string
  location: PhoneLocation
  timestamp: Date
}

export default function PhoneTrackerApp() {
  const [trackingUrl, setTrackingUrl] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [phoneLocation, setPhoneLocation] = useState<PhoneLocation | null>(null)
  const [locationHistory, setLocationHistory] = useState<LocationHistory[]>([])
  const [isPhoneConnected, setIsPhoneConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [sessionId, setSessionId] = useState("")
  const [showTrail, setShowTrail] = useState(true)
  const [mapCenter, setMapCenter] = useState<[number, number]>([-18.7995, 47.4788])


  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const trailRef = useRef<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Load Leaflet dynamically
    loadLeafletMap()

    // Simulate receiving location updates from phone
    if (isPhoneConnected) {
      const interval = setInterval(() => {
        simulatePhoneLocationUpdate()
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isPhoneConnected])

  useEffect(() => {
    // Update map when phone location changes
    if (phoneLocation && mapRef.current) {
      updateMapLocation(phoneLocation)
    }
  }, [phoneLocation])

 const loadLeafletMap = async () => {
  if (typeof window === "undefined") return

  // Attendre que l'élément #map soit dans le DOM
  const waitForMapElement = () =>
    new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        const mapEl = document.getElementById("map")
        if (mapEl) {
          clearInterval(interval)
          resolve()
        }
      }, 100)
    })

  await waitForMapElement()

  const L = (await import("leaflet")).default

  const map = L.map("map").setView(mapCenter, 13)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  const phoneIcon = L.divIcon({
    html: `<div style="background: #3b82f6; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
             <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
               <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
             </svg>
           </div>`,
    className: "phone-marker",
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  })

  mapRef.current = map
  markerRef.current = phoneIcon
}


  const updateMapLocation = (location: PhoneLocation) => {
    if (!mapRef.current) return

    const L = require("leaflet")
    const map = mapRef.current
    const newLatLng = [location.latitude, location.longitude] as [number, number]

    // Remove existing marker
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })

    // Add new marker
    const phoneIcon = L.divIcon({
      html: `<div style="background: #10b981; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); animation: pulse 2s infinite;">
               <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
                 <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                 </svg>
             </div>`,
      className: "phone-marker-active",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })

    const marker = L.marker(newLatLng, { icon: phoneIcon }).addTo(map)

    // Add popup with location info
    const popupContent = `
      <div style="font-family: system-ui; min-width: 200px;">
        <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">📱 Phone Location</h3>
        <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
          <div><strong>Coordinates:</strong> ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}</div>
          <div><strong>Accuracy:</strong> ${Math.round(location.accuracy)}m</div>
          <div><strong>Speed:</strong> ${location.speed ? `${(location.speed * 3.6).toFixed(1)} km/h` : "0 km/h"}</div>
          <div><strong>Battery:</strong> ${location.battery ? `${Math.round(location.battery)}%` : "N/A"}</div>
          <div><strong>Time:</strong> ${location.timestamp.toLocaleTimeString()}</div>
        </div>
      </div>
    `
    marker.bindPopup(popupContent)

    // Add accuracy circle
    const accuracyCircle = L.circle(newLatLng, {
      radius: location.accuracy,
      fillColor: "#3b82f6",
      fillOpacity: 0.1,
      color: "#3b82f6",
      weight: 1,
      opacity: 0.3,
    }).addTo(map)

    // Update trail if enabled
    if (showTrail && locationHistory.length > 1) {
      updateTrail()
    }

    // Center map on new location
    map.setView(newLatLng, map.getZoom())
  }

  const updateTrail = () => {
    if (!mapRef.current || locationHistory.length < 2) return

    const L = require("leaflet")
    const map = mapRef.current

    // Remove existing trail
    if (trailRef.current) {
      map.removeLayer(trailRef.current)
    }

    // Create trail from location history
    const trailPoints = locationHistory.map((item) => [item.location.latitude, item.location.longitude])

    trailRef.current = L.polyline(trailPoints, {
      color: "#8b5cf6",
      weight: 3,
      opacity: 0.7,
      smoothFactor: 1,
    }).addTo(map)
  }

  const generateTrackingSession = () => {
    const newSessionId = Math.random().toString(36).substring(2, 15)
    const baseUrl = window.location.origin
    const url = `${baseUrl}/phone/${newSessionId}`

    setSessionId(newSessionId)
    setTrackingUrl(url)

    // Generate QR code using a free service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`
    setQrCodeUrl(qrUrl)

    toast({
      title: "Tracking Session Created",
      description: "QR code generated! Scan with your phone to start tracking.",
    })
  }

const simulatePhoneLocationUpdate = () => {
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.")
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords

      const newLocation: PhoneLocation = {
        latitude,
        longitude,
        accuracy: accuracy || 10,
        speed: 0,
        heading: 0,
        battery: 85,
        timestamp: new Date(),
        address: "Your current location",
      }

      setPhoneLocation(newLocation)
      setLastUpdate(new Date())

      const historyItem: LocationHistory = {
        id: Date.now().toString(),
        location: newLocation,
        timestamp: new Date(),
      }

      setLocationHistory((prev) => [historyItem, ...prev.slice(0, 49)])
    },
    (error) => {
      console.error("Geolocation error:", error.message)
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  )
}


  const centerMapOnPhone = () => {
    if (phoneLocation && mapRef.current) {
      mapRef.current.setView([phoneLocation.latitude, phoneLocation.longitude], 16)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingUrl)
    toast({
      title: "Link Copied",
      description: "Tracking link copied to clipboard.",
    })
  }

  const openInMaps = () => {
    if (phoneLocation) {
      const url = `https://www.google.com/maps?q=${phoneLocation.latitude},${phoneLocation.longitude}`
      window.open(url, "_blank")
    }
  }

  const formatSpeed = (speed?: number): string => {
    if (!speed) return "0 km/h"
    return `${(speed * 3.6).toFixed(1)} km/h`
  }

  const formatHeading = (heading?: number): string => {
    if (!heading) return "N"
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const index = Math.round(heading / 45) % 8
    return directions[index]
  }

  const getTimeSinceUpdate = (): string => {
    if (!lastUpdate) return "Never"
    const seconds = Math.floor((Date.now() - lastUpdate.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <Smartphone className="h-10 w-10 text-blue-600" />
              <Share2 className="h-6 w-6 text-gray-400" />
              <Laptop className="h-10 w-10 text-green-600" />
            </div>
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Real-Time Tracker</h2>
          <p className="text-gray-600 dark:text-gray-300">Track your phone's location on an interactive map</p>
        </div>

        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Live Map
            </TabsTrigger>
            <TabsTrigger value="setup" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Details
            </TabsTrigger>
          </TabsList>

          {/* Live Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Map Container */}
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Map className="h-5 w-5 text-blue-600" />
                        Live Location Map
                        {isPhoneConnected && (
                          <Badge className="bg-green-600">
                            <Signal className="h-3 w-3 mr-1" />
                            Live
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button onClick={centerMapOnPhone} size="sm" variant="outline" disabled={!phoneLocation}>
                          <Crosshair className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => setShowTrail(!showTrail)}
                          size="sm"
                          variant={showTrail ? "default" : "outline"}
                        >
                          <Route className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Real-time location tracking with interactive map</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div id="map" className="w-full h-[500px] rounded-b-lg" style={{ background: "#f8fafc" }}></div>
                  </CardContent>
                </Card>
              </div>

              {/* Map Controls */}
              <div className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Map Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={centerMapOnPhone} disabled={!phoneLocation} className="w-full">
                      <Crosshair className="h-4 w-4 mr-2" />
                      Center on Phone
                    </Button>
                    <Button onClick={openInMaps} disabled={!phoneLocation} variant="outline" className="w-full">
                      <Globe className="h-4 w-4 mr-2" />
                      Open in Google Maps
                    </Button>
                    <Button
                      onClick={() => setShowTrail(!showTrail)}
                      variant={showTrail ? "default" : "outline"}
                      className="w-full"
                    >
                      <Route className="h-4 w-4 mr-2" />
                      {showTrail ? "Hide" : "Show"} Trail
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                {phoneLocation && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Live Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{Math.round(phoneLocation.accuracy)}m</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">{formatSpeed(phoneLocation.speed)}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Speed</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                            <Battery className="h-4 w-4" />
                            {phoneLocation.battery ? `${Math.round(phoneLocation.battery)}%` : "N/A"}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Battery</div>
                        </div>
                      </div>
                      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                        Updated {getTimeSinceUpdate()}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Setup Section */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-blue-600" />
                    Setup Phone Tracking
                  </CardTitle>
                  <CardDescription>Generate a QR code to connect your phone</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!trackingUrl ? (
                    <Button onClick={generateTrackingSession} className="w-full" size="lg">
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR Code
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      {/* QR Code Display */}
                      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border">
                        <img
                          src={qrCodeUrl || "/placeholder.svg"}
                          alt="QR Code for phone tracking"
                          className="mx-auto mb-4 rounded-lg shadow-md"
                          width={250}
                          height={250}
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Scan this QR code with your phone's camera
                        </p>

                        {/* Manual Link */}
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500">Or copy this link:</p>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={trackingUrl}
                              readOnly
                              className="flex-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-700 border rounded"
                            />
                            <Button onClick={copyToClipboard} size="sm" variant="outline">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Connection Status */}
                      <Alert
                        className={
                          isPhoneConnected
                            ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20"
                            : "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20"
                        }
                      >
                        <Activity className={`h-4 w-4 ${isPhoneConnected ? "text-green-600" : "text-yellow-600"}`} />
                        <AlertDescription
                          className={
                            isPhoneConnected
                              ? "text-green-800 dark:text-green-200"
                              : "text-yellow-800 dark:text-yellow-200"
                          }
                        >
                          {isPhoneConnected
                            ? "✅ Phone connected and sharing location"
                            : "⏳ Waiting for phone to connect..."}
                        </AlertDescription>
                      </Alert>

                      <Button onClick={() => setIsPhoneConnected(true)} variant="outline" className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Simulate Phone Connection (Demo)
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>How to Connect Your Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📱 Step-by-Step:</h4>
                      <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                            1
                          </span>
                          Open your phone's camera app
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                            2
                          </span>
                          Point it at the QR code above
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                            3
                          </span>
                          Tap the notification to open the link
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                            4
                          </span>
                          Allow location permissions
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                            5
                          </span>
                          Start sharing your location
                        </li>
                      </ol>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">✨ Features:</h4>
                      <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                        <li>• Real-time location updates on interactive map</li>
                        <li>• Movement trail visualization</li>
                        <li>• Speed and direction tracking</li>
                        <li>• Battery level monitoring</li>
                        <li>• Accuracy indicators</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            {!phoneLocation ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="text-center py-12">
                  <Smartphone className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No location data</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Connect your phone to see detailed location information
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Current Location Details */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      Current Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-gray-600 dark:text-gray-400">Latitude</label>
                        <div className="text-lg font-mono font-bold text-gray-900 dark:text-white">
                          {phoneLocation.latitude.toFixed(6)}°
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-600 dark:text-gray-400">Longitude</label>
                        <div className="text-lg font-mono font-bold text-gray-900 dark:text-white">
                          {phoneLocation.longitude.toFixed(6)}°
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-600 dark:text-gray-400">Accuracy</label>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {Math.round(phoneLocation.accuracy)}m
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-600 dark:text-gray-400">Last Update</label>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {phoneLocation.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    {phoneLocation.address && (
                      <div>
                        <label className="text-gray-600 dark:text-gray-400">Address</label>
                        <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">{phoneLocation.address}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Movement & Battery Info */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-purple-600" />
                      Movement & Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{formatSpeed(phoneLocation.speed)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Speed</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{formatHeading(phoneLocation.heading)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Direction</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                          <Battery className="h-5 w-5" />
                          {phoneLocation.battery ? `${Math.round(phoneLocation.battery)}%` : "N/A"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Battery</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{locationHistory.length}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Trail Points</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Leaflet CSS */}
        <style jsx global>{`
          @import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");

          .phone-marker-active {
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          .leaflet-popup-content-wrapper {
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .leaflet-popup-tip {
            background: white;
          }
        `}</style>

        {/* Load Leaflet script */}
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      </div>
    </div>
  )
}
