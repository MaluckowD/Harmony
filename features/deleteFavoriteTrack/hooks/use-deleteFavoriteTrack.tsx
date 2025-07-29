'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/shared/store/store';
import { deleteFavoriteTrackApi } from '../api';

export const useDeleteFavoriteTrack = () => {
    const queryClient = useQueryClient();
    const userId = useStore((state) => state.userId)

    return useMutation({
        mutationFn: async (songId: string) => {
            const response = await deleteFavoriteTrackApi.deleteFavoriteSong(userId, songId)
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