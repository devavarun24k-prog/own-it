import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'

const Landing = () => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-ivory to-cream overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-deep-brown">OWN IT</h1>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-2 text-deep-brown font-medium hover:text-muted-burgundy transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-deep-brown text-cream rounded-lg font-medium hover:bg-muted-burgundy transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.p
                variants={itemVariants}
                className="text-sm md:text-base font-medium text-soft-gold uppercase tracking-widest mb-4"
              >
                Personal Fashion AI
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-deep-brown leading-tight mb-6"
              >
                Make It Yours.
              </motion.h2>
            </div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-xl md:text-2xl text-deep-brown font-medium leading-relaxed">
                You don't need a new wardrobe.
              </p>
              <p className="text-xl md:text-2xl text-muted-burgundy leading-relaxed">
                You need a new way to see the wardrobe you already own.
              </p>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-muted-burgundy leading-relaxed">
              OWN IT is your personal AI stylist. Discover endless outfit combinations from the clothes you already have. Style with confidence. Shop with intention.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-deep-brown text-cream rounded-lg font-semibold hover:bg-muted-burgundy transition-all duration-300 text-lg"
              >
                Enter OWN IT
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-deep-brown text-deep-brown rounded-lg font-semibold hover:bg-cream transition-all duration-300 text-lg"
              >
                Already a member?
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1609428736166-4c3f4badbe23?w=600&h=600&fit=crop"
                alt="Fashion"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif font-bold text-deep-brown text-center mb-16"
        >
          Your Wardrobe. Your Style. Your Story.
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🔍',
              title: 'Discover',
              description: 'Create outfits from clothes you already own.',
            },
            {
              icon: '✨',
              title: 'Personalize',
              description: 'AI learns your style, mood, and preferences.',
            },
            {
              icon: '🌍',
              title: 'Sustain',
              description: 'Reduce waste. Shop intentionally.',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center space-y-4 p-8 rounded-lg bg-white hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h4 className="text-2xl font-serif font-bold text-deep-brown">
                {feature.title}
              </h4>
              <p className="text-muted-burgundy leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-8 bg-warm-beige rounded-2xl p-12 md:p-16"
        >
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-deep-brown">
            Ready to own your style?
          </h3>
          <p className="text-xl text-muted-burgundy max-w-2xl mx-auto">
            Join thousands of people creating amazing outfits from their existing wardrobe.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-deep-brown text-cream rounded-lg font-semibold hover:bg-muted-burgundy transition-all duration-300 text-lg"
          >
            Get Started Free
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-warm-beige mt-20 py-8 px-6 md:px-12 text-center text-muted-burgundy">
        <p>&copy; 2024 OWN IT. Make It Yours.</p>
      </footer>
    </div>
  )
}

export default Landing
