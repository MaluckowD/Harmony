'use client'
import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/shared/store/store';
import { getFavoriteApi } from '../api';

export const useGetFavorites = () => {
  
    const userId = useStore((state) => state.userId)
    const setFavoritesSongs = useStore((state) => state.setFavoritesSongs)
    const setFavoritesAlbums = useStore((state) => state.setFavoritesAlbums)
  
    return useQuery({
        queryKey: ['favorites'],
        queryFn: () => {
            const response = getFavoriteApi.getFavorites(userId)
            return response
        },
        select: (data) => {
            setFavoritesSongs(data.data.favoriteSongs)
            setFavoritesAlbums(data.data.favoriteAlbums)
        },
    })
};