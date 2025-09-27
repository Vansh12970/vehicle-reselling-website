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
import { auth, db } from "@/lib/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"

export default function LoginPage() {
  const [userType, setUserType] = useState<"user" | "admin">("user")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [contact, setContact] = useState("")
  const [adminId, setAdminId] = useState("") // Admin UID field
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const router = useRouter()

  const handleUserRegister = async () => {
  try {
    //console.log("Registering user with:", { email, password, contact })
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    //console.log("User created successfully:", user.uid)

    // Save user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email,
      contact,
      createdAt: new Date()
    })
    console.log("User data saved to Firestore")

    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userType", "user")
    router.push("/")
  } catch (err: any) {
    console.error("Registration error:", err)
    setError(err.message || "Registration failed.")
  }
}


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (userType === "user") {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userType", "user")
        router.push("/")
        return
      }

      if (userType === "admin") {
        const adminDoc = await getDoc(doc(db, "admins", user.uid))
        if (adminDoc.exists()) {
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("userType", "admin")
          router.push("/sell")
        } else {
          await auth.signOut()
          setError("You are not authorized as admin.")
        }
      }

    } catch (err: any) {
      console.error(err)
      setError(err.message || "Login failed. Check your credentials.")
    } finally {
      setIsLoading(false)
    }
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
            {isRegistering && userType === "user" ? "Register" : "Login"} to Thakur Dealings
          </CardTitle>
          <CardDescription>
            Choose account type and {isRegistering && userType === "user" ? "register" : "login"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
  onSubmit={(e) => {
    e.preventDefault()
    console.log("Form submitted", { isRegistering, userType, email, password, contact })
    if (isRegistering && userType === "user") {
      console.log("Calling handleUserRegister")
      handleUserRegister()
    } else {
      console.log("Calling handleLogin")
      handleLogin(e)
    }
  }}
  className="space-y-6"
>
            {/* Account Type */}
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

            {/* Email */}
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

            {/* Contact Number - only on registration */}
            {isRegistering && userType === "user" && (
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your contact number"
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

            {/* Error */}
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</div>}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? isRegistering && userType === "user"
                  ? "Registering..."
                  : "Logging in..."
                : isRegistering && userType === "user"
                ? "Register"
                : "Login"}
            </Button>

            {/* Register toggle (only for user) */}
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
