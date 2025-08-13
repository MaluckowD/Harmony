'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTrackApi } from '../api';

interface AddTrackParams {
  title: string
  artist: string
  audioFile: File
  albumId: string
}

export const useAddTrack = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ title, artist, audioFile, albumId }: AddTrackParams) => {
      const formData = new FormData()
      formData.append('Title', title)
      formData.append('ArtistName', artist)
      formData.append('File', audioFile)

      const response = await addTrackApi.addTrack(formData)
      return response.data
    },

    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] })
    },

    onError: (error: Error) => {
      console.error('Ошибка при добавлении трека:', error)
    }
  })
}