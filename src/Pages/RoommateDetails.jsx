import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const RoommateDetails = () => {
  const { id } = useParams();
  const [roommate, setRoommate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 🔐 Replace this with actual user email from auth context
  const userEmail = "user@example.com"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get roommate data
        const res = await fetch(`http://localhost:3000/roommates/${id}`);
        const data = await res.json();
        setRoommate(data);
        setLikeCount(data.likes || 0);

        // Check if this user already liked the listing
        const likeRes = await fetch(`http://localhost:3000/roommates/${id}/liked/${userEmail}`);
        const likeData = await likeRes.json();
        setLiked(likeData.liked);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, userEmail]);

  // Handle like action
  const handleLike = async () => {
    if (liked) return; // Prevent multiple likes

    try {
      const res = await fetch(`http://localhost:3000/roommates/${id}/like-tracked`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      });

      const result = await res.json();

      if (result.liked) {
        setLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!roommate || roommate.error) return <div className="text-center mt-10 text-red-500">Roommate not found</div>;

  const {
    title,
    name,
    email,
    contact,
    roomType,
    lifestyle,
    location,
    rentAmount,
    availability,
    description
  } = roommate;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-16">
      <div className="mb-4 text-xl font-semibold text-secondary text-center p-10">
        ({likeCount} {likeCount === 1 ? 'person' : 'people'} interested in this listing)
      </div>

      {/* Title and like button */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-bold text-primary">{title}</h2>
        <div className="flex flex-col items-end">
          <button onClick={handleLike} className="text-2xl text-red-500">
            {liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <span className="text-sm mt-1 text-gray-700">
            {liked ? (
              <>Contact: <span className="font-semibold">{contact}</span></>
            ) : (
              <span className="italic text-gray-500">Like to get contact</span>
            )}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-4">{description}</p>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Room Type:</strong> {roomType}</p>
        <p><strong>Lifestyle:</strong> {Array.isArray(lifestyle) ? lifestyle.join(', ') : lifestyle || 'Not specified'}</p>
        <p><strong>Rent:</strong> BDT {rentAmount}</p>
        <p><strong>Availability:</strong> {availability}</p>
      </div>
    </div>
  );
};

export default RoommateDetails;
