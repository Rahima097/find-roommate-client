import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const RoommateDetails = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [roommate, setRoommate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Fetch roommate details
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/roommates/${id}`);
        const data = await res.json();
        setRoommate(data);
        setLikeCount(data.likes || 0);
        setIsOwner(user?.email === data?.email);
      } catch (error) {
        console.error("Failed to fetch roommate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  // Check if the user already liked this post
  useEffect(() => {
    const checkLikedStatus = async () => {
      if (!user) return;
      const res = await fetch(
        `http://localhost:3000/roommates/${id}/liked/${user.email}`
      );
      const data = await res.json();
      setLiked(data.liked);
    };

    checkLikedStatus();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) return alert("Please login to like this post.");
    if (isOwner) return alert("You cannot like your own post.");

    try {
      const res = await fetch(`http://localhost:3000/roommates/${id}/like-tracked`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email }),
      });
      const data = await res.json();

      if (data.liked) {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!roommate) return <div className="text-center text-red-500 mt-10">Roommate not found</div>;

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
    description,
  } = roommate;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-16">
      <h2 className="text-xl font-semibold text-secondary text-center mb-4">
        {likeCount} {likeCount === 1 ? "person is" : "people are"} interested in this listing
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        <button
          onClick={handleLike}
          disabled={isOwner || liked}
          className={`text-2xl ${liked ? "text-red-600" : "text-gray-400"} hover:text-red-500`}
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>

      {liked && (
        <p className="text-gray-700 text-sm mb-4">
          📞 Contact Number: <span className="font-semibold">{contact}</span>
        </p>
      )}

      <p className="text-lg text-gray-600 mb-4">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Room Type:</strong> {roomType}</p>
        <p><strong>Rent:</strong> BDT {rentAmount}</p>
        <p><strong>Availability:</strong> {availability}</p>
        <p><strong>Lifestyle:</strong> {Array.isArray(lifestyle) ? lifestyle.join(", ") : lifestyle}</p>
      </div>
    </div>
  );
};

export default RoommateDetails;
