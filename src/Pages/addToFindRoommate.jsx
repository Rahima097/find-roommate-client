import React, { useContext } from 'react';
import Swal from "sweetalert2";
import { AuthContext } from '../Provider/AuthProvider'; // Adjust path accordingly

const AddToFindRoommate = () => {
  const { user } = useContext(AuthContext); // get logged-in user

  const handleAddRoommate = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newRoommate = Object.fromEntries(formData.entries());

    if (user?.email) newRoommate.email = user.email;
    if (user?.displayName) newRoommate.name = user.displayName;

    console.log(newRoommate);

    fetch('https://find-roommate-server.vercel.app/roommates', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newRoommate)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          console.log('added successfully');
          Swal.fire({
            title: "Roommate listing added successfully!",
            icon: "success",
            draggable: true
          });
          form.reset();
        }
      })
      .catch(err => {
        console.error('Failed to add roommate:', err);
        Swal.fire({
          title: "Error!",
          text: "Failed to add roommate listing.",
          icon: "error"
        });
      });
  };

  return (
    <div className="mx-auto  bg-base-200 py-12">
      <div className='lg:md:w-5/12 w-full mx-auto'>
        <h2 className="text-3xl font-bold mb-4 text-primary text-center">Add To Find Your Roommate Listing</h2>
        <p className='text-center pb-6 text-secondary'>
          Fill out the form below to share your roommate listing. Provide accurate details about your living space,
          preferences, and contact information to help potential roommates connect with you easily and efficiently.
          Make your listing stand out with clear, honest information!
        </p>
      </div>
      <form onSubmit={handleAddRoommate} className="lg:md:w-5/12 w-full mx-auto grid grid-cols-2 gap-4 p-10 bg-white">
        <input name="title" placeholder="Title" className="input input-bordered col-span-2 w-full" required />
        <input name="location" placeholder="Location" className="input input-bordered w-full" required />
        <input name="rentAmount" type="number" placeholder="Rent Amount" className="input input-bordered w-full" required />
        <select name="roomType" className="select select-bordered w-full" required>
          <option>Single</option>
          <option>Shared</option>
        </select>
        <input name="lifestyle" placeholder="Lifestyle Preferences" className="input input-bordered w-full" required />
        <input name="imageUrl" type="url" placeholder="Image URL" className="input input-bordered col-span-2 w-full" required />
        <textarea name="description" placeholder="Description" className="textarea textarea-bordered col-span-2 w-full" required />
        <input name="contact" placeholder="Contact Info" className="input input-bordered w-full" required />
        <select name="availability" className="select select-bordered w-full" defaultValue="available">
          <option value="available">Available</option>
          <option value="not available">Not Available</option>
        </select>
        <input
          name="email"
          type="email"
          className="input input-bordered bg-gray-100 w-full"
          value={user?.email || ''}
          readOnly
          required
        />
        <input
          name="name"
          type="text"
          className="input input-bordered bg-gray-100 w-full"
          value={user?.displayName || ''}
          readOnly
          required
        />
        <button type="submit" className="btn btn-primary col-span-2">Add</button>
      </form>
    </div>
  );
};

export default AddToFindRoommate;