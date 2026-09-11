import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '../store/userStore'

const styles = ['Classic', 'Trendy', 'Minimalist', 'Bohemian', 'Sporty', 'Formal']
const budgets = ['Budget', 'Medium', 'Premium', 'Luxury']
const climates = ['Tropical', 'Temperate', 'Cold', 'Mixed']

export default function Profile() {
  const { user, setUser, updatePreferences } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    style: user.preferences?.style || 'Classic',
    budget: user.preferences?.budget || 'Medium',
    climate: user.preferences?.climate || 'Temperate',
  })

  const handleSave = () => {
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
    })
    updatePreferences({
      style: formData.style,
      budget: formData.budget,
      climate: formData.climate,
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Your Profile</h1>
          <p className="text-gray-600">Manage your personal style preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-shadow rounded-2xl bg-white p-8 mb-8"
        >
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-6xl">👤</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className={`input-field ${
                  !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className={`input-field ${
                  !isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            {/* Preferences Section */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-6">Style Preferences</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Personal Style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {styles.map((style) => (
                    <motion.button
                      key={style}
                      whileHover={{ scale: 1.05 }}
                      onClick={() =>
                        isEditing && setFormData({ ...formData, style })
                      }
                      className={`p-3 rounded-lg font-medium transition ${
                        formData.style === style
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${
                        !isEditing ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                      }`}
                      disabled={!isEditing}
                    >
                      {style}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Budget Range
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {budgets.map((budget) => (
                    <motion.button
                      key={budget}
                      whileHover={{ scale: 1.05 }}
                      onClick={() =>
                        isEditing && setFormData({ ...formData, budget })
                      }
                      className={`p-3 rounded-lg font-medium transition ${
                        formData.budget === budget
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${
                        !isEditing ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                      }`}
                      disabled={!isEditing}
                    >
                      {budget}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Climate
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {climates.map((climate) => (
                    <motion.button
                      key={climate}
                      whileHover={{ scale: 1.05 }}
                      onClick={() =>
                        isEditing && setFormData({ ...formData, climate })
                      }
                      className={`p-3 rounded-lg font-medium transition ${
                        formData.climate === climate
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${
                        !isEditing ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                      }`}
                      disabled={!isEditing}
                    >
                      {climate}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="btn-primary flex-1"
              >
                Edit Profile
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}