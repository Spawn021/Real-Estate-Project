import { apiGetCurrent, apiGetRoles } from '@/apis/user'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create()(
  persist(
    (set, get) => ({
      token: null,
      current: null,
      roles: [],
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
      getRoles: async () => {
        const response = await apiGetRoles()
        if (response.success) {
          set({ roles: response.roles })
        } else {
          set({ roles: [] })
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
