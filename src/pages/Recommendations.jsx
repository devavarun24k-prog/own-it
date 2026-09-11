import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWardrobeStore } from '../store/wardrobeStore'
import OutfitCard from '../components/OutfitCard'

const occasions = ['Casual', 'Work', 'Party', 'Date Night', 'Gym', 'Weekend', 'Formal']

export default function Recommendations() {
  const { items, getOutfits, addOutfit, deleteOutfit } = useWardrobeStore()
  const [selectedOccasion, setSelectedOccasion] = useState('Casual')
  const [outfits, setOutfits] = useState(getOutfits())
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newOutfit, setNewOutfit] = useState({
    name: '',
    description: '',
    occasion: 'Casual',
    items: [],
  })

  const handleCreateOutfit = () => {
    if (newOutfit.name.trim() && newOutfit.items.length > 0) {
      const outfit = addOutfit(newOutfit)
      setOutfits([...outfits, outfit])
      setNewOutfit({
        name: '',
        description: '',
        occasion: 'Casual',
        items: [],
      })
      setShowCreateForm(false)
    }
  }

  const handleDeleteOutfit = (id) => {
    deleteOutfit(id)
    setOutfits(outfits.filter((o) => o.id !== id))
  }

  const filteredOutfits = outfits.filter(
    (outfit) => outfit.occasion === selectedOccasion
  )

  const toggleItemSelection = (item) => {
    const isSelected = newOutfit.items.some((i) => i.id === item.id)
    if (isSelected) {
      setNewOutfit({
        ...newOutfit,
        items: newOutfit.items.filter((i) => i.id !== item.id),
      })
    } else {
      setNewOutfit({
        ...newOutfit,
        items: [...newOutfit.items, item],
      })
    }
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
          <h1 className="text-5xl font-bold gradient-text mb-4">Outfit Ideas</h1>
          <p className="text-gray-600 text-lg">
            Create and save your favorite outfit combinations
          </p>
        </motion.div>

        {/* Create Outfit Button */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="btn-primary"
          >
            + Create New Outfit
          </motion.button>
        </div>

        {/* Create Outfit Modal */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 rounded-lg overflow-y-auto"
            onClick={() => setShowCreateForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full my-8"
            >
              <h2 className="text-2xl font-bold mb-6">Create New Outfit</h2>

              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Outfit Name"
                  value={newOutfit.name}
                  onChange={(e) => setNewOutfit({ ...newOutfit, name: e.target.value })}
                  className="input-field"
                />

                <textarea
                  placeholder="Description (optional)"
                  value={newOutfit.description}
                  onChange={(e) =>
                    setNewOutfit({ ...newOutfit, description: e.target.value })
                  }
                  className="input-field h-20 resize-none"
                />

                <select
                  value={newOutfit.occasion}
                  onChange={(e) =>
                    setNewOutfit({ ...newOutfit, occasion: e.target.value })
                  }
                  className="input-field"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-4">Select Items ({newOutfit.items.length})</h3>
                {items.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => toggleItemSelection(item)}
                        className={`p-3 rounded-lg border-2 transition ${
                          newOutfit.items.some((i) => i.id === item.id)
                            ? 'border-amber-600 bg-amber-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.category}</p>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Add items to your wardrobe first</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCreateOutfit}
                  className="btn-primary flex-1"
                  disabled={!newOutfit.name.trim() || newOutfit.items.length === 0}
                >
                  Create Outfit
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Occasion Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {occasions.map((occ) => (
            <motion.button
              key={occ}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedOccasion(occ)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedOccasion === occ
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600'
              }`}
            >
              {occ}
            </motion.button>
          ))}
        </div>

        {/* Outfits Grid */}
        {filteredOutfits.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredOutfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                onDelete={handleDeleteOutfit}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-600 mb-4">No outfits created yet</p>
            <p className="text-gray-500">Create your first outfit to get started!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}