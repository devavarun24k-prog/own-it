import React from 'react'
import clsx from 'clsx'

const Input = React.forwardRef(
  ({ className, type = 'text', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-deep-brown mb-2">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={clsx(
            'w-full px-4 py-2 border rounded-lg font-medium transition-colors',
            'bg-cream border-warm-beige text-deep-brown placeholder-muted-burgundy',
            'focus:border-soft-gold focus:outline-none',
            error && 'border-terracotta',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-terracotta mt-1">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
