import React from "react";
import { Link } from "react-router-dom";

function MyGigs() {
  const currentUser = {
    id: 1,
    username: "Tejal",
    isSeller: true,
  };

  return (
    <div className="flex justify-center text-gray-600 font-[Roboto]">
      <div className="container w-full max-w-6xl px-5 py-12">
        <div className="flex justify-between mb-16">
          <h1 className=' font-semibold text-3xl'>{currentUser.isSeller ? " Your Gigs" : "Your Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button className="bg-green-600 text-white font-medium py-2 px-4 border-none cursor-pointer rounded-md">
                Add New Gig
              </button>
            </Link>
          )}
        </div>
        <table className="w-full">
          <tbody>
            <tr className="h-12">
              <th className="text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">Sales</th>
              <th className="text-left">Action</th>
            </tr>
            {/* Example row repeated for demonstration */}
            <tr className="rounded-md h-16 even:bg-green-200">
              <td>
                <img
                  className="w-12 h-12 object-cover mx-2 rounded-md"
                  src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
              </td>
              <td className="font-light">Stunning concept art</td>
              <td className="font-light">&#x20B9; 599</td>
              <td className="font-light">13</td>
              <td>
                <img className="w-5 cursor-pointer" src="./img/delete.png" alt="" />
              </td>
            </tr>
            {/* Additional rows would follow similarly */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyGigs;

