import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaMoneyBillWave, FaHome, FaUser, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Custom Card Component for Browse Listings
const BrowseListingCard = ({ roommate, index }) => {
    const { _id, title, location, rentAmount, roomType, name, imageUrl, availability } = roommate;
    
    // Function to convert ImgBB share URL to direct image URL
    const getDirectImageUrl = (url) => {
        if (!url) return "/placeholder.svg?height=200&width=300";
        
        // If it's already a direct image URL, return as is
        if (url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.webp')) {
            return url;
        }
        
        // Convert ImgBB share URL to direct URL
        if (url.includes('ibb.co/')) {
            const imageId = url.split('/').pop();
            return `https://i.ibb.co/${imageId}.jpg`;
        }
        
        return url;
    };

    return (
        <div className="card bg-base-100 shadow-xl border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
            {/* Image Section */}
            <figure className="relative">
                <img
                    src={getDirectImageUrl(imageUrl) || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        // Try different extensions if first one fails
                        const currentSrc = e.target.src;
                        if (currentSrc.includes('.jpg')) {
                            e.target.src = currentSrc.replace('.jpg', '.png');
                        } else if (currentSrc.includes('.png')) {
                            e.target.src = currentSrc.replace('.png', '.jpeg');
                        } else if (currentSrc.includes('.jpeg')) {
                            e.target.src = "/placeholder.svg?height=200&width=300";
                        } else {
                            e.target.src = "/placeholder.svg?height=200&width=300";
                        }
                    }}
                />
                {/* Serial Number Badge */}
                <div className="absolute top-3 left-3">
                    <div className="badge badge-neutral text-white font-bold">
                        #{index + 1}
                    </div>
                </div>
                {/* Availability Badge */}
                <div className="absolute top-3 right-3">
                    <div className={`badge font-semibold ${
                        availability === 'available' 
                            ? 'badge-success text-white' 
                            : 'badge-error text-white'
                    }`}>
                        {availability === 'available' ? (
                            <>
                                <FaCheckCircle className="mr-1" />
                                Available
                            </>
                        ) : (
                            <>
                                <FaTimesCircle className="mr-1" />
                                Not Available
                            </>
                        )}
                    </div>
                </div>
                {/* Room Type Badge */}
                <div className="absolute bottom-3 left-3">
                    <div className="badge badge-primary text-white font-semibold">
                        <FaHome className="mr-1" />
                        {roomType}
                    </div>
                </div>
            </figure>

            <div className="card-body p-5">
                {/* Title */}
                <h2 className="card-title text-lg text-primary font-bold mb-3 line-clamp-2">
                    {title}
                </h2>
                
                {/* Details Grid */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                        <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                        <span className="truncate">{location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                        <FaMoneyBillWave className="text-success flex-shrink-0" />
                        <span className="font-semibold text-success">BDT {rentAmount}/month</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                        <FaUser className="text-secondary flex-shrink-0" />
                        <span className="truncate">Posted by {name}</span>
                    </div>
                </div>
                
                {/* Action Button */}
                <div className="card-actions justify-end mt-auto">
                    <Link to={`/roommate/${_id}`} className="w-full">
                        <button className="btn btn-primary w-full text-white hover:btn-primary-focus transition-colors">
                            See More Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Main Browse Listings Component
const BrowseListings = () => {
    const [roommates, setRoommates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://find-roommate-server.vercel.app/roommates')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch listings');
                }
                return res.json();
            })
            .then(data => {
                setRoommates(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch listings:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="bg-base-200 py-16 min-h-screen">
                <div className="w-10/12 mx-auto text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-lg">Loading all listings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-base-200 py-16 min-h-screen">
                <div className="w-10/12 mx-auto text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold mb-2 text-error">Error Loading Listings</h3>
                    <p className="text-base-content/60">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="btn btn-primary mt-4"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-base-200 py-16 min-h-screen'>
            <div className='w-10/12 mx-auto'>
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-primary mb-2">Browse All Room Listings</h1>
                    <p className="text-lg text-base-content/70 mb-4">Find the perfect roommate for your needs</p>
                    
                    {/* Stats */}
                    <div className="stats shadow bg-base-100 mb-6">
                        <div className="stat">
                            <div className="stat-title">Total Listings</div>
                            <div className="stat-value text-primary">{roommates.length}</div>
                            <div className="stat-desc">Available properties</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Available Now</div>
                            <div className="stat-value text-success">
                                {roommates.filter(r => r.availability === 'available').length}
                            </div>
                            <div className="stat-desc">Ready to move in</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Room Types</div>
                            <div className="stat-value text-secondary">
                                {[...new Set(roommates.map(r => r.roomType))].length}
                            </div>
                            <div className="stat-desc">Different options</div>
                        </div>
                    </div>
                </div>

                {/* Listings Grid */}
                {roommates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {roommates.map((roommate, index) => (
                            <BrowseListingCard 
                                key={roommate._id} 
                                roommate={roommate} 
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏠</div>
                        <h3 className="text-xl font-semibold mb-2">No Listings Found</h3>
                        <p className="text-base-content/60 mb-4">There are currently no roommate listings available.</p>
                        <Link to="/add-listings" className="btn btn-primary">
                            Add Your Listing
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseListings;