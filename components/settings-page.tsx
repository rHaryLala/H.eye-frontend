"use client"
import { useState } from "react"
import {
  Bell,
  ChevronRight,
  Globe,
  Key,
  Lock,
  LogOut,
  Moon,
  Palette,
  Save,
  Shield,
  Sun,
  User,
  UserCog,
  Laptop,
  Smartphone,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("english")
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSaveSettings = () => {
    console.log("Settings saved")
    // Here you would save the settings to your backend
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-6">
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === "profile"
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <button
                    onClick={() => setActiveTab("account")}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === "account"
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <UserCog className="h-5 w-5" />
                    <span>Account</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <button
                    onClick={() => setActiveTab("appearance")}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === "appearance"
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Palette className="h-5 w-5" />
                    <span>Appearance</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === "notifications"
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === "security"
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Shield className="h-5 w-5" />
                    <span>Security</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <button
                    onClick={() => setActiveTab("advanced")}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === "advanced"
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Globe className="h-5 w-5" />
                    <span>Advanced</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                </nav>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Hary Lala</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
                    </div>
                  </div>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Update your personal information and profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-16 w-16 text-gray-500 dark:text-gray-400" />
                      </div>
                      <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600">
                        Change Photo
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Hary Lala" className="border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Rabenamana" className="border-gray-300 dark:border-gray-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="rabenamanahary@gmail.com"
                          className="border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="038 58 207 55"
                          className="border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Write a short bio about yourself..."
                          className="min-h-[100px] border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Button
                    onClick={handleSaveSettings}
                    className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Account Settings
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Manage your account preferences and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="bouh" className="border-gray-300 dark:border-gray-600" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="admin">
                          <SelectTrigger className="border-gray-300 dark:border-gray-600">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="agent">Agent</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Connected Accounts</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Google</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Connected</p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                          Disconnect
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Facebook</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Not connected</p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Danger Zone</h3>
                    <div className="rounded-lg border border-red-200 dark:border-red-900 p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Permanently delete your account and all of your data
                          </p>
                        </div>
                        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                                This action cannot be undone. This will permanently delete your account and remove all
                                of your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Button
                    onClick={handleSaveSettings}
                    className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Appearance</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Customize the appearance of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Theme</h3>
                    <RadioGroup
                      defaultValue={theme}
                      onValueChange={setTheme}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                        <Label
                          htmlFor="theme-light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 peer-data-[state=checked]:border-gray-900 dark:peer-data-[state=checked]:border-gray-300 [&:has([data-state=checked])]:border-gray-900 dark:[&:has([data-state=checked])]:border-gray-300 cursor-pointer"
                        >
                          <Sun className="mb-3 h-6 w-6 text-gray-900 dark:text-gray-100" />
                          <div className="font-medium text-gray-900 dark:text-gray-100">Light</div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                        <Label
                          htmlFor="theme-dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 peer-data-[state=checked]:border-gray-900 dark:peer-data-[state=checked]:border-gray-300 [&:has([data-state=checked])]:border-gray-900 dark:[&:has([data-state=checked])]:border-gray-300 cursor-pointer"
                        >
                          <Moon className="mb-3 h-6 w-6 text-gray-900 dark:text-gray-100" />
                          <div className="font-medium text-gray-900 dark:text-gray-100">Dark</div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                        <Label
                          htmlFor="theme-system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 peer-data-[state=checked]:border-gray-900 dark:peer-data-[state=checked]:border-gray-300 [&:has([data-state=checked])]:border-gray-900 dark:[&:has([data-state=checked])]:border-gray-300 cursor-pointer"
                        >
                          <Laptop className="mb-3 h-6 w-6 text-gray-900 dark:text-gray-100" />
                          <div className="font-medium text-gray-900 dark:text-gray-100">System</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Language</h3>
                    <Select defaultValue={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full md:w-[240px] border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="portuguese">Portuguese</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Accessibility</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="reduce-motion" className="font-medium text-gray-900 dark:text-gray-100">
                            Reduce Motion
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Reduce the amount of animations in the interface
                          </p>
                        </div>
                        <Switch id="reduce-motion" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="high-contrast" className="font-medium text-gray-900 dark:text-gray-100">
                            High Contrast
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Increase contrast between elements</p>
                        </div>
                        <Switch id="high-contrast" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Button
                    onClick={handleSaveSettings}
                    className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Notifications</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications" className="font-medium text-gray-900 dark:text-gray-100">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="security-alerts" className="font-medium text-gray-900 dark:text-gray-100">
                            Security Alerts
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive security alerts via email</p>
                        </div>
                        <Switch id="security-alerts" checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketing-emails" className="font-medium text-gray-900 dark:text-gray-100">
                            Marketing Emails
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive marketing and promotional emails
                          </p>
                        </div>
                        <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications" className="font-medium text-gray-900 dark:text-gray-100">
                            Push Notifications
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive push notifications on your devices
                          </p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">New User Registration</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            When a new user registers in the system
                          </p>
                        </div>
                        <Select defaultValue="email">
                          <SelectTrigger className="w-[180px] border-gray-300 dark:border-gray-600">
                            <SelectValue placeholder="Select notification type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="push">Push</SelectItem>
                            <SelectItem value="both">Email & Push</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">System Updates</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">When system updates are available</p>
                        </div>
                        <Select defaultValue="both">
                          <SelectTrigger className="w-[180px] border-gray-300 dark:border-gray-600">
                            <SelectValue placeholder="Select notification type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="push">Push</SelectItem>
                            <SelectItem value="both">Email & Push</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Button
                    onClick={handleSaveSettings}
                    className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Security</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Manage your security settings and authentication methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" className="border-gray-300 dark:border-gray-600" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" className="border-gray-300 dark:border-gray-600" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" className="border-gray-300 dark:border-gray-600" />
                      </div>
                      <Button className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black">
                        <Key className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                    </div>

                    {twoFactorEnabled && (
                      <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-40 h-40 bg-white p-2 rounded-lg">
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <p className="text-sm text-gray-500">QR Code Placeholder</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Scan with authenticator app</p>
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="backup-codes">Backup Codes</Label>
                              <div className="grid grid-cols-2 gap-2">
                                {Array.from({ length: 6 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center font-mono text-sm"
                                  >
                                    {Math.random().toString(36).substring(2, 8).toUpperCase()}
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Save these backup codes in a secure place. You can use them to sign in if you lose
                                access to your authenticator app.
                              </p>
                            </div>
                            <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                              Download Backup Codes
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Session Management</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Select defaultValue={sessionTimeout} onValueChange={setSessionTimeout}>
                          <SelectTrigger
                            className="w-full md:w-[240px] border-gray-300 dark:border-gray-600"
                            id="session-timeout"
                          >
                            <SelectValue placeholder="Select timeout duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="240">4 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Active Sessions</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <Laptop className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  Windows PC - Microsoft Edge
                                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0">
                                    Current
                                  </Badge>
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Last active: Just now • Antanifotsy, Madagascar
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" className="text-gray-500">
                              Sign Out
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <Smartphone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">Pixel 7 Pro - Chrome</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Last active: 2 hours ago • Antanifotsy, Madagascar
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" className="text-gray-500">
                              Sign Out
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                        <Lock className="h-4 w-4 mr-2" />
                        Sign Out All Devices
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Button
                    onClick={handleSaveSettings}
                    className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Advanced Settings */}
            {activeTab === "advanced" && (
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Advanced Settings
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Configure advanced system settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">API Access</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="api-access" className="font-medium text-gray-900 dark:text-gray-100">
                            Enable API Access
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Allow external applications to access your data
                          </p>
                        </div>
                        <Switch id="api-access" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="api-key">API Key</Label>
                        <div className="flex gap-2">
                          <Input
                            id="api-key"
                            value="••••••••••••••••••••••••••••••"
                            readOnly
                            className="flex-1 font-mono border-gray-300 dark:border-gray-600"
                          />
                          <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                            Regenerate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Data Export</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Export all your data in various formats
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                          Export as JSON
                        </Button>
                        <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                          Export as CSV
                        </Button>
                        <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                          Export as PDF
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">System Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="analytics" className="font-medium text-gray-900 dark:text-gray-100">
                            Usage Analytics
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Allow us to collect anonymous usage data
                          </p>
                        </div>
                        <Switch id="analytics" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-updates" className="font-medium text-gray-900 dark:text-gray-100">
                            Automatic Updates
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Automatically update the application when new versions are available
                          </p>
                        </div>
                        <Switch id="auto-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="beta-features" className="font-medium text-gray-900 dark:text-gray-100">
                            Beta Features
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Enable experimental features</p>
                        </div>
                        <Switch id="beta-features" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Button
                    onClick={handleSaveSettings}
                    className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
