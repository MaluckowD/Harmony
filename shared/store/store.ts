import { create } from 'zustand'
import { iStore } from '../types/types'

export const useStore = create<iStore>((set, get) => ({

    userData: null,
    albums: [],
    tracks: [],
    album: [],
    token: null,
    isPlayerOpen: false,
    openPlayer: () => set({ isPlayerOpen: true }),
    closePlayer: () => set({ isPlayerOpen: false }),
    setAlbums: (newAlbums) => set({ albums: newAlbums }),
    setAlbum: (newAlbum) => set({ album: newAlbum }),
    setTracks: (newTracks) => set({ tracks: newTracks}),

}))

