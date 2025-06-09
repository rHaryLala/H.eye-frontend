"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  MoreHorizontal,
  Search,
  Trash2,
  UserIcon,
  UserPlus,
  Mail,
  Lock,
  Camera,
  Upload,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Import users data with fallback
let usersData: any[] = []
try {
  usersData = require("../app/user/users.json")
} catch (error) {
  console.log("Users data file not found, using empty array")
  usersData = []
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "admin" | "agent" | "user"
  status: "active" | "inactive"
  lastLogin: string
  createdAt: string
}

interface UserFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  profileImage: File | null
}

interface UserListProps {
  onEditUser?: (user: User) => void
  onDeleteUser?: (userId: string) => void
  onAddUser?: () => void
}

export default function UserList({ onEditUser, onDeleteUser, onAddUser }: UserListProps) {
  const [data, setData] = React.useState<User[]>(usersData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null)
  const [editingUser, setEditingUser] = React.useState<User | null>(null)
  const [editFormData, setEditFormData] = React.useState<Partial<User>>({})
  const [showAddUserForm, setShowAddUserForm] = React.useState(false)

  // Add User Form State
  const [addFormData, setAddFormData] = React.useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    profileImage: null,
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [emailValid, setEmailValid] = React.useState<boolean | null>(null)
  const [passwordStrength, setPasswordStrength] = React.useState(0)
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const roles = [
    {
      value: "admin",
      label: "Admin",
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return "👑"
      case "agent":
        return "🛡️"
      case "user":
        return "👤"
      default:
        return "👤"
    }
  }

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-gray-900 text-white dark:bg-white dark:text-black"
      case "agent":
        return "bg-gray-600 text-white dark:bg-gray-400 dark:text-black"
      case "user":
        return "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-white"
      default:
        return "bg-gray-300 text-gray-900"
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
      case "inactive":
        return "bg-gray-400 text-white dark:bg-gray-600 dark:text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

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

  const handleDeleteUser = (userId: string) => {
    setData((prev) => prev.filter((user) => user.id !== userId))
    if (onDeleteUser) {
      onDeleteUser(userId)
    }
    setDeleteUserId(null)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    if (onEditUser) {
      onEditUser(user)
    }
  }

  const handleSaveUser = () => {
    if (!editingUser || !editFormData.firstName || !editFormData.lastName || !editFormData.email) {
      return
    }

    const updatedUser: User = {
      ...editingUser,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      email: editFormData.email,
      role: editFormData.role || editingUser.role,
      status: editFormData.status || editingUser.status,
    }

    setData((prev) => prev.map((user) => (user.id === editingUser.id ? updatedUser : user)))

    setEditingUser(null)
    setEditFormData({})
  }

  const handleAddUserInputChange = (field: keyof UserFormData, value: string) => {
    setAddFormData((prev) => ({
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
      setAddFormData((prev) => ({ ...prev, profileImage: file }))

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

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !addFormData.firstName ||
      !addFormData.lastName ||
      !addFormData.email ||
      !addFormData.password ||
      !addFormData.role
    ) {
      return
    }

    // Check for duplicate email
    const emailExists = data.some((user) => user.email.toLowerCase() === addFormData.email.toLowerCase())
    if (emailExists) {
      alert("A user with this email already exists!")
      return
    }

    // Generate new user ID
    const newUserId = `user_${Date.now()}`

    // Create new user object
    const newUser: User = {
      id: newUserId,
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      email: addFormData.email,
      role: addFormData.role as "admin" | "agent" | "user",
      status: "active",
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    // Add user to the list
    setData((prev) => [newUser, ...prev])

    // Reset form and close modal
    resetAddUserForm()

    if (onAddUser) {
      onAddUser()
    }
  }

  const resetAddUserForm = () => {
    setAddFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      profileImage: null,
    })
    setImagePreview(null)
    setEmailValid(null)
    setPasswordStrength(0)
    setShowPassword(false)
    setShowAddUserForm(false)
  }

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "avatar",
      header: "",
      cell: () => (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "firstName",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 dark:text-gray-100">
          {row.original.firstName} {row.original.lastName}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="text-gray-600 dark:text-gray-400">{row.original.email}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge className={`${getRoleBadgeClass(row.original.role)} border-0`}>
          <span className="mr-1 grayscale">{getRoleIcon(row.original.role)}</span>
          {row.original.role.charAt(0).toUpperCase() + row.original.role.slice(1)}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={`${getStatusBadgeClass(row.original.status)} border-0`}>
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </Badge>
      ),
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-400">{new Date(row.original.lastLogin).toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-400">{new Date(row.original.createdAt).toLocaleDateString()}</div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => handleEditUser(row.original)} className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setDeleteUserId(row.original.id)}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto py-16 px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage system users and their permissions</p>
            </div>
            <Button
              onClick={() => setShowAddUserForm(true)}
              className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 w-80 border-gray-300 dark:border-gray-600"
              />
            </div>
            <Select
              value={(table.getColumn("role")?.getFilterValue() as string) ?? "all"}
              onValueChange={(value) => table.getColumn("role")?.setFilterValue(value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-40 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
              onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-40 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-gray-200 dark:border-gray-700">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-gray-900 dark:text-gray-100 font-semibold">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} user(s)
            selected.
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Label htmlFor="rows-per-page" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="w-20 border-gray-300 dark:border-gray-600" id="rows-per-page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="border-gray-300 dark:border-gray-600"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border-gray-300 dark:border-gray-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="border-gray-300 dark:border-gray-600"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="border-gray-300 dark:border-gray-600"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Add User Form Dialog */}
        <AlertDialog open={showAddUserForm} onOpenChange={resetAddUserForm}>
          <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <UserPlus className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                Add New User
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                Register a new profile in the system with facial recognition capabilities
              </AlertDialogDescription>
            </AlertDialogHeader>

            <form onSubmit={handleAddUserSubmit} className="space-y-6">
              {/* Photo Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  <Camera className="h-4 w-4" />
                  Profile Photo
                </div>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
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
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-800 shadow-lg grayscale"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        onClick={() => {
                          setImagePreview(null)
                          setAddFormData((prev) => ({ ...prev, profileImage: null }))
                        }}
                      >
                        Change Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Drop a photo here</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">or click to select</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="addFirstName" className="text-gray-700 dark:text-gray-300">
                    First Name *
                  </Label>
                  <Input
                    id="addFirstName"
                    value={addFormData.firstName}
                    onChange={(e) => handleAddUserInputChange("firstName", e.target.value)}
                    placeholder="John"
                    className="border-gray-300 dark:border-gray-600"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addLastName" className="text-gray-700 dark:text-gray-300">
                    Last Name *
                  </Label>
                  <Input
                    id="addLastName"
                    value={addFormData.lastName}
                    onChange={(e) => handleAddUserInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                    className="border-gray-300 dark:border-gray-600"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="addEmail" className="text-gray-700 dark:text-gray-300">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="addEmail"
                    type="email"
                    value={addFormData.email}
                    onChange={(e) => handleAddUserInputChange("email", e.target.value)}
                    placeholder="john.doe@company.com"
                    className={`pl-10 border-gray-300 dark:border-gray-600 ${
                      emailValid === false
                        ? "border-red-500"
                        : emailValid === true
                          ? "border-gray-600 dark:border-gray-400"
                          : ""
                    }`}
                    required
                  />
                  {emailValid !== null && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {emailValid ? (
                        <Check className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
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
              <div className="space-y-2">
                <Label htmlFor="addPassword" className="text-gray-700 dark:text-gray-300">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="addPassword"
                    type={showPassword ? "text" : "password"}
                    value={addFormData.password}
                    onChange={(e) => handleAddUserInputChange("password", e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-gray-300 dark:border-gray-600"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                </div>
                {addFormData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="addRole" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role *
                </Label>
                <Select onValueChange={(value) => handleAddUserInputChange("role", value)} value={addFormData.role}>
                  <SelectTrigger className="border-gray-300 dark:border-gray-600">
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

              <AlertDialogFooter className="pt-6">
                <AlertDialogCancel
                  onClick={resetAddUserForm}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create User
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit User Dialog */}
        <AlertDialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-gray-100">Edit User</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                Update user information and permissions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={editFormData.firstName || ""}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={editFormData.lastName || ""}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editFormData.email || ""}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </Label>
                <Select
                  value={editFormData.role || ""}
                  onValueChange={(value) =>
                    setEditFormData((prev) => ({ ...prev, role: value as "admin" | "agent" | "user" }))
                  }
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">👑 Admin</SelectItem>
                    <SelectItem value="agent">🛡️ Agent</SelectItem>
                    <SelectItem value="user">👤 User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </Label>
                <Select
                  value={editFormData.status || ""}
                  onValueChange={(value) =>
                    setEditFormData((prev) => ({ ...prev, status: value as "active" | "inactive" }))
                  }
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setEditingUser(null)
                  setEditFormData({})
                }}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSaveUser}
                className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
              >
                Save Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
          <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-gray-100">Delete User</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                Are you sure you want to delete this user? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
