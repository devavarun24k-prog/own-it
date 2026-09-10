import { create } from 'zustand'

const useEventsStore = create((set, get) => ({
  events: [],
  isLoading: false,
  error: null,

  // Create event
  createEvent: async (eventData) => {
    set({ isLoading: true })
    try {
      const newEvent = {
        id: Math.random().toString(36).substr(2, 9),
        ...eventData,
        attendees: [eventData.organizerId],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      const { events } = get()
      set({ events: [newEvent, ...events], isLoading: false })
      return { success: true, event: newEvent }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  // Update event
  updateEvent: async (eventId, updates) => {
    try {
      const { events } = get()
      const updatedEvents = events.map(event =>
        event.id === eventId
          ? { ...event, ...updates, updatedAt: new Date() }
          : event
      )
      set({ events: updatedEvents })
      return { success: true }
    } catch (error) {
      set({ error: error.message })
      return { success: false, error: error.message }
    }
  },

  // Delete event
  deleteEvent: (eventId) => {
    const { events } = get()
    set({ events: events.filter(event => event.id !== eventId) })
  },

  clearError: () => {
    set({ error: null })
  },
}))

export { useEventsStore }
