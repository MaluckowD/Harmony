'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/shared/store/store';
import { addFavoriteAlbumApi } from '../api';

export const useAddFavoriteAlbums = (albumId: string) => {
    const queryClient = useQueryClient();
    const userId = useStore((state) => state.userId)

    return useMutation({
        mutationFn: async () => {
            const response = await addFavoriteAlbumApi.addFavoriteAlbum(userId, albumId)
            return response.data 
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites', userId, albumId] });
            queryClient.invalidateQueries({ queryKey: ['userData'] });
        },

        onError: () => {
            
        }

    })
};