import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'

const Login = () => {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(formData.email, formData.password)
    if (result.success) {
      navigate('/onboarding')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-ivory flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="space-y-8">
          {/* Header */}
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-serif font-bold text-deep-brown hover:text-muted-burgundy transition-colors">
              OWN IT
            </h1>
          </Link>

          <div>
            <h2 className="text-3xl font-serif font-bold text-deep-brown mb-2">
              Welcome Back
            </h2>
            <p className="text-muted-burgundy">
              Log in to your OWN IT account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-soft-peach rounded-lg text-terracotta text-sm"
              >
                {error}
              </motion.div>
            )}

            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-warm-beige"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-cream text-muted-burgundy">or</span>
            </div>
          </div>

          {/* Social Login (Demo) */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setFormData({ email: 'demo@ownit.com', password: 'demo123' })
              }}
            >
              Try Demo
            </Button>
          </div>

          {/* Signup Link */}
          <p className="text-center text-muted-burgundy">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-deep-brown hover:text-soft-gold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
