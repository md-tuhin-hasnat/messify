'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ProfilePhotoUpload } from '@/components/custom/profile/profile-photo-upload'
import { PasswordChangeForm } from '@/components/custom/profile/password-change-form'

export default function ProfilePage() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [profilePhoto, setProfilePhoto] = useState('/placeholder.svg')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    // TODO: Implement profile update logic
    // console.log('Profile updated:', { name, email })
  }

  return (
    (<div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-medium">Profile Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile information here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profilePhoto} alt={name} />
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <ProfilePhotoUpload onPhotoChange={setProfilePhoto} />
          </div>
          <form onSubmit={handleProfileUpdate}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={handleNameChange} />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} disabled />
            </div>
            <Button type="submit" className="mt-4">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
      <Separator className="my-8" />
      <Card className="border-red-300">
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
          <CardDescription>Be careful with actions in this section.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Changing your password will log you out of all devices. Proceed with caution.
            </AlertDescription>
          </Alert>
          <PasswordChangeForm />
        </CardContent>
      </Card>
    </div>)
  );
}

