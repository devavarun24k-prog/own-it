import { create } from 'zustand'

const CHAT_STORAGE_KEY = 'ai_chat_history'

export const useAIStore = create((set) => ({
  messages: JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]'),
  loading: false,
  error: null,
  
  addMessage: (role, content) => {
    const message = {
      id: Date.now(),
      role,
      content,
      timestamp: new Date().toISOString(),
    }
    set((state) => {
      const updated = [...state.messages, message]
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updated))
      return { messages: updated }
    })
    return message
  },
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  clearChat: () => {
    set({ messages: [], error: null })
    localStorage.removeItem(CHAT_STORAGE_KEY)
  },
  
  getSystemPrompt: () => {
    return `You are OWN IT, an AI fashion stylist assistant. Help users build and style their personal wardrobe. 
    Provide personalized outfit recommendations, styling tips, and fashion advice.
    Be encouraging, trendy, and consider user preferences and current fashion trends.
    Keep responses concise and actionable.`
  },
}))
