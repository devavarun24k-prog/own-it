import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@components/ui/SectionHeading'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'

const Inspiration = () => {
  const [inspirationItems] = useState([
    {
      id: 1,
      title: 'Minimalist Chic',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop',
      description: 'Clean lines and neutral tones',
    },
    {
      id: 2,
      title: 'Bohemian Vibes',
      image: 'https://images.unsplash.com/photo-1515633083207-36574dc42033?w=400&h=400&fit=crop',
      description: 'Free-spirited and artistic',
    },
    {
      id: 3,
      title: 'Classic Elegance',
      image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop',
      description: 'Timeless and sophisticated',
    },
    {
      id: 4,
      title: 'Street Style',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
      description: 'Urban and edgy looks',
    },
  ])

  return (
    <div className="min-h-screen bg-cream">
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <SectionHeading
          title="Inspiration Board"
          subtitle="Discover styles and create mood boards"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inspirationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full space-y-4 hover:shadow-lg">
                <div className="overflow-hidden rounded-lg h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-deep-brown text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-burgundy">{item.description}</p>
                </div>
                <Button variant="secondary" size="sm" className="w-full">
                  Add to Board
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Inspiration
