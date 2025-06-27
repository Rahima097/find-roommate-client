import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../Provider/AuthProvider"
import Swal from "sweetalert2"
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaHome,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaTrash,
  FaTh,
  FaList,
  FaEye,
} from "react-icons/fa"

// Custom Card Component for My Listings
const MyListingCard = ({ listing, index, onDelete }) => {
  const { _id, title, location, rentAmount, roomType, name, imageUrl, availability } = listing

  // Function to convert ImgBB share URL to direct image URL
  const getDirectImageUrl = (url) => {
    if (!url) return "/placeholder.svg?height=200&width=300"

    if (
      url.includes(".jpg") ||
      url.includes(".png") ||
      url.includes(".jpeg") ||
      url.includes(".gif") ||
      url.includes(".webp")
    ) {
      return url
    }

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
              availability === "available" ? "badge-success text-white" : "badge-error text-white"
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
            <FaMoneyBillWave className="text-success flex-shrink-0 text-xs" />
            <span className="font-semibold text-success">BDT {rentAmount}/month</span>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <FaUser className="text-secondary flex-shrink-0 text-xs" />
            <span className="truncate text-gray-600">Posted by {name}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions justify-end mt-auto">
          <div className="flex gap-2 w-full">
            <Link to={`/roommate/${_id}`} className="flex-1">
              <button className="btn btn-outline btn-primary w-full text-xs sm:text-sm py-2 min-h-8 sm:min-h-10">
                <FaEye className="sm:mr-1" />
                <span className="hidden sm:inline">View</span>
              </button>
            </Link>
            <Link to={`/mylistings/update/${_id}`} className="flex-1">
              <button className="btn btn-outline btn-secondary w-full text-xs sm:text-sm py-2 min-h-8 sm:min-h-10">
                <FaEdit className="sm:mr-1" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </Link>
            <button
              onClick={() => onDelete(_id)}
              className="btn btn-outline btn-error flex-1 text-xs sm:text-sm py-2 min-h-8 sm:min-h-10"
            >
              <FaTrash className="sm:mr-1" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main My Listings Component
const MyListings = () => {
  const { user } = useContext(AuthContext)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("card") // 'card' or 'table'

  useEffect(() => {
    if (!user?.email) return

    fetch(`https://find-roommate-server.vercel.app/roommates/mylistings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch user listings:", err)
        setLoading(false)
      })
  }, [user?.email])

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this listing?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await fetch(`https://find-roommate-server.vercel.app/roommates/${id}`, {
        method: "DELETE",
      })

      const result = await res.json()

      if (res.ok && result.deletedCount > 0) {
        setListings((prev) => prev.filter((listing) => listing._id !== id))
        Swal.fire("Deleted!", "Your listing has been deleted.", "success")
      } else {
        Swal.fire("Error!", "Failed to delete the listing.", "error")
      }
    } catch (err) {
      console.error("Delete error:", err)
      Swal.fire("Error!", "Something went wrong.", "error")
    }
  }

  if (loading) {
    return (
      <div className="bg-base-200 py-8 sm:py-16 min-h-screen">
        <div className="w-11/12 sm:w-10/12 mx-auto text-center">
          <span className="loading loading-spinner loading-md sm:loading-lg text-primary"></span>
          <p className="mt-4 text-sm sm:text-lg">Loading your listings...</p>
        </div>
      </div>
    )
  }

  if (!listings.length) {
    return (
      <div className="bg-base-200 py-8 sm:py-16 min-h-screen">
        <div className="w-11/12 sm:w-10/12 mx-auto text-center">
          <div className="text-4xl sm:text-6xl mb-4">📋</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">No Listings Found</h3>
          <p className="text-sm sm:text-base text-base-content/60 mb-4">
            You haven't created any listings yet. Start by adding your first listing!
          </p>
          <Link to="/add-listings" className="btn btn-primary text-sm sm:text-base">
            Add Your First Listing
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-base-200 py-8 sm:py-16 min-h-screen overflow-x-hidden">
      <div className="w-11/12 sm:w-10/12 mx-auto px-2 sm:px-0 max-w-full">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">My Listings</h1>
              <p className="text-sm sm:text-base text-base-content/70">
                Manage your {listings.length} room listing{listings.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">View:</span>
              <div className="join">
                <button
                  className={`btn join-item btn-sm ${viewMode === "card" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setViewMode("card")}
                >
                  <FaTh className="mr-1" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  className={`btn join-item btn-sm ${viewMode === "table" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setViewMode("table")}
                >
                  <FaList className="mr-1" />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 mb-6">
            <div className="bg-base-100 rounded-lg shadow p-4 sm:rounded-none sm:rounded-l-lg">
              <div className="text-xs sm:text-sm text-base-content/60 uppercase tracking-wide">Total Listings</div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">{listings.length}</div>
              <div className="text-xs sm:text-sm text-base-content/50">Your properties</div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-4 sm:rounded-none sm:border-l sm:border-r border-base-300">
              <div className="text-xs sm:text-sm text-base-content/60 uppercase tracking-wide">Available</div>
              <div className="text-2xl sm:text-3xl font-bold text-success">
                {listings.filter((r) => r.availability === "available").length}
              </div>
              <div className="text-xs sm:text-sm text-base-content/50">Ready to rent</div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-4 sm:rounded-none sm:rounded-r-lg">
              <div className="text-xs sm:text-sm text-base-content/60 uppercase tracking-wide">Total Views</div>
              <div className="text-2xl sm:text-3xl font-bold text-secondary">
                {listings.reduce((sum, listing) => sum + (Number.parseInt(listing.views) || 0), 0)}
              </div>
              <div className="text-xs sm:text-sm text-base-content/50">All time views</div>
            </div>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === "card" ? (
          /* Card View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0">
            {listings.map((listing, index) => (
              <MyListingCard key={listing._id} listing={listing} index={index} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Rent</th>
                      <th>Room Type</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((listing, index) => (
                      <tr key={listing._id} className="hover:bg-base-200 transition-colors">
                        <td className="text-center font-bold">{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={listing.imageUrl || "/placeholder.svg"}
                                  alt={listing.title}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold line-clamp-1">{listing.title}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-primary text-xs" />
                            <span className="text-sm">{listing.location}</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <FaMoneyBillWave className="text-success text-xs" />
                            <span className="font-semibold text-success">BDT {listing.rentAmount}</span>
                          </div>
                        </td>
                        <td>
                          <div className="badge badge-primary badge-sm">
                            <FaHome className="mr-1 text-xs" />
                            {listing.roomType}
                          </div>
                        </td>
                        <td className="text-center">
                          <div
                            className={`badge badge-sm font-semibold ${
                              listing.availability === "available" ? "badge-success" : "badge-error"
                            }`}
                          >
                            {listing.availability === "available" ? (
                              <>
                                <FaCheckCircle className="mr-1 text-xs" />
                                Available
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="mr-1 text-xs" />
                                Not Available
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-1 justify-center">
                            <Link to={`/roommate/${listing._id}`}>
                              <button className="btn btn-ghost btn-xs tooltip" data-tip="View Details">
                                <FaEye />
                              </button>
                            </Link>
                            <Link to={`/mylistings/update/${listing._id}`}>
                              <button className="btn btn-ghost btn-xs text-secondary tooltip" data-tip="Edit">
                                <FaEdit />
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(listing._id)}
                              className="btn btn-ghost btn-xs text-error tooltip"
                              data-tip="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden">
              <div className="divide-y divide-base-300">
                {listings.map((listing, index) => (
                  <div key={listing._id} className="p-4 hover:bg-base-50 transition-colors">
                    <div className="flex gap-3">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <div className="avatar">
                          <div className="mask mask-squircle w-16 h-16">
                            <img
                              src={listing.imageUrl || "/placeholder.svg"}
                              alt={listing.title}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="text-center mt-1">
                          <span className="badge badge-neutral badge-xs">#{index + 1}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title and Status */}
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-sm line-clamp-2 flex-1 mr-2">{listing.title}</h3>
                          <div
                            className={`badge badge-xs font-semibold flex-shrink-0 ${
                              listing.availability === "available" ? "badge-success" : "badge-error"
                            }`}
                          >
                            {listing.availability === "available" ? "✓" : "✗"}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                            <span className="truncate">{listing.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <FaMoneyBillWave className="text-success flex-shrink-0" />
                            <span className="font-semibold text-success">BDT {listing.rentAmount}/month</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <FaHome className="text-secondary flex-shrink-0" />
                            <span>{listing.roomType}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Link to={`/roommate/${listing._id}`} className="flex-1">
                            <button className="btn btn-outline btn-primary btn-xs w-full">
                              <FaEye />
                            </button>
                          </Link>
                          <Link to={`/mylistings/update/${listing._id}`} className="flex-1">
                            <button className="btn btn-outline btn-secondary btn-xs w-full">
                              <FaEdit />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(listing._id)}
                            className="btn btn-outline btn-error btn-xs flex-1"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyListings
