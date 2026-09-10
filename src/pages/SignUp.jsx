import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '@store/authStore'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'

const SignUp = () => {
  const navigate = useNavigate()
  const { signup, isLoading, error } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  })
  const [localError, setLocalError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    const result = await signup(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    )

    if (result.success) {
      navigate('/onboarding')
    }
  }

  const displayError = localError || error

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
              Join OWN IT
            </h2>
            <p className="text-muted-burgundy">
              Create your personal fashion AI
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {displayError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-soft-peach rounded-lg text-terracotta text-sm"
              >
                {displayError}
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="firstName"
                label="First Name"
                placeholder="Alex"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Fashion"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

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

            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1"
                required
              />
              <label htmlFor="terms" className="text-sm text-muted-burgundy">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-muted-burgundy">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-deep-brown hover:text-soft-gold transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUp
