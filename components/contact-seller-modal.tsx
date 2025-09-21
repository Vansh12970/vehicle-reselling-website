"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, User } from "lucide-react"

interface ContactSellerModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: {
    id: string
    title: string
    price: number
    location: string
    images: string[]
  } | null
}

export function ContactSellerModal({ isOpen, onClose, vehicle }: ContactSellerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Format the message for email
      const subject = `Inquiry about ${vehicle?.title}`
      const body = `Hi,

I'm interested in your ${vehicle?.title} listed for ₹${vehicle?.price?.toLocaleString()}.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

Please get back to me at your earliest convenience.

Best regards,
${formData.name}`

      // Create mailto link
      const mailtoLink = `mailto:vannshitt4188@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      // Open email client
      window.location.href = mailtoLink

      // Reset form and close modal
      setFormData({ name: "", email: "", phone: "", message: "" })
      onClose()
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Error sending message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`
    } else {
      return `₹${price.toLocaleString()}`
    }
  }

  if (!vehicle) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
        </DialogHeader>

        {/* Vehicle Info */}
        <div className="flex space-x-3 p-3 bg-muted rounded-lg mb-4">
          <div className="w-16 h-16 bg-card rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={vehicle.images[0] || "/placeholder.svg"}
              alt={vehicle.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-1">{vehicle.title}</h3>
            <p className="text-primary font-bold">{formatPrice(vehicle.price)}</p>
            <p className="text-xs text-muted-foreground">{vehicle.location}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your name"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Hi, I'm interested in this vehicle. Please provide more details..."
              rows={4}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
