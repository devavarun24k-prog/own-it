import React from 'react'
import { motion } from 'framer-motion'

const SectionHeading = ({ title, subtitle, align = 'left', children }) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={alignClass}
    >
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-3">
        {title}
      </h2>
      {subtitle && <p className="text-lg text-muted-burgundy mb-6">{subtitle}</p>}
      {children}
    </motion.div>
  )
}

export default SectionHeading
