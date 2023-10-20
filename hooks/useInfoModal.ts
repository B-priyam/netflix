import { create } from "zustand";

export interface ModalStoreInterface{
    movieId?: string;
    isOpen: boolean;
    openModel: (movieid: string) => void;
    closeModel: () => void
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModel: (movieId: string) => set({ isOpen : true, movieId}),
    closeModel: () => set({ isOpen: false, movieId: undefined})
}))

export default useInfoModal