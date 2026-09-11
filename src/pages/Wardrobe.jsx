import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWardrobeStore } from '@store/wardrobeStore'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import Modal from '@components/ui/Modal'
import Input from '@components/ui/Input'
import { CLOTHING_CATEGORIES } from '@types/index'

const Wardrobe = () => {
  const {
    items,
    filteredItems,
    selectedCategory,
    isLoading,
    filterItems,
    addItem,
    toggleFavorite,
    initializeDemoData,
  } = useWardrobeStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory_, setSelectedCategory] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    category: 'tops',
    color: 'cream',
    pattern: 'solid',
    material: 'cotton',
  })

  useEffect(() => {
    if (items.length === 0) {
      initializeDemoData()
    }
  }, [])

  useEffect(() => {
    filterItems(selectedCategory_, searchQuery)
  }, [selectedCategory_, searchQuery])

  const handleAddItem = async (e) => {
    e.preventDefault()
    const result = await addItem(formData)
    if (result.success) {
      setFormData({ name: '', category: 'tops', color: 'cream', pattern: 'solid', material: 'cotton' })
      setIsModalOpen(false)
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const categories = Object.values(CLOTHING_CATEGORIES)

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <SectionHeading
            title="Your Wardrobe"
            subtitle={`${items.length} items in your collection`}
          />

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={handleSearch}
              className="flex-1"
            />
            <Button
              onClick={() => setIsModalOpen(true)}
              className="md:w-auto"
            >
              + Add Item
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory_ === 'all'
                  ? 'bg-soft-gold text-deep-brown'
                  : 'bg-warm-beige text-deep-brown hover:bg-beige'
              }`}
            >
              All
            </button>
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-colors capitalize ${
                  selectedCategory_ === cat
                    ? 'bg-soft-gold text-deep-brown'
                    : 'bg-warm-beige text-deep-brown hover:bg-beige'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Wardrobe Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-2xl font-serif font-bold text-deep-brown mb-4">No items found</p>
            <p className="text-muted-burgundy mb-6">Start by adding items to your wardrobe</p>
            <Button onClick={() => setIsModalOpen(true)}>Add Your First Item</Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative overflow-hidden bg-warm-beige h-48">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                  >
                    {item.isFavorite ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-deep-brown truncate">{item.name}</h3>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 bg-warm-beige rounded-full text-deep-brown capitalize">
                      {item.category}
                    </span>
                    <span className="text-xs px-2 py-1 bg-warm-beige rounded-full text-deep-brown">
                      {item.color}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-warm-beige">
                    <p className="text-xs text-muted-burgundy">Wear {item.wearFrequency}%</p>
                    <p className="text-xs text-soft-gold font-semibold">{item.outfitIds.length} outfits</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Add Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Item"
        size="md"
      >
        <form onSubmit={handleAddItem} className="space-y-6">
          <Input
            label="Item Name"
            type="text"
            placeholder="e.g., Blue Jeans"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-warm-beige rounded-lg focus:border-soft-gold focus:outline-none"
              >
                {Object.values(CLOTHING_CATEGORIES).map(cat => (
                  <option key={cat} value={cat} className="capitalize">{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">Color</label>
              <input
                type="text"
                placeholder="e.g., navy blue"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="w-full px-4 py-2 border border-warm-beige rounded-lg focus:border-soft-gold focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Add to Wardrobe
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default Wardrobe
