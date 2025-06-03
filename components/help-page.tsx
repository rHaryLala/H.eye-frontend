"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Video,
  Clock,
  ChevronRight,
  ExternalLink,
  Download,
  BookOpen,
  HelpCircle,
  Zap,
  Shield,
  Users,
  Camera,
  Settings,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data
const popularArticles = [
  {
    id: "1",
    title: "Getting Started with Facial Recognition",
    description: "Learn how to set up and use the facial recognition attendance system",
    category: "Getting Started",
    readTime: "5 min",
    rating: 4.8,
    views: 1250,
  },
  {
    id: "2",
    title: "Managing User Accounts",
    description: "Complete guide to adding, editing, and managing user accounts",
    category: "User Management",
    readTime: "8 min",
    rating: 4.6,
    views: 980,
  },
  {
    id: "3",
    title: "Camera Setup and Troubleshooting",
    description: "Resolve common camera issues and optimize recognition accuracy",
    category: "Technical",
    readTime: "6 min",
    rating: 4.7,
    views: 750,
  },
  {
    id: "4",
    title: "Attendance Reports and Analytics",
    description: "Generate and export attendance reports for your organization",
    category: "Reports",
    readTime: "4 min",
    rating: 4.5,
    views: 650,
  },
]

const faqData = [
  {
    question: "How accurate is the facial recognition system?",
    answer:
      "Our facial recognition system achieves 99.5% accuracy under optimal lighting conditions. The system uses advanced AI algorithms and continuously learns to improve recognition rates. For best results, ensure good lighting and position your face clearly in the camera frame.",
  },
  {
    question: "What should I do if the camera doesn't work?",
    answer:
      "First, check that your browser has camera permissions enabled. Go to your browser settings and allow camera access for this website. If the issue persists, try refreshing the page or using a different browser. Make sure no other applications are using your camera.",
  },
  {
    question: "Can I use the system on mobile devices?",
    answer:
      "Yes, the system is fully responsive and works on mobile devices. However, for best facial recognition accuracy, we recommend using a device with a high-quality front-facing camera and ensuring stable internet connectivity.",
  },
  {
    question: "How do I add new users to the system?",
    answer:
      "Navigate to the User Management section, click 'Add User', fill in the required information including name, email, role, and upload a clear profile photo. The system will automatically process the facial data for recognition.",
  },
  {
    question: "What happens if someone is not recognized?",
    answer:
      "If facial recognition fails, the system will prompt the user to try again. After multiple failed attempts, the system can be configured to allow manual check-in with supervisor approval or alternative authentication methods.",
  },
  {
    question: "How is my biometric data protected?",
    answer:
      "All biometric data is encrypted using industry-standard AES-256 encryption and stored securely. We comply with GDPR and other privacy regulations. Facial templates are hashed and cannot be reverse-engineered to recreate the original image.",
  },
]

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7",
    responseTime: "< 2 minutes",
    action: "Start Chat",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with a technical expert",
    availability: "Mon-Fri 9AM-6PM",
    responseTime: "Immediate",
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send detailed questions and get comprehensive answers",
    availability: "24/7",
    responseTime: "< 4 hours",
    action: "Send Email",
  },
  {
    icon: Video,
    title: "Screen Share",
    description: "Get personalized assistance with screen sharing",
    availability: "Mon-Fri 9AM-6PM",
    responseTime: "Schedule",
    action: "Book Session",
  },
]

const quickActions = [
  {
    icon: Camera,
    title: "Camera Issues",
    description: "Troubleshoot camera and recognition problems",
    category: "Technical",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Learn how to add and manage users",
    category: "Getting Started",
  },
  {
    icon: Settings,
    title: "System Settings",
    description: "Configure system preferences and security",
    category: "Configuration",
  },
  {
    icon: FileText,
    title: "Reports",
    description: "Generate and export attendance reports",
    category: "Reports",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Understand privacy and security features",
    category: "Security",
  },
  {
    icon: Zap,
    title: "API Integration",
    description: "Integrate with external systems",
    category: "Advanced",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
    priority: "medium",
  })
  const [showContactDialog, setShowContactDialog] = useState(false)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    setShowContactDialog(false)
    // Here you would send the form data to your backend
  }

  const filteredArticles = popularArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || article.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-800 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-6">
            How can we help?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Find answers, get support, and learn how to make the most of your facial recognition attendance system
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for help articles, guides, and FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quick Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <action.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{action.description}</p>
                      <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-0">
                        {action.category}
                      </Badge>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Popular Articles */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Popular Articles
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Most helpful guides and tutorials
                    </CardDescription>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[200px] border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="getting started">Getting Started</SelectItem>
                      <SelectItem value="user management">User Management</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="reports">Reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{article.title}</h3>
                          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-0">
                            {article.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{article.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current" />
                            {article.rating}
                          </div>
                          <div>{article.views} views</div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))}

                {filteredArticles.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No articles found matching your search criteria.
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View All Articles
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-gray-200 dark:border-gray-700">
                      <AccordionTrigger className="text-left text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Was this helpful?</span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Contact Support</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Get personalized help from our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportChannels.map((channel, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <channel.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{channel.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{channel.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{channel.availability}</span>
                          <span>{channel.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Us
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-gray-100">Contact Support</DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Send us a message and we'll get back to you as soon as possible.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="border-gray-300 dark:border-gray-600"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="border-gray-300 dark:border-gray-600"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="border-gray-300 dark:border-gray-600"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={contactForm.category}
                            onValueChange={(value) => setContactForm({ ...contactForm, category: value })}
                          >
                            <SelectTrigger className="border-gray-300 dark:border-gray-600">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technical">Technical Issue</SelectItem>
                              <SelectItem value="account">Account Help</SelectItem>
                              <SelectItem value="billing">Billing Question</SelectItem>
                              <SelectItem value="feature">Feature Request</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select
                            value={contactForm.priority}
                            onValueChange={(value) => setContactForm({ ...contactForm, priority: value })}
                          >
                            <SelectTrigger className="border-gray-300 dark:border-gray-600">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Describe your issue or question in detail..."
                          className="min-h-[100px] border-gray-300 dark:border-gray-600"
                          required
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowContactDialog(false)}
                          className="border-gray-300 dark:border-gray-600"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Resources</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Additional help and documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2" />
                  User Manual
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300">
                  <Video className="h-4 w-4 mr-2" />
                  Video Tutorials
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300">
                  <Download className="h-4 w-4 mr-2" />
                  Mobile App
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  API Documentation
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Facial Recognition API</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0">
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Database</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0">
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">File Storage</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0">
                    Operational
                  </Badge>
                </div>
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300">
                  View Status Page
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
