import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useStylistStore } from '@store/stylistStore'
import { useWardrobeStore } from '@store/wardrobeStore'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'
import { MOODS, OCCASIONS } from '@types/index'

const Stylist = () => {
  const { generateRecommendation, isGenerating } = useStylistStore()
  const { items } = useWardrobeStore()
  const [selectedMood, setSelectedMood] = useState('confident')
  const [selectedOccasion, setSelectedOccasion] = useState('work')
  const [recommendations, setRecommendations] = useState([])

  const handleGenerateOutfit = async () => {
    const result = await generateRecommendation({
      mood: selectedMood,
      occasion: selectedOccasion,
      wardrobeSize: items.length,
    })

    if (result.success) {
      setRecommendations([result.recommendation, ...recommendations])
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <SectionHeading
          title="AI Stylist"
          subtitle="Get personalized outfit recommendations"
        />
      </section>

      {/* Style Selector */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Mood Selection */}
          <Card>
            <h3 className="text-2xl font-serif font-bold text-deep-brown mb-6">How are you feeling?</h3>
            <div className="grid grid-cols-2 gap-3">
              {MOODS.map((mood) => (
                <motion.button
                  key={mood}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood)}
                  className={`p-4 rounded-lg font-semibold capitalize transition-all ${
                    selectedMood === mood
                      ? 'bg-soft-gold text-deep-brown'
                      : 'bg-warm-beige text-deep-brown hover:bg-beige'
                  }`}
                >
                  {mood}
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Occasion Selection */}
          <Card>
            <h3 className="text-2xl font-serif font-bold text-deep-brown mb-6">What's the occasion?</h3>
            <div className="grid grid-cols-2 gap-3">
              {OCCASIONS.map((occasion) => (
                <motion.button
                  key={occasion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedOccasion(occasion)}
                  className={`p-4 rounded-lg font-semibold capitalize transition-all ${
                    selectedOccasion === occasion
                      ? 'bg-soft-gold text-deep-brown'
                      : 'bg-warm-beige text-deep-brown hover:bg-beige'
                  }`}
                >
                  {occasion}
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            onClick={handleGenerateOutfit}
            isLoading={isGenerating}
            className="px-12"
          >
            {isGenerating ? 'Creating Look...' : 'Generate Outfit'}
          </Button>
          <p className="text-sm text-muted-burgundy mt-4">
            AI will analyze your {items.length} items to create the perfect combination
          </p>
        </motion.div>
      </section>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
          <h2 className="text-3xl font-serif font-bold text-deep-brown mb-8">Your Looks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-serif font-bold text-deep-brown">
                        {rec.looks[0]?.name || 'Generated Look'}
                      </h3>
                      <span className="text-2xl">✨</span>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-warm-beige rounded-full text-sm font-medium text-deep-brown capitalize">
                        {rec.mood}
                      </span>
                      <span className="px-3 py-1 bg-warm-beige rounded-full text-sm font-medium text-deep-brown capitalize">
                        {rec.occasion}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-burgundy leading-relaxed">
                    {rec.looks[0]?.description || 'A perfect combination for your style and the occasion.'}
                  </p>

                  <div className="flex gap-3 pt-4 border-t border-warm-beige">
                    <Button variant="secondary" size="sm" className="flex-1">
                      Save Look
                    </Button>
                    <Button size="sm" className="flex-1">
                      Try On
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Tips Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <Card className="bg-warm-beige border-2 border-soft-gold">
          <h3 className="text-2xl font-serif font-bold text-deep-brown mb-4">💡 Styling Tips</h3>
          <ul className="space-y-3 text-deep-brown">
            <li>✓ The more items in your wardrobe, the more combinations AI can suggest</li>
            <li>✓ Upload clear photos of your clothing for better recommendations</li>
            <li>✓ Update your style preferences to get more personalized looks</li>
            <li>✓ Save your favorite looks to build a reference library</li>
          </ul>
        </Card>
      </section>
    </div>
  )
}

export default Stylist
