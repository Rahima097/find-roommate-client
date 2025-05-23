import React from 'react';
import { Link } from 'react-router';

const RoommateCard = ({ roommate }) => {
    const { _id, title, location, rentAmount, roomType, lifestyle = [], description, name } = roommate;
    return (
        <div className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300">
            {/* <figure>
                <img
                    src={""}
                    alt="Roommate"
                    className="w-full h-48 object-cover"
                />
            </figure> */}
            <div className="card-body">
                <h2 className="card-title text-2xl text-primary font-bold">{title}</h2>
                <p className="text-sm text-gray-600">{description}</p>
                <div className="mt-2 space-y-1 text-sm">
                    <p><span className="font-medium">Location:</span> {location}</p>
                    <p><span className="font-medium">Rent:</span> BDT {rentAmount}</p>
                    <p><span className="font-medium">Room Type:</span> {roomType}</p>
                    <p><span className="font-medium">Posted by:</span> {name}</p>
                    <p><span className="font-medium">Lifestyle:</span> {' '}
                        {Array.isArray(lifestyle)
                            ? lifestyle.join(', ')
                            : lifestyle || 'Not specified'}</p>
                </div>
                <div className="card-actions justify-end mt-4">
                    <Link to={`/roommate/${roommate._id}`}>
                        <button className="btn btn-primary text-white btn-sm">See More</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default RoommateCard;