import { create } from 'zustand'

const useOutfitStore = create((set, get) => ({
  outfits: [],
  favorites: [],
  recentOutfits: [],
  isLoading: false,
  error: null,

  // Initialize with demo data
  initializeDemoData: (demoOutfits) => {
    set({
      outfits: demoOutfits,
      favorites: demoOutfits.filter(o => o.isFavorite),
      recentOutfits: demoOutfits.filter(o => o.isRecent),
    })
  },

  // Create outfit
  createOutfit: async (outfitData) => {
    set({ isLoading: true })
    try {
      const newOutfit = {
        id: Math.random().toString(36).substr(2, 9),
        ...outfitData,
        isFavorite: false,
        isRecent: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      const { outfits } = get()
      set({ outfits: [newOutfit, ...outfits], isLoading: false })
      return { success: true, outfit: newOutfit }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  // Save outfit as favorite
  toggleFavorite: (outfitId) => {
    const { outfits } = get()
    const updatedOutfits = outfits.map(outfit =>
      outfit.id === outfitId
        ? { ...outfit, isFavorite: !outfit.isFavorite }
        : outfit
    )
    set({ outfits: updatedOutfits })
  },

  // Mark outfit as worn
  markAsWorn: (outfitId) => {
    const { outfits } = get()
    const updatedOutfits = outfits.map(outfit =>
      outfit.id === outfitId
        ? { ...outfit, isRecent: true, updatedAt: new Date() }
        : outfit
    )
    set({ outfits: updatedOutfits })
  },

  // Delete outfit
  deleteOutfit: (outfitId) => {
    const { outfits } = get()
    set({ outfits: outfits.filter(outfit => outfit.id !== outfitId) })
  },

  clearError: () => {
    set({ error: null })
  },
}))

export { useOutfitStore }
