import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const BrowseListings = () => {
  const [roommates, setRoommates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/roommates')
      .then(res => res.json())
      .then(data => setRoommates(data))
      .catch(err => console.error('Failed to fetch listings:', err));
  }, []);
  return (
    <div className='w-11/12 mx-auto py-10'>
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-Secondary mb-2">Browse All Room Listings</h1>
        <p className="text-lg text-black">Find the perfect roommate for your needs</p>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table w-full min-w-[600px] md:min-w-full">
          <thead className='bg-primary text-white '>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Location</th>
              <th>Rent</th>
              <th>Room Type</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roommates.map((roommate, index) => (
              <tr key={roommate._id}>
                <td>{index + 1}</td>
                <td>{roommate.title}</td>
                <td>{roommate.location}</td>
                <td>BDT{roommate.rentAmount}</td>
                <td>{roommate.roomType}</td>
                <td>{roommate.availability}</td>
                <td>
                  <Link to={`/roommate/${roommate._id}`} className="btn btn-sm btn-outline">
                    See More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseListings;