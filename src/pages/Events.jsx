import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@components/ui/SectionHeading'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'

const Events = () => {
  const [events] = useState([
    { id: 1, name: 'Brunch with Friends', date: '2024-09-15', icon: '☕' },
    { id: 2, name: 'Weekend Getaway', date: '2024-09-20', icon: '✈️' },
    { id: 3, name: 'Wedding', date: '2024-10-05', icon: '💒' },
  ])

  return (
    <div className="min-h-screen bg-cream">
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <SectionHeading
          title="Events"
          subtitle="Plan outfits for upcoming occasions"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="space-y-4">
                <div className="text-5xl">{event.icon}</div>
                <div>
                  <h3 className="font-serif font-bold text-deep-brown text-xl">{event.name}</h3>
                  <p className="text-sm text-muted-burgundy">{event.date}</p>
                </div>
                <Button size="sm" className="w-full">Plan Outfit</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Events
