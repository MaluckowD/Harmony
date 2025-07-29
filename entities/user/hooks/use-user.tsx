'use client'
import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/shared/store/store';
import { userApi } from '../api';

export const useUser = () => {
  
    const setUserId = useStore((state) => state.setUserId)
    const setUserName = useStore((state) => state.setUserName)
  
    return useQuery({
        queryKey: ['userData'],
        queryFn: () => {
            const response = userApi.getUserData()
            return response
        },
        select: (data) => {
            setUserId(data.data.id)
            setUserName(data.data.name)
        },
    })
};