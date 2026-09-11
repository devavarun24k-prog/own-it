import { motion } from 'framer-motion'
import { useState } from 'react'

export default function OutfitCard({ outfit, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card-shadow rounded-lg overflow-hidden bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grid of items */}
      <div className="grid grid-cols-2 h-64 bg-gray-100">
        {outfit.items && outfit.items.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl">👗</span>
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{outfit.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{outfit.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {outfit.items?.length || 0} items
          </span>
          {outfit.occasion && (
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
              {outfit.occasion}
            </span>
          )}
        </div>

        {hovered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => onDelete(outfit.id)}
            className="w-full mt-3 btn-secondary text-sm"
          >
            Delete
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}