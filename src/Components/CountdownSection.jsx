"use client"

import { FaHeart } from "react-icons/fa"
import { Link } from "react-router"

const CountdownSection = () => {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Simple Header */}
        <div className="mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <FaHeart className="text-secondary text-2xl" />
            <span className="text-white text-lg font-bold">100% Satisfied Users</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Join FREE Community</h2>
        </div>

        {/* Simple Stats Row */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">15K+</div>
            <div className="text-white text-sm">Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">100%</div>
            <div className="text-white text-sm">Satisfied</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">FREE</div>
            <div className="text-white text-sm">Forever</div>
          </div>
        </div>

        {/* Simple CTA */}
        <Link to="/login" className="btn bg-secondary text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300">Join Now - FREE</Link>
      </div>
    </section>
  )
}

export default CountdownSection
