import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, User } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/thakur-dealings-logo.jpg"
                  alt="Thakur Dealings Logo"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="font-bold text-xl text-primary">Thakur Dealings</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for buying and selling quality vehicles. 100% verified vehicles with complete
              documentation and customer satisfaction guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/buy-car"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Buy Car
              </Link>
              <Link
                href="/buy-bike"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Buy Bike
              </Link>
              <Link
                href="/favorites"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Favorites
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                24/7 Customer Support
              </Link>
              <Link href="/help" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info & Founder */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:thakurdealings@gmail.com" className="hover:text-primary transition-colors">
                  thakurdealings@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                <a 
                  href="tel:+919805807001" 
                  className="hover:text-primary transition-colors"
                >
                  +91 9805807001
             </a>
              </div>

              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Chandigarh, India</span>
              </div>
            </div>

            {/* Founder Section */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Founder</p>
                  <p className="text-muted-foreground">Vanshit Thakur</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <a href="https://www.facebook.com/share/17GVEq2NDi/?mibextid=wwXIfr" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5"  />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/thakurdealings.official?igsh=cHBsMnlrZjV2emY5&utm_source=qr" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

    {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">© 2024 Thakur Dealings. All rights reserved.</p>

          <div className="flex items-center justify-center space-x-2 text-sm">
            <User className="h-4 w-4 text-primary" />
            <span>Developed by</span>
            <a
              href="https://www.linkedin.com/in/itsme-vansh"
              target="_blank"
              className="text-primary font-medium hover:underline"
            >
              Vansh Pratap Singh
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
