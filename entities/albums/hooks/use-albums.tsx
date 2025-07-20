'use client'
import { useQuery } from '@tanstack/react-query';
import { albumsApi } from '../api';
import { useStore } from '@/shared/store/store';

export const useAlbums = () => {
  
  const setAlbums = useStore((state) => state.setAlbums)
  
  return useQuery({
    queryKey: ['albums'],
    queryFn: () => {
        const response = albumsApi.getAlbums()
        return response
    },
    select: (data) => {
        setAlbums(data.data)
    },
  })
};