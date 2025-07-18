import { create } from 'zustand'

export const useStore = create((set, get) => ({

    userData: null,
    albums: [],
    tracks: [],
    token: null,
    

}))

