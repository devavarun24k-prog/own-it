import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'

const TryOn = () => {
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <div className="min-h-screen bg-cream">
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <SectionHeading
          title="Virtual Try-On"
          subtitle="See how outfits look on you before wearing them"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <Card className="bg-warm-beige border-2 border-soft-gold p-12">
            <div className="text-6xl mb-4">👗</div>
            <h2 className="text-3xl font-serif font-bold text-deep-brown mb-3">Coming Soon</h2>
            <p className="text-lg text-muted-burgundy mb-6">
              Our AI-powered virtual try-on feature is being developed.
              Upload your photo and see outfits virtually fitted on you.
            </p>
            <Button disabled size="lg">Enable Camera Access</Button>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}

export default TryOn
