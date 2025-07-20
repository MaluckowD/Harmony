'use client'
import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/shared/store/store';
import { albumApi } from '../api/api';

export const useAlbum = (id: string) => {
  
    const setAlbum = useStore((state) => state.setAlbum)
  
    return useQuery({
        queryKey: ['albums', id],
        queryFn: () => {
            const response = albumApi.getAlbumById(id)
            return response
        },
        select: (data) => {
            setAlbum(data.data)
        },
    })
};