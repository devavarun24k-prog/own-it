import { create } from 'zustand'

const useStylistStore = create((set, get) => ({
  recommendations: [],
  currentMood: null,
  currentOccasion: null,
  isGenerating: false,
  error: null,

  // Generate outfit recommendation
  generateRecommendation: async (params) => {
    set({ isGenerating: true })
    try {
      // Simulate API call to AI service
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // This will be replaced with real AI service
      const recommendation = {
        id: Math.random().toString(36).substr(2, 9),
        ...params,
        looks: [
          {
            id: '1',
            name: 'Look 1',
            itemIds: [],
            description: 'Coming from AI service',
          },
        ],
        createdAt: new Date(),
      }
      
      const { recommendations } = get()
      set({ recommendations: [recommendation, ...recommendations], isGenerating: false })
      return { success: true, recommendation }
    } catch (error) {
      set({ error: error.message, isGenerating: false })
      return { success: false, error: error.message }
    }
  },

  setMood: (mood) => {
    set({ currentMood: mood })
  },

  setOccasion: (occasion) => {
    set({ currentOccasion: occasion })
  },

  clearError: () => {
    set({ error: null })
  },
}))

export { useStylistStore }
