import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaEye, FaPlus, FaList, FaCog, FaChartBar, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalListings: 0,
        myListings: 0,
        totalViews: 0,
        activeListings: 0
    });
    const [userListings, setUserListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const menuItems = [
        {
            path: '/',
            icon: FaHome,
            label: 'Go to Homepage',
            external: true
        },
        {
            path: '/dashboard',
            icon: FaChartBar,
            label: 'Overview',
            exact: true
        },
        {
            path: '/dashboard/all-listings',
            icon: FaList,
            label: 'All Listings'
        },
        {
            path: '/dashboard/my-listings',
            icon: FaCog,
            label: 'Manage Listings' 
        },
        {
            path: '/dashboard/add-listing',
            icon: FaPlus,
            label: 'Add Listing'
        },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const myListingsResponse = await fetch(`https://find-roommate-server.vercel.app/roommates/user/${user?.email}`);
                const myListingsData = await myListingsResponse.json();

                const totalListingsResponse = await fetch('https://find-roommate-server.vercel.app/roommates/count');
                const totalListingsData = await totalListingsResponse.json();

                setUserListings(myListingsData);

                setStats({
                    totalListings: totalListingsData.count || 0,
                    myListings: myListingsData.length || 0,
                    totalViews: myListingsData.reduce((sum, listing) => sum + (listing.views || 0), 0),
                    activeListings: myListingsData.filter(listing => listing.availability === 'available').length || 0
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchDashboardData();
        }
    }, [user]);

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    // Overview Component
    const DashboardOverview = () => (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Welcome back, {user?.displayName || 'User'}!</h1>
                <p className="text-base-content/70 mt-2">Here's what's happening with your listings</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base-content/60 text-sm font-medium">Total Listings</p>
                                <p className="text-3xl font-bold">{stats.totalListings}</p>
                            </div>
                            <div className="btn btn-primary btn-circle">
                                <FaHome size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base-content/60 text-sm font-medium">My Listings</p>
                                <p className="text-3xl font-bold">{stats.myListings}</p>
                            </div>
                            <div className="btn btn-secondary btn-circle">
                                <FaUsers size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base-content/60 text-sm font-medium">Total Views</p>
                                <p className="text-3xl font-bold">{stats.totalViews}</p>
                            </div>
                            <div className="btn btn-accent btn-circle">
                                <FaEye size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base-content/60 text-sm font-medium">Active Listings</p>
                                <p className="text-3xl font-bold">{stats.activeListings}</p>
                            </div>
                            <div className="btn btn-info btn-circle">
                                <FaChartBar size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                    <h2 className="card-title mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to="/add-listings" className="btn btn-primary">
                            <FaPlus className="mr-2" />
                            Add New Listing
                        </Link>
                        <Link to="/my-listings" className="btn btn-secondary">
                            <FaList className="mr-2" />
                            Manage Listings
                        </Link>
                        <Link to="/browse-listings" className="btn btn-accent">
                            <FaEye className="mr-2" />
                            Browse All
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 min-h-screen bg-base-100 shadow-lg flex flex-col">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Dashboard</h2>
                        <p className="text-sm text-base-content/60">Manage your listings</p>
                    </div>

                    <ul className="menu p-4 space-y-2 flex-1">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                {item.hasDropdown && userListings.length > 0 ? (
                                    <details>
                                        <summary className={`flex items-center gap-3 ${
                                            isActive(item.path) 
                                                ? 'bg-primary text-primary-content' 
                                                : 'hover:bg-base-200'
                                        }`}>
                                            <item.icon size={18} />
                                            {item.label}
                                            <FaChevronDown size={12} className="ml-auto" />
                                        </summary>
                                        <ul className="ml-6 mt-2 space-y-1">
                                            {userListings.map((listing) => (
                                                <li key={listing._id}>
                                                    <Link
                                                        to={`/dashboard/update-listing/${listing._id}`}
                                                        className="text-sm hover:bg-base-200 rounded p-2 block truncate"
                                                        title={listing.title}
                                                    >
                                                        {listing.title.length > 25 ? listing.title.substring(0, 25) + '...' : listing.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 ${
                                            item.external 
                                                ? 'text-primary hover:bg-base-200' 
                                                : isActive(item.path, item.exact)
                                                    ? 'bg-primary text-primary-content'
                                                    : 'hover:bg-base-200'
                                            }`}
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* User Profile and Logout */}
                    <div className="p-4 border-t space-y-4">
                        {/* User Profile */}
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL || '/placeholder.svg'} alt="Profile" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user?.displayName || 'User'}</p>
                                <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="btn btn-error btn-outline w-full flex items-center gap-2"
                        >
                            <FaSignOutAlt size={16} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {location.pathname === '/dashboard' ? <DashboardOverview /> : <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;