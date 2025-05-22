import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const RoommateDetails = () => {
    const { id } = useParams();
    const [roommate, setRoommate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/roommates/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRoommate(data);
                setLikeCount(data.likes || 0);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch roommate details:', err);
                setLoading(false);
            });
    }, [id]);

    const handleLike = () => {
        if (!liked) {
            setLikeCount((prev) => prev + 1);
        } else {
            setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
        }
        setLiked(!liked);

        console.log(`${!liked ? 'Liked' : 'Unliked'} roommate ID:`, roommate._id);
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
            <div className="mb-4 text-xl font-semibold text-secondary text-center p-10">(
                {likeCount} {likeCount === 1 ? 'person' : 'people'} interested in this listing)
            </div>

            {/* <img src={} alt={title} className="w-full h-72 object-cover rounded-lg mb-4" /> */}

            <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-bold text-primary">{title}</h2>
                <button onClick={handleLike} className="text-2xl text-red-500">
                    {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
            </div>

            <p className="text-lg text-gray-600 mb-4">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Contact:</strong> {contact}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Room Type:</strong> {roomType}</p>
                <p><strong>Lifestyle:</strong> {' '}
                    {Array.isArray(lifestyle)
                        ? lifestyle.join(', ')
                        : lifestyle || 'Not specified'}</p>
                <p><strong>Rent:</strong> BDT {rentAmount}</p>
                <p><strong>Availability:</strong> {availability}</p>
            </div>
        </div>
    );
};

export default RoommateDetails;
