import React from 'react';

const addToFindRoommate = () => {
    return (
        <div className=" mx-auto bg-base-200  py-12">
            <h2 className="text-3xl font-bold mb-4 text-secondary text-center">Add To Find Your Roommate Listing</h2>
            <form className="lg:md:w-5/12 w-full mx-auto grid grid-cols-2 gap-4">
                <input placeholder="Title" className="input input-bordered col-span-2 w-full" required />
                <input  placeholder="Location" className="input input-bordered w-full" required />
                <input type="number" placeholder="Rent Amount" className="input input-bordered w-full" required />
                <select  className="select select-bordered w-full" required>
                    <option>Single</option>
                    <option>Shared</option>
                </select>
                <input  placeholder="Lifestyle Preferences" className="input input-bordered w-full" required />
                <textarea  placeholder="Description" className="textarea textarea-bordered col-span-2 w-full" required />
                <input  placeholder="Contact Info" className="input input-bordered w-full" required />
                <select className="select select-bordered w-full">
                    <option value="available">Available</option>
                    <option value="not available">Not Available</option>
                </select>
                <input className="input input-bordered bg-gray-100 w-full" />
                <input className="input input-bordered bg-gray-100 w-full"  />
                <button type="submit" className="btn btn-primary col-span-2">Add</button>
            </form>
        </div>
    );
};

export default addToFindRoommate;