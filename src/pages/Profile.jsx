import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import SectionHeading from '@components/ui/SectionHeading'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'

const Profile = () => {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-cream">
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <SectionHeading
          title="Your Profile"
          subtitle="Manage your account settings"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Profile Card */}
          <div className="md:col-span-2">
            <Card className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-warm-beige rounded-full flex items-center justify-center text-4xl">
                  👤
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-serif font-bold text-deep-brown">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-muted-burgundy">{user?.email}</p>
                  <p className="text-sm text-soft-gold">Member since {new Date(user?.createdAt).getFullYear()}</p>
                </div>
              </div>

              <div className="border-t border-warm-beige pt-6 space-y-4">
                <h3 className="font-serif font-bold text-deep-brown text-lg">Style Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-warm-beige rounded-lg">
                    <p className="text-xs text-muted-burgundy mb-1">Aesthetic</p>
                    <p className="font-semibold text-deep-brown capitalize">
                      {user?.profile?.aesthetic || 'Not set'}
                    </p>
                  </div>
                  <div className="p-4 bg-warm-beige rounded-lg">
                    <p className="text-xs text-muted-burgundy mb-1">Favorite Colors</p>
                    <p className="font-semibold text-deep-brown">
                      {user?.profile?.colors?.length || 0} colors
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-warm-beige pt-6 space-y-4">
                <h3 className="font-serif font-bold text-deep-brown text-lg">Account Settings</h3>
                <div className="space-y-3">
                  <Button variant="secondary" className="w-full">Edit Profile</Button>
                  <Button variant="secondary" className="w-full">Change Password</Button>
                  <Button variant="secondary" className="w-full">Notification Settings</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-warm-beige">
              <h3 className="font-serif font-bold text-deep-brown text-lg mb-4">Quick Stats</h3>
              <div className="space-y-3 text-deep-brown">
                <div className="flex justify-between">
                  <span>Wardrobe Items</span>
                  <span className="font-bold">32</span>
                </div>
                <div className="flex justify-between">
                  <span>Outfits Created</span>
                  <span className="font-bold">18</span>
                </div>
                <div className="flex justify-between">
                  <span>Favorite Items</span>
                  <span className="font-bold">12</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-serif font-bold text-deep-brown text-lg mb-4">Membership</h3>
              <p className="text-muted-burgundy text-sm mb-4">You're on the Free plan</p>
              <Button className="w-full" size="sm">Upgrade to Pro</Button>
            </Card>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Profile
