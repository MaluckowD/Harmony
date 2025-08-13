'use client'
import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/shared/store/store';
import { getAuthorApi } from '../api';

export const useGetAuthor = (id: string) => {
  
    const setAuthorData = useStore((state) => state.setAuthorData)
  
    return useQuery({
        queryKey: ['author', id],
        queryFn: () => {
            const response = getAuthorApi.getAuthor(id)
            return response
        },
        select: (data) => {
            setAuthorData(data.data)
        },
    })
};