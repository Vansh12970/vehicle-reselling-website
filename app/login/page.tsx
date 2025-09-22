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

// Firebase imports
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function LoginPage() {
  const [userType, setUserType] = useState<"user" | "admin">("user")
  const [email, setEmail] = useState("")
  const [adminId, setAdminId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false) // toggle register/login
  const router = useRouter()

  const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

  const handleUserRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", "user")
      router.push("/")
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Registration failed.")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (userType === "user") {
        if (isRegistering) {
          await handleUserRegister()
        } else {
          await signInWithEmailAndPassword(auth, email, password)
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("userType", "user")
          router.push("/")
        }
      } else {
        if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("userType", "admin")
          router.push("/sell")
        } else {
          setError("Invalid Admin credentials.")
        }
      }
    } catch (err) {
      console.error(err)
      setError("Login failed. Please check your credentials.")
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
          <CardTitle className="thakur-branding text-primary">
            {isRegistering ? "Register" : "Login"} to Thakur Dealings
          </CardTitle>
          <CardDescription>
            Choose account type and {isRegistering ? "register" : "login"}
          </CardDescription>
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

            {/* User Email */}
            {userType === "user" && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            )}

            {/* Admin ID */}
            {userType === "admin" && (
              <div className="space-y-2">
                <Label htmlFor="adminId">Admin ID</Label>
                <Input
                  id="adminId"
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="Enter Admin ID"
                  required
                />
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
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
            </div>

            {/* Error Message */}
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</div>}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? isRegistering
                  ? "Registering..."
                  : "Logging in..."
                : isRegistering
                ? "Register"
                : "Login"}
            </Button>

            {/* Toggle Login/Register */}
            {userType === "user" && (
              <div className="text-sm text-center mt-2">
                {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setIsRegistering(!isRegistering)}
                >
                  {isRegistering ? "Login" : "Register"}
                </button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
