'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/shared/store/store';
import { addTrackApi } from '../api';
import { apiClient } from '@/shared/api/client';

interface AddTrackParams {
  title: string
  artist: string
  audioFile: File
  albumId: string
}

export const useAddTrack = () => {
  const queryClient = useQueryClient()
  const userId = useStore((state) => state.userId)

  return useMutation({
    mutationFn: async ({ title, artist, audioFile, albumId }: AddTrackParams) => {
      const formData = new FormData()
      formData.append('Title', title)
      formData.append('ArtistName', artist)
      formData.append('File', audioFile)

      const response = await apiClient.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['favorites', userId, variables.albumId] 
      })
      queryClient.invalidateQueries({ queryKey: ['userData'] })
      queryClient.invalidateQueries({ queryKey: ['tracks'] })
    },

    onError: (error: Error) => {
      console.error('Ошибка при добавлении трека:', error)
      // Можно добавить toast-уведомление об ошибке
    }
  })
}