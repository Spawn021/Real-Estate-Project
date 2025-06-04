import { create } from 'zustand'

export const useModalStore = create((set) => ({
  isShowModal: false,
  contentModal: null,
  setModal: (isShowModal, contentModal) => set(() => ({ isShowModal, contentModal })),
}))
