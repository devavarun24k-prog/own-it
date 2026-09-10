import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  onClick,
  className,
  ...props
}) => {
  const baseStyles = 'font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-deep-brown text-cream hover:bg-muted-burgundy focus:ring-soft-gold',
    secondary: 'bg-warm-beige text-deep-brown hover:bg-beige focus:ring-soft-gold',
    outline: 'border-2 border-deep-brown text-deep-brown hover:bg-cream focus:ring-soft-gold',
    ghost: 'text-deep-brown hover:bg-warm-beige focus:ring-soft-gold',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button
