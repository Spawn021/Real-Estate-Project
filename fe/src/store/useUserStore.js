import { apiGetCurrent } from '@/apis/user'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create()(
  persist(
    (set, get) => ({
      token: null,
      current: null,
      setToken: (token) => set({ token }),
      setCurrent: (current) => set({ current }),
      getCurrent: async () => {
        const response = await apiGetCurrent()
        if (response.success) {
          set({ current: response.currentUser })
        } else {
          set({ current: null })
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        current: state.current,
      }),
    },
  ),
)
