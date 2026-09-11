import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWardrobeStore } from '../store/wardrobeStore'
import WardrobeCard from '../components/WardrobeCard'

const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes']

export default function Wardrobe() {
  const { items, addItem, updateItem, deleteItem } = useWardrobeStore()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tops',
    color: '',
    size: 'M',
    brand: '',
    image: '',
    tags: [],
  })

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingItem) {
      updateItem(editingItem.id, formData)
      setEditingItem(null)
    } else {
      addItem(formData)
    }
    setFormData({
      name: '',
      category: 'Tops',
      color: '',
      size: 'M',
      brand: '',
      image: '',
      tags: [],
    })
    setShowForm(false)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData(item)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Your Wardrobe</h1>
          <p className="text-gray-600 text-lg">Organize and manage all your style pieces</p>
        </motion.div>

        {/* Add Item Button */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowForm(true)
              setEditingItem(null)
              setFormData({
                name: '',
                category: 'Tops',
                color: '',
                size: 'M',
                brand: '',
                image: '',
                tags: [],
              })
            }}
            className="btn-primary"
          >
            + Add New Item
          </motion.button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 rounded-lg"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-6">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />

                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="input-field"
                />

                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="input-field"
                >
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Brand (optional)"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="input-field"
                />

                <input
                  type="url"
                  placeholder="Image URL (optional)"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input-field"
                />

                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">
                    {editingItem ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <WardrobeCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={deleteItem}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-600 mb-4">No items yet</p>
            <p className="text-gray-500">Start by adding your first wardrobe item!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}