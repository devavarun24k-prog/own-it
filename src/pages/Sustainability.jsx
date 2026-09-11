import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@components/ui/SectionHeading'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'

const Sustainability = () => {
  const [stats] = useState([
    { label: 'Items Reworn', value: '24', icon: '♻️' },
    { label: 'CO₂ Saved', value: '12kg', icon: '🌱' },
    { label: 'New Purchases Avoided', value: '8', icon: '🛍️' },
  ])

  const [tips] = useState([
    { title: 'Rewear Challenge', desc: 'Challenge yourself to rewear items more' },
    { title: 'Swap Events', desc: 'Connect with friends to swap clothing' },
    { title: 'Care Tips', desc: 'Learn how to care for your clothes properly' },
  ])

  return (
    <div className="min-h-screen bg-cream">
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <SectionHeading
          title="Sustainability"
          subtitle="Make conscious fashion choices"
        />
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center space-y-3">
                <div className="text-5xl">{stat.icon}</div>
                <p className="text-3xl font-serif font-bold text-deep-brown">{stat.value}</p>
                <p className="text-sm text-muted-burgundy">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <h2 className="text-3xl font-serif font-bold text-deep-brown mb-8">Sustainability Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="space-y-4">
                <h3 className="font-serif font-bold text-deep-brown text-xl">{tip.title}</h3>
                <p className="text-muted-burgundy">{tip.desc}</p>
                <Button variant="secondary" size="sm" className="w-full">Learn More</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Sustainability
