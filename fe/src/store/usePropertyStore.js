import { apiGetPropertyTypes } from '@/apis/propertyType'
import { create } from 'zustand'

export const usePropertyStore = create((set) => ({
  propertyTypes: [],
  getPropertyTypes: async (params) => {
    const response = await apiGetPropertyTypes(params)
    if (response.success) {
      set({ propertyTypes: response.propertyTypes })
    } else {
      set({ propertyTypes: [] })
    }
  },
}))
