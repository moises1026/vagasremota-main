import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useToast } from "@/hooks/useToast"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@vagasremota.com",
    description: "Get in touch with our team",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Call us during business hours",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Remote Street, Digital City",
    description: "Our virtual office location",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon-Fri: 9am-6pm EST",
    description: "Available for support",
  },
]

export default function Contact() {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: Implement contact form submission
      showToast("Message sent successfully!", "success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      showToast("Failed to send message", "error")
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll
          respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactInfo.map((info) => (
            <Card key={info.title}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <info.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </div>
                <CardDescription>{info.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{info.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Your message..."
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>How do I post a job?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To post a job, you'll need to create a company account and choose a
                subscription plan. Once set up, you can create and manage job
                postings through your dashboard.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How do I apply for jobs?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create a candidate profile, complete your resume, and start
                applying to jobs that match your skills and preferences. You can
                track your applications in your dashboard.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What payment methods do you accept?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and bank transfers for
                enterprise plans. All payments are processed securely through our
                payment partners.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How do I contact support?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You can reach our support team through the contact form above,
                email, or phone during business hours. We typically respond within
                24 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 