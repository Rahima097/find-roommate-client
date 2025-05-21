import React from 'react';
import { Link } from 'react-router';

const browseListings = () => {
    return (
        <div className="overflow-x-auto p-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Rent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         
            <tr >
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td><Link to="" className="btn btn-sm btn-outline">See More</Link></td>
            </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default browseListings;