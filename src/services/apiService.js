/**
 * API Service Configuration
 * This is the central integration point for all API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const API_KEY = import.meta.env.VITE_API_KEY

const createHeaders = () => ({
  'Content-Type': 'application/json',
  ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
})

/**
 * Clothing Analysis Service
 * Analyzes uploaded clothing images and identifies category, color, pattern, etc.
 */
export const clothingAnalysisService = {
  async analyzeImage(file) {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE_URL}/api/analyze-clothing`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}` },
        body: formData,
      })

      if (!response.ok) throw new Error('Analysis failed')
      return await response.json()
    } catch (error) {
      console.error('Clothing analysis error:', error)
      throw error
    }
  },
}

/**
 * AI Stylist Service
 * Generates outfit recommendations based on wardrobe, weather, mood, occasion
 */
export const aiStylistService = {
  async generateRecommendation(params) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/stylist/recommend`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(params),
      })

      if (!response.ok) throw new Error('Recommendation generation failed')
      return await response.json()
    } catch (error) {
      console.error('Stylist recommendation error:', error)
      throw error
    }
  },

  async analyzeInspirationImage(file) {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE_URL}/api/stylist/analyze-inspiration`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}` },
        body: formData,
      })

      if (!response.ok) throw new Error('Inspiration analysis failed')
      return await response.json()
    } catch (error) {
      console.error('Inspiration analysis error:', error)
      throw error
    }
  },
}

/**
 * Virtual Try-On Service
 * Generates preview of outfits on user's avatar
 */
export const virtualTryOnService = {
  async generateTryOn(outfitData, avatarImage) {
    try {
      const formData = new FormData()
      formData.append('outfitData', JSON.stringify(outfitData))
      formData.append('avatar', avatarImage)

      const response = await fetch(`${API_BASE_URL}/api/try-on/generate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}` },
        body: formData,
      })

      if (!response.ok) throw new Error('Try-on generation failed')
      return await response.json()
    } catch (error) {
      console.error('Virtual try-on error:', error)
      throw error
    }
  },
}

/**
 * Shopping Service
 * Integrates with shopping platforms to find and recommend products
 */
export const shoppingService = {
  async searchProducts(query, filters = {}) {
    try {
      const params = new URLSearchParams({ q: query, ...filters })
      const response = await fetch(
        `${API_BASE_URL}/api/shopping/search?${params}`,
        {
          headers: createHeaders(),
        }
      )

      if (!response.ok) throw new Error('Product search failed')
      return await response.json()
    } catch (error) {
      console.error('Shopping search error:', error)
      throw error
    }
  },
}

/**
 * Weather Service
 * Gets current weather for location-based recommendations
 */
export const weatherService = {
  async getWeather(latitude, longitude) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/weather?lat=${latitude}&lon=${longitude}`,
        {
          headers: createHeaders(),
        }
      )

      if (!response.ok) throw new Error('Weather fetch failed')
      return await response.json()
    } catch (error) {
      console.error('Weather service error:', error)
      throw error
    }
  },
}

export { API_BASE_URL }
