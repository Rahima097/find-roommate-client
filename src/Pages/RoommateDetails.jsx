import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';

const RoommateDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;


  const [roommate, setRoommate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://find-roommate-server.vercel.app/roommates/${id}`);
        const data = await res.json();
        setRoommate(data);
        setLikeCount(data.likes || 0);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async () => {
    if (!roommate) return;

    if (roommate.email === userEmail) {
    toast.error("You can't like your own post.");
    return;
  }

    try {
      const res = await fetch(`https://find-roommate-server.vercel.app/roommates/${id}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: likeCount + 1 })
      });

      const result = await res.json();
      if (result.modifiedCount > 0) {
        setLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!roommate || roommate.error) return <div className="text-center mt-10 text-red-500">Roommate not found</div>;

  const {
    title, name, email, contact, roomType, lifestyle,
    location, rentAmount, availability, description
  } = roommate;

  return (
    <div className='bg-base-200 py-18'>
      <div className="mb-6 text-2xl font-semibold text-secondary text-center">(
        {likeCount} {likeCount === 1 ? 'person' : 'people'} interested in this listing)
      </div>
      <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="lg:text-3xl text-xl font-bold text-primary">{title}</h2>
          <div className="flex flex-col items-end">
            <button
              onClick={handleLike}
              className={`text-2xl ${liked ? 'text-red-600' : 'text-red-400'} hover:text-red-600 transition`}
            >
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

        <p className="text-lg text-gray-600 mb-4">{description}</p>

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
    </div>
  );
};

export default RoommateDetails;
