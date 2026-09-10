import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import { useWardrobeStore } from '@store/wardrobeStore'
import { useOutfitStore } from '@store/outfitStore'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'

const Home = () => {
  const { user } = useAuthStore()
  const { items, initializeDemoData: initializeWardrobe } = useWardrobeStore()
  const { outfits, initializeDemoData: initializeOutfits } = useOutfitStore()
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [weather, setWeather] = useState({
    temp: 31,
    condition: 'Sunny',
    location: 'Tiruchirappalli',
  })

  useEffect(() => {
    // Initialize demo data on first load
    if (items.length === 0) {
      initializeWardrobe()
    }
    if (outfits.length === 0) {
      initializeOutfits()
    }
  }, [])

  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning'
    if (currentHour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const recommendedOutfit = outfits.find(o => o.isRecent) || outfits[0]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-8"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-deep-brown">
            {getGreeting()}, {user?.firstName}
          </h1>
          <p className="text-lg text-muted-burgundy mt-2">Let's find you something amazing to wear today.</p>
        </motion.div>

        {/* Weather Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-burgundy uppercase tracking-widest">Today's Weather</p>
              <div className="mt-3 space-y-1">
                <p className="text-4xl font-bold text-deep-brown">{weather.temp}°C</p>
                <p className="text-lg text-muted-burgundy">{weather.condition}</p>
                <p className="text-sm text-soft-gold">{weather.location}</p>
              </div>
            </div>
            <div className="text-6xl">☀️</div>
          </div>
        </motion.div>
      </motion.section>

      {/* Outfit Recommendation */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 md:px-12 py-16"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-4xl font-serif font-bold text-deep-brown mb-2">
            Here's what I'd wear today
          </h2>
          <p className="text-muted-burgundy">Based on the weather, your style, and recent outfits</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Outfit Preview */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={recommendedOutfit?.imageUrl || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop'}
              alt="Recommended Outfit"
              className="w-full h-96 object-cover"
            />
          </motion.div>

          {/* Outfit Details */}
          <motion.div variants={containerVariants} className="space-y-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-serif font-bold text-deep-brown mb-2">
                {recommendedOutfit?.name || 'Minimalist Work'}
              </h3>
              <div className="flex gap-4 flex-wrap">
                <span className="px-4 py-2 bg-warm-beige rounded-full text-sm font-medium text-deep-brown">
                  {recommendedOutfit?.mood || 'Confident'}
                </span>
                <span className="px-4 py-2 bg-warm-beige rounded-full text-sm font-medium text-deep-brown">
                  {recommendedOutfit?.occasion || 'Work'}
                </span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-burgundy leading-relaxed"
            >
              {recommendedOutfit?.description || 'Clean, professional, and effortless. Perfect for a productive day.'}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-3">
              <div className="bg-warm-beige rounded-lg p-4">
                <p className="text-sm text-muted-burgundy uppercase tracking-widest mb-2">Why this?</p>
                <p className="text-deep-brown">
                  I chose this because it's {weather.temp}°C and {weather.condition.toLowerCase()}, you're dressing for work, and you haven't worn this combination recently.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              <Button size="lg" className="flex-1">
                Try It On
              </Button>
              <Button variant="secondary" size="lg" className="flex-1">
                Change Look
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 md:px-12 py-16"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold text-deep-brown mb-8">
          Your Wardrobe at a Glance
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Items', value: items.length },
            { label: 'Favorite Outfits', value: outfits.filter(o => o.isFavorite).length },
            { label: 'Recent Outfits', value: outfits.filter(o => o.isRecent).length },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-sm text-muted-burgundy uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <p className="text-4xl font-serif font-bold text-deep-brown">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 md:px-12 py-16"
      >
        <motion.div
          variants={itemVariants}
          className="bg-warm-beige rounded-lg p-12 text-center space-y-6"
        >
          <h3 className="text-4xl font-serif font-bold text-deep-brown">
            Let's explore your wardrobe
          </h3>
          <p className="text-lg text-muted-burgundy">
            Upload new items, create outfits, and discover your personal style.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="px-8">
              View Wardrobe
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Use AI Stylist
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Home
