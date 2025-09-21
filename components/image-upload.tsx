"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      if (file.type.startsWith("image/") && images.length < maxImages) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          if (imageUrl && !images.includes(imageUrl)) {
            onImagesChange([...images, imageUrl])
          }
        }
        reader.readAsDataURL(file)
      }
    })

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Vehicle Images ({images.length}/{maxImages})
        </label>
        {images.length < maxImages && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={triggerFileSelect}
            className="flex items-center space-x-2 bg-transparent"
          >
            <Upload className="h-4 w-4" />
            <span>Add Images</span>
          </Button>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />

      {images.length === 0 ? (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">Upload up to {maxImages} images of your vehicle</p>
            <Button type="button" variant="outline" onClick={triggerFileSelect}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Images
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Vehicle image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {images.length < maxImages && (
            <Card
              className="aspect-square border-dashed border-2 border-muted-foreground/25 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={triggerFileSelect}
            >
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Add More</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
