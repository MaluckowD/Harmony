'use client'

import * as React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Upload, X, Music, Loader2 } from 'lucide-react'
import { useAddTrack } from "../hook"

interface AddTrackModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTrackModal({ isOpen, onClose }: AddTrackModalProps) {
  // const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioPreview, setAudioPreview] = useState<string | null>(null)
  const { mutate: addTrack, isLoading: isUploading } = useAddTrack()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file)
        const url = URL.createObjectURL(file)
        setAudioPreview(url)
      } else {
      }
    }
  }

  const removeAudioFile = () => {
    setAudioFile(null)
    if (audioPreview) {
      URL.revokeObjectURL(audioPreview)
      setAudioPreview(null)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!formData.title || !formData.artist || !audioFile) {
      return
    }

    addTrack(
      { 
        title: formData.title, 
        artist: formData.artist, 
        audioFile: audioFile,
        albumId: 'your-album-id'
      },
      {
        onSuccess: () => {
          setFormData({ title: '', artist: '' })
          setAudioFile(null)
          onClose()
        }
      }
    )
  }

  const handleClose = () => {
    if (!isUploading) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить новый трек</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название трека *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Введите название трека"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="artist">Исполнитель *</Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) => handleInputChange('artist', e.target.value)}
                placeholder="Введите имя исполнителя"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Аудиофайл *</Label>
              {!audioFile ? (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="flex flex-col items-center gap-2">
                    <Music className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground text-center">
                      <label htmlFor="audio-upload" className="cursor-pointer text-primary hover:underline">
                        Нажмите для выбора аудиофайла
                      </label>
                      <p className="mt-1">MP3, WAV, FLAC до 50MB</p>
                    </div>
                    <input
                      id="audio-upload"
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Music className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{audioFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeAudioFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* <div className="space-y-2">
              <Label>Обложка</Label>
              {!imageFile ? (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground text-center">
                      <label htmlFor="image-upload" className="cursor-pointer text-primary hover:underline">
                        Нажмите для выбора изображения
                      </label>
                      <p className="mt-1">JPG, PNG до 10MB</p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  {imagePreview && (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-12 w-12 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{imageFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeImageFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div> */}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isUploading} className="cursor-pointer">
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Добавить трек
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
