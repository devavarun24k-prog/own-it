import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@components/ui/SectionHeading'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'

const Shopping = () => {
  const [products] = useState([
    { id: 1, name: 'White Linen Shirt', price: '$45', image: 'https://images.unsplash.com/photo-1598033129519-0c5ddef81f67?w=300&h=300&fit=crop' },
    { id: 2, name: 'Black Trousers', price: '$65', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop' },
    { id: 3, name: 'Brown Leather Bag', price: '$95', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop' },
    { id: 4, name: 'White Sneakers', price: '$55', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop' },
  ])

  return (
    <div className="min-h-screen bg-cream">
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <SectionHeading
          title="Shopping"
          subtitle="Curated recommendations to complement your wardrobe"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full space-y-4 hover:shadow-lg">
                <div className="overflow-hidden rounded-lg h-40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-deep-brown">{product.name}</h3>
                  <p className="text-lg font-bold text-soft-gold">{product.price}</p>
                </div>
                <div className="flex gap-2 pt-4 border-t border-warm-beige">
                  <Button variant="secondary" size="sm" className="flex-1">Save</Button>
                  <Button size="sm" className="flex-1">Shop</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Shopping
