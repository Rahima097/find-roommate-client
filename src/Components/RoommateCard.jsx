import React from 'react';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaMoneyBillWave, FaHome, FaUser } from 'react-icons/fa';

const RoommateCard = ({ roommate }) => {
    const { _id, title, location, rentAmount, roomType, name, imageUrl } = roommate;
    
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
                {/* Availability Badge */}
                <div className="absolute top-3 right-3">
                    <div className="badge badge-secondary text-white font-semibold">
                        Available
                    </div>
                </div>
                {/* Room Type Badge */}
                <div className="absolute top-3 left-3">
                    <div className="badge badge-primary text-white font-semibold">
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
                        <FaMoneyBillWave className="text-secondary flex-shrink-0" />
                        <span className="font-semibold text-secondary">BDT {rentAmount}/month</span>
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
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoommateCard;