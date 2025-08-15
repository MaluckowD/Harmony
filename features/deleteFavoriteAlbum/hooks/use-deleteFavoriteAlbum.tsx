'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/shared/store/store';
import { deleteFavoriteAlbumApi } from '../api';

export const useDeleteFavoriteAlbum = (albumId: string) => {
    const queryClient = useQueryClient();
    const userId = useStore((state) => state.userId)

    return useMutation({
        mutationFn: async () => {
            const response = await deleteFavoriteAlbumApi.deleteFavoriteAlbum(userId, albumId)
            return response.data 
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
            queryClient.invalidateQueries({ queryKey: ['userData'] });
        },

        onError: () => {
            
        }

    })
};