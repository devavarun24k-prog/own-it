import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@components/ui/SectionHeading'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'

const Friends = () => {
  const [friends] = useState([
    { id: 1, name: 'Sarah', style: 'Minimalist', avatar: '👩' },
    { id: 2, name: 'Emma', style: 'Bohemian', avatar: '👱‍♀️' },
    { id: 3, name: 'Lisa', style: 'Classic', avatar: '👩‍🦱' },
  ])

  return (
    <div className="min-h-screen bg-cream">
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <SectionHeading
          title="Friends"
          subtitle="Connect and share your style journey"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center space-y-4">
                <div className="text-6xl">{friend.avatar}</div>
                <div>
                  <h3 className="font-serif font-bold text-deep-brown text-xl">{friend.name}</h3>
                  <p className="text-sm text-muted-burgundy">{friend.style} style</p>
                </div>
                <div className="flex gap-2 pt-4 border-t border-warm-beige">
                  <Button variant="secondary" size="sm" className="flex-1">View Style</Button>
                  <Button size="sm" className="flex-1">Message</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Friends
