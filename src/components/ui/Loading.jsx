import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ message = 'Loading...' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center min-h-screen gap-4"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-12 h-12 border-4 border-cream border-t-soft-gold rounded-full"
    />
    <p className="text-lg font-medium text-deep-brown">{message}</p>
  </motion.div>
)

export default Loading
