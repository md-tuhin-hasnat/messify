import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProfilePhotoUpload({
  onPhotoChange
}) {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    // TODO: Implement actual file upload logic
    // For now, we'll just use a placeholder URL
    const fakeUploadedUrl = '/placeholder.svg'
    onPhotoChange(fakeUploadedUrl)

    // Reset selected file
    setSelectedFile(null)
  }

  return (
    (<div className="space-y-2">
      <Label htmlFor="profile-photo">Profile Photo</Label>
      <Input
        id="profile-photo"
        type="file"
        onChange={handleFileChange}
        accept="image/*" />
      <Button onClick={handleUpload} disabled={!selectedFile}>
        Upload New Photo
      </Button>
    </div>)
  );
}

