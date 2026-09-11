import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAIStore } from '../store/aiStore'
import ChatMessage from '../components/ChatMessage'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AIAssistant() {
  const { messages, addMessage, setLoading, loading, clearChat } = useAIStore()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    addMessage('user', inputValue)
    setInputValue('')
    setLoading(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on fashion trends, I'd suggest...",
        "I love that idea! Here are some styling tips for you:",
        "Absolutely! Let me help you create the perfect outfit. Consider pairing...",
        "Great choice! This style works well with...",
        "I have some wonderful recommendations for you!",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      addMessage('assistant', randomResponse)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
      <div className="max-w-3xl mx-auto h-[calc(100vh-200px)] flex flex-col rounded-2xl overflow-hidden card-shadow bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Fashion Stylist</h1>
              <p className="text-amber-100">Get personalized outfit recommendations and styling tips</p>
            </div>
            <button
              onClick={clearChat}
              className="px-4 py-2 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <div className="text-6xl mb-4">👗</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to Your AI Fashion Stylist!
              </h2>
              <p className="text-gray-600 max-w-sm">
                Ask me anything about fashion, outfit combinations, styling tips, or wardrobe management.
              </p>
            </motion.div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isUser={message.role === 'user'}
                />
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-300 px-4 py-3 rounded-lg">
                    <LoadingSpinner />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me about fashion, outfits, styling tips..."
              className="input-field flex-1"
              disabled={loading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  )
}