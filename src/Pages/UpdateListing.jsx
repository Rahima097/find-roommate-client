import { useContext, useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const UpdateListing = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [listing, setListing] = useState(null);

    // Fetch listing data by ID
    useEffect(() => {
        fetch(`https://find-roommate-server.vercel.app/roommates/${id}`)
            .then(res => res.json())
            .then(data => setListing(data))
            .catch(err => console.error('Error loading listing:', err));
    }, [id]);

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedRoommate = Object.fromEntries(formData.entries());

        fetch(`https://find-roommate-server.vercel.app/roommates/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedRoommate)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0 || data.matchedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Roommate listing updated successfully!',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire({
                        title: 'No Changes',
                        text: 'No data was updated.',
                        icon: 'info',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            })
            .catch(err => {
                console.error('Update failed:', err);
                Swal.fire('Error', 'Something went wrong during update.', 'error');
            });
    };

    if (!listing) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="py-10">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">Update Roommate Listing</h2>
            <form onSubmit={handleUpdate} className="lg:md:w-5/12 w-full mx-auto grid grid-cols-2 gap-4 p-10 bg-white shadow rounded">
                <input name="title" defaultValue={listing.title} className="w-full input input-bordered col-span-2" required />
                <input name="location" defaultValue={listing.location} className="w-full input input-bordered" required />
                <input name="rentAmount" type="number" defaultValue={listing.rentAmount} className="w-full input input-bordered" required />
                <select name="roomType" defaultValue={listing.roomType} className="w-full select select-bordered" required>
                    <option value="Single">Single</option>
                    <option value="Shared">Shared</option>
                </select>
                <input name="lifestyle" defaultValue={listing.lifestyle} className="w-full input input-bordered" required />
                <input name="imageUrl" type="url" defaultValue={listing.imageUrl || ''} placeholder="Image URL" className="w-full input input-bordered col-span-2" required />
                <textarea name="description" defaultValue={listing.description} className="w-full textarea textarea-bordered col-span-2" required />
                <input name="contact" defaultValue={listing.contact} className="w-full input input-bordered" required />
                <select name="availability" defaultValue={listing.availability} className="w-full select select-bordered">
                    <option value="available">Available</option>
                    <option value="not available">Not Available</option>
                </select>
                <input
                    name="email"
                    value={user?.email || listing.email || ''}
                    readOnly
                    className="w-full input input-bordered bg-gray-100"
                />
                <input
                    name="name"
                    value={user?.displayName || listing.name || ''}
                    readOnly
                    className="w-full input input-bordered bg-gray-100"
                />
                <button type="submit" className="w-full btn btn-primary col-span-2">Update</button>
            </form>
        </div>
    );
};

export default UpdateListing;