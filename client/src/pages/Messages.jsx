// import React from "react";
// import { Link } from "react-router-dom";

// const Messages = () => {
//   const currentUser = {
//     id: 1,
//     username: "Tejal",
//     isSeller: true,
//   };

//   const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
//   maxime cum corporis esse aspernatur laborum dolorum? Animi
//   molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
//   nobis praesentium placeat.`;

//   return (
//     <div className="flex justify-center font-[Roboto]">
//       <div className="w-full max-w-6xl px-0 py-12">
//         <div className="flex justify-between mb-6">
//           <h1 className='mx-5 font-semibold text-3xl'>Your Messages</h1>
//         </div>
//         <table className="w-full ">
//           <thead>
//             <tr className="h-20">
//               <th className="text-left px-5">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
//               <th className="text-left px-5">Last Message</th>
//               <th className="text-left px-5">Date</th>
//               <th className="text-left px-5">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Repeat these rows as needed */}
//             <tr className="h-16 bg-green-100 even:bg-green-50 px-5 text-slate-600 ">
//               <td className="font-md px-5">Charley Sharp</td>
//               <td className="px-2 text-gray-500">
//                 <Link to="/message/123" className="text-blue-500 hover:text-blue-600 font-light">
//                   {message.substring(0, 100)}...
//                 </Link>
//               </td>
//               <td className="px-2 text-gray-500 font-light">1 hour ago</td>
//               <td className="px-5">
//                 <button className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer">
//                   Mark as Read
//                 </button>
//               </td>
//             </tr>
//             {/* More rows can be added similarly */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Messages;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages flex justify-center font-[Roboto]">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container w-full max-w-6xl px-0 py-12">
          <div className="title flex justify-between mb-6">
            <h1 className='mx-5 font-semibold text-3xl'>Messages</h1>
          </div>
          <table className="w-full ">
          <thead>
            <tr className="h-20">
              <th className="text-left px-5">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th className="text-left px-5">Last Message</th>
              <th className="text-left px-5">Date</th>
              <th className="text-left px-5">Action</th>
            </tr>
            </thead>
            <tbody>
            {data.map((c) => (
              <tr
                className={
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  "active h-16 bg-green-100 even:bg-green-50 px-5 text-slate-600"
                }
                key={c.id}
              >
                <td className="font-md px-5">{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                <td className="px-2 text-gray-500">
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td className="px-2 text-gray-500 font-light">{moment(c.updatedAt).fromNow()}</td>
                <td className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer">
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
