import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const features = [
  {
    icon: '👗',
    title: 'Smart Wardrobe',
    description: 'Organize and catalog all your clothing items in one beautiful place',
  },
  {
    icon: '🤖',
    title: 'AI Stylist',
    description: 'Get personalized outfit recommendations from our intelligent AI assistant',
  },
  {
    icon: '✨',
    title: 'Style Guide',
    description: 'Discover trending combinations and styling tips tailored to your taste',
  },
  {
    icon: '📸',
    title: 'Photo Upload',
    description: 'Easily add items to your wardrobe using photos or manual entry',
  },
]

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Fashion Enthusiast',
    text: 'OWN IT has completely transformed how I manage my wardrobe. The AI recommendations are spot-on!',
    avatar: '👩',
  },
  {
    name: 'James L.',
    role: 'Style Consultant',
    text: 'Finally, a tool that understands personal style. The interface is intuitive and the features are powerful.',
    avatar: '👨',
  },
  {
    name: 'Emma R.',
    role: 'Sustainable Fashion Advocate',
    text: 'I love how OWN IT helps me maximize my existing wardrobe instead of buying more.',
    avatar: '👩‍🦱',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Make It Yours
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Your AI-powered personal wardrobe and fashion experience
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              OWN IT helps you organize your style, discover new outfits, and become the best version of your fashionable self.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/wardrobe" className="btn-primary">
                Start Your Wardrobe →
              </Link>
              <Link to="/ai-assistant" className="btn-secondary">
                Chat with AI Stylist
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 w-full max-w-2xl"
          >
            <div className="relative w-full aspect-square bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-9xl">👗</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to master your style
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-shadow p-8 rounded-xl bg-gradient-to-br from-white to-amber-50 hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              What People Love About OWN IT
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-shadow p-8 rounded-xl bg-white"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{testimonial.avatar}</span>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"<br/>{testimonial.text}<br/>"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Own Your Style?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of fashion lovers who are revolutionizing their wardrobes
            </p>
            <Link to="/wardrobe" className="btn-primary inline-block">
              Get Started Now →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}