import { create } from 'zustand'

const STORAGE_KEY = 'wardrobe_items'

export const useWardrobeStore = create((set) => ({
  items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  
  addItem: (item) => {
    const newItem = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...item,
    }
    set((state) => {
      const updated = [...state.items, newItem]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return { items: updated }
    })
    return newItem
  },
  
  updateItem: (id, updates) => {
    set((state) => {
      const updated = state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return { items: updated }
    })
  },
  
  deleteItem: (id) => {
    set((state) => {
      const updated = state.items.filter((item) => item.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return { items: updated }
    })
  },
  
  getItemsByCategory: (category) => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter(
      (item) => item.category === category
    )
  },
  
  getOutfits: () => {
    return JSON.parse(localStorage.getItem('outfits') || '[]')
  },
  
  addOutfit: (outfit) => {
    const outfits = JSON.parse(localStorage.getItem('outfits') || '[]')
    const newOutfit = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...outfit,
    }
    outfits.push(newOutfit)
    localStorage.setItem('outfits', JSON.stringify(outfits))
    return newOutfit
  },
  
  deleteOutfit: (id) => {
    const outfits = JSON.parse(localStorage.getItem('outfits') || '[]')
    const filtered = outfits.filter((o) => o.id !== id)
    localStorage.setItem('outfits', JSON.stringify(filtered))
  },
}))
