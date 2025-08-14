import { useStore } from "@/shared/store/store";
import { deleteCookie } from 'cookies-next'

export const useLogout = () => {

const setIsAuth = useStore((state) => state.setIsAuth)

const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false)
    deleteCookie('token', { 
        path: '/', 
    })
  };

  return { logout };
};