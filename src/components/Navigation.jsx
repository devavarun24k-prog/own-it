import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { motion } from 'framer-motion'

const Navigation = ({ children }) => {
  const location = useLocation()
  const { logout } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/wardrobe', label: 'Wardrobe', icon: '👗' },
    { path: '/stylist', label: 'Stylist', icon: '✨' },
    { path: '/try-on', label: 'Try On', icon: '👤' },
    { path: '/inspiration', label: 'Inspiration', icon: '📌' },
    { path: '/friends', label: 'Friends', icon: '👥' },
    { path: '/events', label: 'Events', icon: '🎉' },
    { path: '/sustainability', label: 'Sustainability', icon: '🌱' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-deep-brown">OWN IT</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.slice(0, 4).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-deep-brown border-b-2 border-soft-gold'
                      : 'text-muted-burgundy hover:text-deep-brown'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="text-sm font-medium text-muted-burgundy hover:text-deep-brown transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-muted-burgundy hover:text-deep-brown transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pb-4 border-t border-warm-beige"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block py-2 text-sm font-medium text-muted-burgundy hover:text-deep-brown"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}

export default Navigation
