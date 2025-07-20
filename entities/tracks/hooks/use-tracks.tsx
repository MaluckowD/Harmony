'use client'
import { useQuery } from '@tanstack/react-query';
import { tracksApi } from '../api';
import { useStore } from '@/shared/store/store';

export const useTracks = () => {
  
    const setTracks = useStore((state) => state.setTracks)
  
    return useQuery({
        queryKey: ['tracks'],
        queryFn: () => {
            const response = tracksApi.getTracks()
            return response
        },
        select: (data) => {
            setTracks(data.data)
        },
    })
};