"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"

export interface UploadedImage {
  url: string
  public_id: string
}

interface ImageUploadProps {
  images: UploadedImage[]                 // already uploaded images
  onImagesChange: (images: UploadedImage[]) => void
  maxImages?: number
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [localPreviews, setLocalPreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerFileSelect = () => fileInputRef.current?.click()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Prevent exceeding max images
    if (images.length + files.length > maxImages) {
      setError(`You can upload a maximum of ${maxImages} images`)
      return
    }

    try {
      setUploading(true)

      const newPreviews = files.map(file => URL.createObjectURL(file))
      setLocalPreviews(prev => [...prev, ...newPreviews])

      const uploadedImages: UploadedImage[] = []

      for (const file of files) {
        const fd = new FormData()
        fd.append("file", file)
        fd.append("upload_preset", "thakur-deals")
        fd.append("folder", "vehicles")

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          { method: "POST", body: fd }
        )

        if (!res.ok) throw new Error("Cloudinary upload failed")

        const data = await res.json()
        uploadedImages.push({ url: data.secure_url, public_id: data.public_id })
      }

      // Pass the uploaded images to parent
      onImagesChange([...images, ...uploadedImages])
      setLocalPreviews([])  // clear local previews after upload
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Something went wrong while uploading")
    } finally {
      setUploading(false)
    }

    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeImage = async (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Vehicle Images ({images.length}/{maxImages})
        </label>
        {images.length < maxImages && (
          <Button type="button" variant="outline" size="sm" onClick={triggerFileSelect}>
            <Upload className="h-4 w-4 mr-2" />
            Add Images
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {images.length === 0 ? (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              Upload up to {maxImages} images of your vehicle
            </p>
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
                <img src={image.url || "/placeholder.svg"} alt={`Vehicle image ${index + 1}`} className="w-full h-full object-cover" />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
                disabled={uploading}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
