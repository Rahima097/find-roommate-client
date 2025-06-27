import { Link } from "react-router-dom"
import { FaFacebookF, FaLinkedinIn, FaHome, FaSearch, FaQuestionCircle, FaEnvelope, FaInfoCircle } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import logo from ".././assets/logo.roommate.png"

const Footer = () => {
  return (
    <footer className="footer bg-primary p-10 flex flex-col items-center">
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row md:flex-row justify-between items-start border-b border-white/20 pb-14">
        {/* Logo and Description */}
        <div className="mb-8 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="FindRoommate Logo" className="w-12 h-12" />
            <p className="lg:text-3xl text-xl font-bold text-white">
              Find<span className="text-secondary">RoomMate</span>
            </p>
          </div>
          <p className="text-white text-base mb-4">Helping people connect and share spaces</p>
          <p className="text-white/80 text-sm max-w-xs">
            Your trusted platform for finding the perfect roommate and shared living spaces across Bangladesh.
          </p>
        </div>

        {/* Quick Links - Remove Add Listing */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-2xl text-secondary font-bold mb-4">Quick Links</h3>
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-white text-base hover:text-secondary transition-colors"
            >
              <FaHome className="text-sm" />
              Home
            </Link>
            <Link
              to="/browse-listings"
              className="flex items-center gap-2 text-white text-base hover:text-secondary transition-colors"
            >
              <FaSearch className="text-sm" />
              Browse Listings
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 text-white text-base hover:text-secondary transition-colors"
            >
              <FaInfoCircle className="text-sm" />
              About Us
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-2xl text-secondary font-bold mb-4">Support</h3>
          <div className="space-y-2">
            <Link
              to="/faq"
              className="flex items-center gap-2 text-white text-base hover:text-secondary transition-colors"
            >
              <FaQuestionCircle className="text-sm" />
              FAQ
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 text-white text-base hover:text-secondary transition-colors"
            >
              <FaEnvelope className="text-sm" />
              Contact Us
            </Link>
            <a
              href="mailto:support@findroommate.com"
              className="text-white text-base hover:text-secondary transition-colors block"
            >
              support@findroommate.com
            </a>
            <a href="tel:01913336446" className="text-white text-base hover:text-secondary transition-colors block">
              01913336446
            </a>
          </div>
        </div>

        {/* Join Now - Replace Legal section */}
        <div>
          <h3 className="text-2xl text-secondary font-bold mb-4">Join Now</h3>
          <div className="space-y-2">
            <Link to="/login" className="text-white text-base hover:text-secondary transition-colors block">
              Login
            </Link>
            <Link to="/register" className="text-white text-base hover:text-secondary transition-colors block">
              Register for Free
            </Link>
          </div>
        </div>
      </div>

      {/* Social Links and Copyright */}
      <div className="flex flex-col justify-center items-center pt-8">
        <h3 className="text-2xl text-secondary font-bold mb-4">Follow Us On</h3>
        <div className="flex space-x-6 mb-6">
          <a
            href="https://www.facebook.com/maanvia.khan/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-secondary p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <FaFacebookF className="text-xl text-white" />
          </a>
          <a
            href="https://x.com/RahimaKhatun97"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-secondary p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <FaXTwitter className="text-xl text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/rahima-khatun28/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-secondary p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <FaLinkedinIn className="text-xl text-white" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-white/80 mb-2">Made with ❤️ for better living experiences</p>
          <p className="text-sm text-white">FindRoommate ⓒ 2025. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
