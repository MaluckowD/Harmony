'use client'

import * as React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Upload, X, Music, ImageIcon, Loader2 } from 'lucide-react'
import axios from "axios"
import { apiClient } from "../api/client"

interface AddTrackModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTrackModal({ isOpen, onClose }: AddTrackModalProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    year: '',
    description: ''
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [audioPreview, setAudioPreview] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

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

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file)
        const url = URL.createObjectURL(file)
        setImagePreview(url)
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

  const removeImageFile = () => {
    setImageFile(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
      setImagePreview(null)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!formData.title || !formData.artist || !audioFile) {
      return
    }

    setIsUploading(true)

    try {
      const submitData = new FormData()
      // Используем имена полей, которые ожидает сервер
      submitData.append('Title', formData.title) // Заметье: 'Title' с большой буквы
      submitData.append('ArtistName', formData.artist) // 'ArtistName' вместо 'artist'
      submitData.append('File', audioFile) // 'File' вместо 'audioFile'
      
      if (imageFile) {
        // Если сервер принимает изображение, уточните правильное имя поля
        submitData.append('ImageFile', imageFile)
      }

      const response = await apiClient.post('/api/upload', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Обработка успешного ответа
      setFormData({
        title: '',
        artist: '',
        album: '',
        genre: '',
        year: '',
        description: ''
      })
      removeAudioFile()
      removeImageFile()
      onClose()

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ошибка при загрузке трека:', error.response?.data)
        // Можно показать пользователю сообщение об ошибке
      } else {
        console.error('Неизвестная ошибка:', error)
      }
    } finally {
      setIsUploading(false)
    }
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="album">Альбом</Label>
              <Input
                id="album"
                value={formData.album}
                onChange={(e) => handleInputChange('album', e.target.value)}
                placeholder="Введите название альбома"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Год</Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max="2030"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                placeholder="2024"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Жанр</Label>
            <Select value={formData.genre} onValueChange={(value) => handleInputChange('genre', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите жанр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pop">Поп</SelectItem>
                <SelectItem value="rock">Рок</SelectItem>
                <SelectItem value="hip-hop">Хип-хоп</SelectItem>
                <SelectItem value="electronic">Электронная</SelectItem>
                <SelectItem value="jazz">Джаз</SelectItem>
                <SelectItem value="classical">Классическая</SelectItem>
                <SelectItem value="folk">Фолк</SelectItem>
                <SelectItem value="other">Другое</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Добавьте описание трека (необязательно)"
              rows={3}
            />
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

            <div className="space-y-2">
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
            </div>
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
            <Button type="submit" disabled={isUploading}>
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
