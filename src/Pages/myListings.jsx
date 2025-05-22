import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const MyListings = () => {
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/roommates/mylistings?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setListings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch user listings:', err);
                setLoading(false);
            });
    }, [user?.email]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this listing?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:3000/roommates/${id}`, {
                method: 'DELETE',
            });

            const result = await res.json();

            if (res.ok && result.deletedCount > 0) {
                setListings(prev => prev.filter(listing => listing._id !== id));
                Swal.fire('Deleted!', 'Your listing has been deleted.', 'success');
            } else {
                Swal.fire('Error!', 'Failed to delete the listing.', 'error');
            }
        } catch (err) {
            console.error('Delete error:', err);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    if (loading) return <div className="text-center py-10">Loading your listings...</div>;
    if (!listings.length) return <div className="text-center py-10">No listings found</div>;

    return (
        <div className="w-11/12 mx-auto py-20">
            <h1 className="text-3xl font-bold mb-6 text-center">My Listings</h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table w-full">
                    <thead className="bg-primary text-white">
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
                        {listings.map((listing, index) => (
                            <tr key={listing._id}>
                                <td>{index + 1}</td>
                                <td>{listing.title}</td>
                                <td>{listing.location}</td>
                                <td>BDT {listing.rentAmount}</td>
                                <td>{listing.roomType}</td>
                                <td>{listing.availability}</td>
                                <td>
                                    <Link
                                        to={`/mylistings/update/${listing._id}`}
                                        className="btn btn-sm btn-outline mr-2"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(listing._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyListings;
