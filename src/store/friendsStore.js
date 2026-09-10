import { create } from 'zustand'

const useFriendsStore = create((set, get) => ({
  friends: [],
  pendingRequests: [],
  isLoading: false,
  error: null,

  // Add friend
  addFriend: async (friendData) => {
    set({ isLoading: true })
    try {
      const newFriend = {
        id: Math.random().toString(36).substr(2, 9),
        ...friendData,
        addedAt: new Date(),
      }
      
      const { friends } = get()
      set({ friends: [newFriend, ...friends], isLoading: false })
      return { success: true, friend: newFriend }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  // Remove friend
  removeFriend: (friendId) => {
    const { friends } = get()
    set({ friends: friends.filter(friend => friend.id !== friendId) })
  },

  // Send friend request
  sendRequest: async (recipientEmail) => {
    set({ isLoading: true })
    try {
      const newRequest = {
        id: Math.random().toString(36).substr(2, 9),
        recipientEmail,
        status: 'pending',
        createdAt: new Date(),
      }
      
      const { pendingRequests } = get()
      set({ pendingRequests: [newRequest, ...pendingRequests], isLoading: false })
      return { success: true, request: newRequest }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))

export { useFriendsStore }
