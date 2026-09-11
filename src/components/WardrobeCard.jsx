import { motion } from 'framer-motion'
import { useState } from 'react'
import { useWardrobeStore } from '../store/wardrobeStore'

export default function WardrobeCard({ item, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card-shadow rounded-lg overflow-hidden bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
            <span className="text-4xl">👗</span>
          </div>
        )}

        {/* Overlay */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2"
          >
            <button
              onClick={() => onEdit(item)}
              className="btn-primary text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="btn-secondary text-sm"
            >
              Delete
            </button>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-semibold">Category:</span> {item.category}</p>
          <p><span className="font-semibold">Color:</span> {item.color}</p>
          <p><span className="font-semibold">Size:</span> {item.size}</p>
          {item.brand && <p><span className="font-semibold">Brand:</span> {item.brand}</p>}
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}