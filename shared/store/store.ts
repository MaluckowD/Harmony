import { create } from 'zustand'

export const useStore = create((set, get) => ({

    userData: null,
    albums: [],
    tracks: [],
    token: null,
    setAlbums: (newAlbums) => set({ albums: newAlbums }),
    setTracks: (newTracks) => set({ tracks: newTracks}),

}))

