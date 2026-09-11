import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import { MOODS, OCCASIONS, SEASONS } from '@types/index'

const Onboarding = () => {
  const navigate = useNavigate()
  const { user, updateProfile, isLoading } = useAuthStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    avatar: null,
    style: '',
    colors: [],
    aesthetic: '',
    bodyShape: '',
  })

  useEffect(() => {
    if (user?.profile?.onboardingComplete) {
      navigate('/home')
    }
  }, [user, navigate])

  const handleColorToggle = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color],
    }))
  }

  const handleNext = async () => {
    if (step === 4) {
      const result = await updateProfile({
        ...formData,
        onboardingComplete: true,
      })
      if (result.success) {
        navigate('/home')
      }
    } else {
      setStep(step + 1)
    }
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const colors = ['cream', 'olive', 'soft-gold', 'muted-burgundy', 'deep-brown', 'soft-peach']
  const aesthetics = ['minimalist', 'elegant', 'bold', 'romantic', 'edgy', 'casual']

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-ivory flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <motion.div
                key={s}
                className={`h-2 flex-1 mx-2 rounded-full transition-colors ${
                  s <= step ? 'bg-soft-gold' : 'bg-warm-beige'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-burgundy">Step {step} of 4</p>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-brown">
                Welcome to OWN IT
              </h1>
              <p className="text-xl text-muted-burgundy">
                Let's set up your personal style profile
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 space-y-2">
                <p className="font-semibold text-deep-brown">✨ Personalized Recommendations</p>
                <p className="text-sm text-muted-burgundy">Get outfit suggestions tailored to your style</p>
              </div>
              <div className="bg-white rounded-lg p-6 space-y-2">
                <p className="font-semibold text-deep-brown">🎯 Smart Matching</p>
                <p className="text-sm text-muted-burgundy">AI learns what works for you</p>
              </div>
              <div className="bg-white rounded-lg p-6 space-y-2">
                <p className="font-semibold text-deep-brown">💚 Sustainable Fashion</p>
                <p className="text-sm text-muted-burgundy">Make the most of what you own</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Style Preference */}
        {step === 2 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-deep-brown">What's your style?</h2>
              <p className="text-muted-burgundy">Choose the aesthetic that resonates with you</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aesthetics.map((aesthetic) => (
                <motion.button
                  key={aesthetic}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData(prev => ({ ...prev, aesthetic }))}
                  className={`p-4 rounded-lg font-semibold capitalize transition-all ${
                    formData.aesthetic === aesthetic
                      ? 'bg-soft-gold text-deep-brown'
                      : 'bg-warm-beige text-deep-brown hover:bg-beige'
                  }`}
                >
                  {aesthetic}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Favorite Colors */}
        {step === 3 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-deep-brown">Your Color Palette</h2>
              <p className="text-muted-burgundy">Select colors you love (choose at least 2)</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleColorToggle(color)}
                  className={`p-8 rounded-lg font-semibold capitalize transition-all border-2 ${
                    formData.colors.includes(color)
                      ? 'border-soft-gold scale-105'
                      : 'border-transparent'
                  }`}
                  style={{
                    backgroundColor: color === 'cream' ? '#FFFBF5' : color === 'olive' ? '#6B7F5C' : color === 'soft-gold' ? '#D4AF85' : color === 'muted-burgundy' ? '#8B5A5A' : color === 'deep-brown' ? '#3D2817' : '#F5D5C8',
                  }}
                >
                  {formData.colors.includes(color) && '✓'}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Body Shape */}
        {step === 4 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-deep-brown">Body Shape (Optional)</h2>
              <p className="text-muted-burgundy">This helps us suggest flattering styles</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['pear', 'apple', 'hourglass', 'rectangle', 'inverted-triangle', 'skip'].map((shape) => (
                <motion.button
                  key={shape}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData(prev => ({ ...prev, bodyShape: shape }))}
                  className={`p-4 rounded-lg font-semibold capitalize transition-all ${
                    formData.bodyShape === shape
                      ? 'bg-soft-gold text-deep-brown'
                      : 'bg-warm-beige text-deep-brown hover:bg-beige'
                  }`}
                >
                  {shape}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={step === 1}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            isLoading={isLoading}
            className="flex-1"
          >
            {step === 4 ? 'Complete Setup' : 'Next'}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Onboarding
