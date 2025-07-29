'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/shared/store/store';
import { addFavoriteTrackApi } from '../api';

export const useAddFavoriteTrack = () => {
    const queryClient = useQueryClient();
    const userId = useStore((state) => state.userId)

    return useMutation({
        mutationFn: async (songId: string) => {
            const response = await addFavoriteTrackApi.addFavoriteSong(userId, songId)
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