import { useState, useEffect, useContext } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  FaHome,
  FaUsers,
  FaEye,
  FaPlus,
  FaList,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import { AuthContext } from "../Provider/AuthProvider"

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    totalListings: 0,
    myListings: 0,
    totalViews: 0,
    activeListings: 0,
  })
  const [userListings, setUserListings] = useState([])
  const [loading, setLoading] = useState(true)

  const menuItems = [
    {
      path: "/",
      icon: FaHome,
      label: "Go to Homepage",
      external: true,
    },
    {
      path: "/dashboard",
      icon: FaChartBar,
      label: "Overview",
      exact: true,
    },
    {
      path: "/dashboard/all-listings",
      icon: FaList,
      label: "All Listings",
    },
    {
      path: "/dashboard/my-listings",
      icon: FaCog,
      label: "Manage Listings",
    },
    {
      path: "/dashboard/add-listing",
      icon: FaPlus,
      label: "Add Listing",
    },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch user's listings first
        console.log("Fetching user listings for:", user?.email)
        const myListingsResponse = await fetch(`https://find-roommate-server.vercel.app/roommates/user/${user?.email}`)

        if (!myListingsResponse.ok) {
          throw new Error(`Failed to fetch user listings: ${myListingsResponse.status}`)
        }

        const myListingsData = await myListingsResponse.json()
        console.log("User listings response:", myListingsData)

        // Fetch total listings count
        console.log("Fetching total listings count...")
        const totalListingsResponse = await fetch("https://find-roommate-server.vercel.app/roommates")

        if (!totalListingsResponse.ok) {
          throw new Error(`Failed to fetch total listings: ${totalListingsResponse.status}`)
        }

        const allListingsData = await totalListingsResponse.json()
        console.log("All listings response:", allListingsData)

        // Set user listings
        const userListingsArray = Array.isArray(myListingsData) ? myListingsData : []
        setUserListings(userListingsArray)

        // Calculate stats
        const totalListingsCount = Array.isArray(allListingsData) ? allListingsData.length : 0
        const myListingsCount = userListingsArray.length

        const totalViews = userListingsArray.reduce((sum, listing) => {
          const views = Number.parseInt(listing.views) || 0
          console.log(`Listing ${listing.title}: ${views} views`)
          return sum + views
        }, 0)

        const activeListings = userListingsArray.filter((listing) => {
          const isAvailable =
            listing.availability === "available" ||
            listing.availability === "Available" ||
            listing.status === "available" ||
            listing.status === "Available"
          console.log(
            `Listing ${listing.title}: availability=${listing.availability}, status=${listing.status}, isAvailable=${isAvailable}`,
          )
          return isAvailable
        }).length

        console.log("Calculated stats:", {
          totalListings: totalListingsCount,
          myListings: myListingsCount,
          totalViews: totalViews,
          activeListings: activeListings,
        })

        setStats({
          totalListings: totalListingsCount,
          myListings: myListingsCount,
          totalViews: totalViews,
          activeListings: activeListings,
        })
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        // Try alternative API endpoints
        try {
          console.log("Trying alternative endpoints...")

          // Try different endpoint for total count
          const countResponse = await fetch("https://find-roommate-server.vercel.app/roommates/count")
          if (countResponse.ok) {
            const countData = await countResponse.json()
            console.log("Count endpoint response:", countData)

            setStats((prevStats) => ({
              ...prevStats,
              totalListings: countData.count || countData.total || 0,
            }))
          }
        } catch (altError) {
          console.error("Alternative fetch also failed:", altError)
        }
      } finally {
        setLoading(false)
      }
    }

    if (user?.email) {
      fetchDashboardData()
    } else {
      console.log("No user email available")
      setLoading(false)
    }
  }, [user])

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  // Overview Component
  const DashboardOverview = () => (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, {user?.displayName || "User"}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your listings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs lg:text-sm font-medium">Total Listings</p>
              <p className="text-xl lg:text-3xl font-bold text-primary">{stats.totalListings}</p>
            </div>
            <div className="bg-primary text-white p-2 lg:p-3 rounded-full">
              <FaHome size={16} className="lg:w-5 lg:h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs lg:text-sm font-medium">My Listings</p>
              <p className="text-xl lg:text-3xl font-bold text-secondary">{stats.myListings}</p>
            </div>
            <div className="bg-secondary text-white p-2 lg:p-3 rounded-full">
              <FaUsers size={16} className="lg:w-5 lg:h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs lg:text-sm font-medium">Total Views</p>
              <p className="text-xl lg:text-3xl font-bold text-green-600">{stats.totalViews}</p>
            </div>
            <div className="bg-green-600 text-white p-2 lg:p-3 rounded-full">
              <FaEye size={16} className="lg:w-5 lg:h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs lg:text-sm font-medium">Active Listings</p>
              <p className="text-xl lg:text-3xl font-bold text-blue-600">{stats.activeListings}</p>
            </div>
            <div className="bg-blue-600 text-white p-2 lg:p-3 rounded-full">
              <FaChartBar size={16} className="lg:w-5 lg:h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          <Link
            to="/add-listings"
            className="btn bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2 py-3"
          >
            <FaPlus />
            <span className="text-sm lg:text-base">Add New Listing</span>
          </Link>
          <Link
            to="/my-listings"
            className="btn bg-secondary text-white hover:bg-secondary/90 flex items-center justify-center gap-2 py-3"
          >
            <FaList />
            <span className="text-sm lg:text-base">Manage Listings</span>
          </Link>
          <Link
            to="/browse-listings"
            className="btn bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2 py-3"
          >
            <FaEye />
            <span className="text-sm lg:text-base">Browse All</span>
          </Link>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Mobile Header */}
      <div className="lg:hidden bg-primary shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-white hover:bg-opacity-10">
          {isSidebarOpen ? (
            <FaTimes size={20} className="text-secondary" />
          ) : (
            <FaBars size={20} className="text-secondary" />
          )}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
    fixed lg:static inset-y-0 left-0 z-50 w-64 min-h-screen bg-primary shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
`}
        >
          {/* Desktop Header */}
          <div className="hidden lg:block p-6 border-b border-white border-opacity-20">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <p className="text-sm text-white text-opacity-70">Manage your listings</p>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      item.external
                        ? "text-white hover:text-secondary"
                        : isActive(item.path, item.exact)
                          ? "text-secondary"
                          : "text-white hover:text-secondary"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile and Logout */}
          <div className="p-4 border-t border-white border-opacity-20 space-y-4">
            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={user?.photoURL || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-white">{user?.displayName || "User"}</p>
                <p className="text-xs text-white text-opacity-70 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 p-3 text-white hover:text-secondary rounded-lg transition-colors"
            >
              <FaSignOutAlt size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">{location.pathname === "/dashboard" ? <DashboardOverview /> : <Outlet />}</div>
      </div>
    </div>
  )
}

export default Dashboard
