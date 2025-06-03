"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState, useRef } from "react"
import {
  User,
  Mail,
  Lock,
  Shield,
  Camera,
  Upload,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  UserPlus,
  Edit3,
  Database,
  Fingerprint,
} from "lucide-react"

interface UserFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  profileImage: File | null
}

interface UserManagementFormProps {
  mode?: "add" | "edit"
  initialData?: Partial<UserFormData>
  onSubmit?: (data: UserFormData) => void
}

export default function UserManagementForm({ mode = "add", initialData = {}, onSubmit }: UserManagementFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
    password: "",
    role: initialData.role || "",
    profileImage: null,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const roles = [
    {
      value: "admin",
      label: "Administrator",
      description: "Full system access",
      icon: "👑",
    },
    {
      value: "agent",
      label: "Agent",
      description: "User management and monitoring",
      icon: "🛡️",
    },
    {
      value: "user",
      label: "User",
      description: "Standard system access",
      icon: "👤",
    },
  ]

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field === "email") {
      setEmailValid(value ? validateEmail(value) : null)
    }

    if (field === "password") {
      setPasswordStrength(calculatePasswordStrength(value))
    }
  }

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, profileImage: file }))

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    console.log("Form submitted:", formData)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-gray-400"
    if (passwordStrength <= 3) return "bg-gray-600"
    return "bg-gray-800 dark:bg-gray-200"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Weak"
    if (passwordStrength <= 3) return "Medium"
    return "Strong"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200 dark:border-gray-700">
              <Fingerprint className="h-4 w-4" />
              Facial Recognition System
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-6">
              {mode === "add" ? "Add New" : "Edit"}
              <br />
              User
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {mode === "add"
                ? "Register a new profile in the system with facial recognition capabilities"
                : "Modify user information and permissions"}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Info Cards */}
            <div className="space-y-6">
              <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Database className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Passwords automatically hashed</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Secure REST API</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Email validation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Role-based access control</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Camera className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    Facial Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The profile photo will be used for biometric identification. Ensure the face is clearly visible and
                    well-lit for optimal recognition accuracy.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <Card
                    key={role.value}
                    className="p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2 grayscale">{role.icon}</div>
                      <div className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        {role.label}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2">
              <Card className="border border-gray-200 dark:border-gray-700 shadow-2xl bg-white dark:bg-gray-900">
                <CardHeader className="pb-8 border-b border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      {mode === "add" ? (
                        <UserPlus className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                      ) : (
                        <Edit3 className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                      )}
                    </div>
                    {mode === "add" ? "New User" : "Edit User"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 pt-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Photo Upload Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                        <Camera className="h-4 w-4" />
                        Profile Photo *
                      </div>
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                          dragActive
                            ? "border-gray-400 bg-gray-50 dark:bg-gray-800"
                            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        {imagePreview ? (
                          <div className="space-y-4">
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Preview"
                              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-800 shadow-lg grayscale"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                              onClick={() => {
                                setImagePreview(null)
                                setFormData((prev) => ({ ...prev, profileImage: null }))
                              }}
                            >
                              Change Photo
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                            <div>
                              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Drop a photo here</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">or click to select</p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Choose File
                            </Button>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(e.target.files[0])
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                        <User className="h-4 w-4" />
                        Personal Information
                      </div>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-3">
                          <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder="John"
                            className="h-12 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            placeholder="Doe"
                            className="h-12 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Account Info */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                        <Shield className="h-4 w-4" />
                        Account Information
                      </div>

                      {/* Email */}
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                          Email Address *
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john.doe@company.com"
                            className={`h-12 pl-12 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 ${
                              emailValid === false
                                ? "border-red-500"
                                : emailValid === true
                                  ? "border-gray-600 dark:border-gray-400"
                                  : ""
                            }`}
                            required
                          />
                          {emailValid !== null && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              {emailValid ? (
                                <Check className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                              ) : (
                                <X className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {emailValid === false && (
                          <p className="text-sm text-red-600 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Please enter a valid email address
                          </p>
                        )}
                      </div>

                      {/* Password */}
                      <div className="space-y-3">
                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                          {mode === "add" ? "Password *" : "New Password (leave blank to keep current)"}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            placeholder="••••••••"
                            className="h-12 pl-12 pr-12 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                            required={mode === "add"}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {formData.password && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {getPasswordStrengthText()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Password will be automatically hashed before storage
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Role */}
                      <div className="space-y-3">
                        <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">
                          Role *
                        </Label>
                        <Select onValueChange={(value) => handleInputChange("role", value)} value={formData.role}>
                          <SelectTrigger className="h-12 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex items-center gap-3">
                                  <span className="text-lg grayscale">{role.icon}</span>
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-gray-100">{role.label}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{role.description}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Security Alert */}
                    <Alert className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                      <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <AlertDescription className="text-gray-700 dark:text-gray-300">
                        <strong>Security:</strong> All data is transmitted via secure REST API. Passwords will be
                        automatically hashed and photos will be associated with the biometric profile.
                      </AlertDescription>
                    </Alert>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {mode === "add" ? (
                          <>
                            <UserPlus className="h-5 w-5 mr-2" />
                            Create User
                          </>
                        ) : (
                          <>
                            <Edit3 className="h-5 w-5 mr-2" />
                            Update User
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
