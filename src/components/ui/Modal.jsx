import React, { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const Modal = ({ isOpen, onClose, title, children, size = 'md', showHeader = true }) => {
  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={clsx('bg-cream rounded-lg shadow-xl', sizes[size])}
      >
        {showHeader && (
          <div className="flex items-center justify-between border-b border-warm-beige p-6">
            <h2 className="text-2xl font-serif font-bold text-deep-brown">{title}</h2>
            <button
              onClick={onClose}
              className="text-muted-burgundy hover:text-deep-brown transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Modal
