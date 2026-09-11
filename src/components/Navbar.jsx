import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '../store/userStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useUserStore()

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Wardrobe', path: '/wardrobe' },
    { name: 'AI Stylist', path: '/ai-assistant' },
    { name: 'Recommendations', path: '/recommendations' },
  ]

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-2xl font-bold gradient-text">OWN IT</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-amber-600 transition font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-amber-600"
            >
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 font-bold">👤</span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded hover:bg-amber-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-4 py-2 text-gray-700 hover:bg-amber-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-amber-50 rounded"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  )
}