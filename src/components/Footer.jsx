import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">OWN IT</h3>
            <p className="text-gray-400">Make it yours. AI-powered personal wardrobe and fashion experience.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-amber-400 transition">Home</Link></li>
              <li><Link to="/wardrobe" className="hover:text-amber-400 transition">Wardrobe</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-amber-400 transition">AI Stylist</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-amber-400 transition cursor-pointer">Outfit Creation</li>
              <li className="hover:text-amber-400 transition cursor-pointer">AI Recommendations</li>
              <li className="hover:text-amber-400 transition cursor-pointer">Style Guide</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-amber-400 transition cursor-pointer">Twitter</li>
              <li className="hover:text-amber-400 transition cursor-pointer">Instagram</li>
              <li className="hover:text-amber-400 transition cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © {currentYear} OWN IT. All rights reserved. | Built with ❤️ for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  )
}