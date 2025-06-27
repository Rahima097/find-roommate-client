"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router"
import { FaMapMarkerAlt, FaMoneyBillWave, FaHome, FaUser, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

// Custom Card Component for Browse Listings
const BrowseListingCard = ({ roommate, index }) => {
  const { _id, title, location, rentAmount, roomType, name, imageUrl, availability } = roommate

  // Function to convert ImgBB share URL to direct image URL
  const getDirectImageUrl = (url) => {
    if (!url) return "/placeholder.svg?height=200&width=300"

    // If it's already a direct image URL, return as is
    if (
      url.includes(".jpg") ||
      url.includes(".png") ||
      url.includes(".jpeg") ||
      url.includes(".gif") ||
      url.includes(".webp")
    ) {
      return url
    }

    // Convert ImgBB share URL to direct URL
    if (url.includes("ibb.co/")) {
      const imageId = url.split("/").pop()
      return `https://i.ibb.co/${imageId}.jpg`
    }

    return url
  }

  return (
    <div className="card bg-base-100 shadow-lg border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <figure className="relative">
        <img
          src={getDirectImageUrl(imageUrl) || "/placeholder.svg"}
          alt={title}
          className="w-full h-40 sm:h-48 object-cover"
          onError={(e) => {
            // Try different extensions if first one fails
            const currentSrc = e.target.src
            if (currentSrc.includes(".jpg")) {
              e.target.src = currentSrc.replace(".jpg", ".png")
            } else if (currentSrc.includes(".png")) {
              e.target.src = currentSrc.replace(".png", ".jpeg")
            } else if (currentSrc.includes(".jpeg")) {
              e.target.src = "/placeholder.svg?height=200&width=300"
            } else {
              e.target.src = "/placeholder.svg?height=200&width=300"
            }
          }}
        />
        {/* Serial Number Badge */}
        <div className="absolute top-2 left-2">
          <div className="badge badge-neutral text-white font-bold text-xs">#{index + 1}</div>
        </div>
        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          <div
            className={`badge font-semibold text-xs ${
              availability === "available" ? "badge-secondary text-white" : "badge-error text-white"
            }`}
          >
            {availability === "available" ? (
              <>
                <FaCheckCircle className="mr-1 text-xs" />
                <span className="hidden sm:inline">Available</span>
                <span className="sm:hidden">✓</span>
              </>
            ) : (
              <>
                <FaTimesCircle className="mr-1 text-xs" />
                <span className="hidden sm:inline">Not Available</span>
                <span className="sm:hidden">✗</span>
              </>
            )}
          </div>
        </div>
        {/* Room Type Badge */}
        <div className="absolute bottom-2 left-2">
          <div className="badge badge-primary text-white font-semibold text-xs">
            <FaHome className="mr-1 text-xs" />
            <span className="truncate max-w-20">{roomType}</span>
          </div>
        </div>
      </figure>

      <div className="card-body p-3 sm:p-4">
        {/* Title */}
        <h2 className="card-title text-sm sm:text-lg text-primary font-bold mb-2 sm:mb-3 line-clamp-2 leading-tight">
          {title}
        </h2>

        {/* Details Grid */}
        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <FaMapMarkerAlt className="text-primary flex-shrink-0 text-xs" />
            <span className="truncate text-gray-600">{location}</span>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <FaMoneyBillWave className="text-secondary flex-shrink-0 text-xs" />
            <span className="font-semibold text-secondary">BDT {rentAmount}/month</span>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <FaUser className="text-secondary flex-shrink-0 text-xs" />
            <span className="truncate text-gray-600">Posted by {name}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-actions justify-end mt-auto">
          <Link to={`/roommate/${_id}`} className="w-full">
            <button className="btn btn-primary w-full text-white hover:btn-primary-focus transition-colors text-xs sm:text-sm py-2 min-h-8 sm:min-h-12">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Main Browse Listings Component
const BrowseListings = () => {
  const [roommates, setRoommates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://find-roommate-server.vercel.app/roommates")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch listings")
        }
        return res.json()
      })
      .then((data) => {
        setRoommates(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch listings:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-base-200 py-8 sm:py-16 min-h-screen">
        <div className="w-11/12 sm:w-10/12 mx-auto text-center">
          <span className="loading loading-spinner loading-md sm:loading-lg text-primary"></span>
          <p className="mt-4 text-sm sm:text-lg">Loading all listings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-base-200 py-8 sm:py-16 min-h-screen">
        <div className="w-11/12 sm:w-10/12 mx-auto text-center px-4">
          <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-error">Error Loading Listings</h3>
          <p className="text-sm sm:text-base text-base-content/60 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary text-sm sm:text-base">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-base-200 py-8 sm:py-16 min-h-screen">
      <div className="w-11/12 sm:w-10/12 mx-auto px-2 sm:px-0">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-2 px-4">Browse All Room Listings</h1>
          <p className="text-sm sm:text-lg text-base-content/70 mb-4 px-4">Find the perfect roommate for your needs</p>

          {/* Stats - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 mb-6 px-4">
            <div className="bg-base-100 rounded-lg shadow p-4 sm:rounded-none sm:rounded-l-lg">
              <div className="text-xs sm:text-sm text-base-content/60 uppercase tracking-wide">Total Listings</div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">{roommates.length}</div>
              <div className="text-xs sm:text-sm text-base-content/50">Available properties</div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-4 sm:rounded-none sm:border-l sm:border-r border-base-300">
              <div className="text-xs sm:text-sm text-base-content/60 uppercase tracking-wide">Available Now</div>
              <div className="text-2xl sm:text-3xl font-bold text-success">
                {roommates.filter((r) => r.availability === "available").length}
              </div>
              <div className="text-xs sm:text-sm text-base-content/50">Ready to move in</div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-4 sm:rounded-none sm:rounded-r-lg">
              <div className="text-xs sm:text-sm text-base-content/60 uppercase tracking-wide">Room Types</div>
              <div className="text-2xl sm:text-3xl font-bold text-secondary">
                {[...new Set(roommates.map((r) => r.roomType))].length}
              </div>
              <div className="text-xs sm:text-sm text-base-content/50">Different options</div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {roommates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0">
            {roommates.map((roommate, index) => (
              <BrowseListingCard key={roommate._id} roommate={roommate} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <div className="text-4xl sm:text-6xl mb-4">🏠</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No Listings Found</h3>
            <p className="text-sm sm:text-base text-base-content/60 mb-4">
              There are currently no roommate listings available.
            </p>
            <Link to="/add-listings" className="btn btn-primary text-sm sm:text-base">
              Add Your Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseListings
