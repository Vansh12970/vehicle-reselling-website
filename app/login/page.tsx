"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User, Shield, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [userType, setUserType] = useState<"user" | "admin">("user")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple password validation
    const validPasswords = {
      user: "user123",
      admin: "admin123",
    }

    if (password === validPasswords[userType]) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", userType)

      // Redirect based on user type
      if (userType === "admin") {
        router.push("/sell")
      } else {
        router.push("/")
      }
    } else {
      setError("Invalid password. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16">
              <Image
                src="/thakur-dealings-logo.jpg"
                alt="Thakur Dealings Logo"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
          <CardTitle className="thakur-branding text-primary">Login to Thakur Dealings</CardTitle>
          <CardDescription>Choose your account type and enter your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Label>Account Type</Label>
              <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "user" | "admin")}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="flex items-center space-x-2 cursor-pointer flex-1">
                    <User className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">User Account</div>
                      <div className="text-sm text-muted-foreground">Browse and buy vehicles</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="flex items-center space-x-2 cursor-pointer flex-1">
                    <Shield className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Admin Account</div>
                      <div className="text-sm text-muted-foreground">Manage vehicle listings</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={`Enter ${userType} password`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">Demo passwords: User - "user123", Admin - "admin123" </div>
            </div>

            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
