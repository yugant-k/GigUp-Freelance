// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";

// const Orders = () => {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const navigate = useNavigate();
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () =>
//       newRequest.get(`/orders`).then((res) => {
//         return res.data;
//       }),
//   });



//   return (
//     <div className="flex justify-center text-gray-700 font-[Roboto] mx-20">
//       <div className="w-full py-12">
//         <div className="flex justify-between">
//           <h1 className="mx-3 mb-7 font-semibold text-3xl"> Your Orders</h1>
//         </div>
//         <table className="w-full">
//           <tr className="h-12 ">
//             <th className="text-left px-5">Image</th>
//             <th className="text-left px-5">Title</th>
//             <th className="text-left px-5">Price</th>
//             <th className="text-left px-5">{currentUser.isSeller ? "Buyer" : "Seller"}</th>
//             <th className="text-left px-5">Contact</th>
//           </tr>
//           <tr className="h-12 even:bg-green-100 font-light">
//             <td>
//               <img
//                 className="w-12 h-6 object-cover mx-3 rounded-sm"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Stunning concept art</td>
//             <td>
//             &#x20B9; 599
//             </td>
//             <td>Maria Anders</td>
//             <td>
//               <img className="w-6 cursor-pointer mx-8" src="./img/message.png" alt="" />
//             </td>
//           </tr>
//           <tr className="h-12 even:bg-green-100 font-light">
//             <td>
//               <img
//                 className="w-12 h-6 object-cover mx-3 rounded-sm"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Ai generated concept art</td>
//             <td>
//             &#x20B9; 799
//             </td>
//             <td>Francisco Chang</td>
//             <td>
//               <img className="w-6 cursor-pointer mx-8" src="./img/message.png" alt="" />
//             </td>
//           </tr>
//           <tr className="h-12 even:bg-green-100 font-light">
//             <td>
//               <img
//                 className="w-12 h-6 object-cover mx-3 rounded-sm"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>High quality digital character</td>
//             <td>
//             &#x20B9; 1109
//             </td>
//             <td>Roland Mendel</td>
//             <td>
//               <img className="w-6 cursor-pointer mx-8" src="./img/message.png" alt="" />
//             </td>
//           </tr>
//           <tr className="h-12 even:bg-green-100 font-light">
//             <td>
//               <img
//                 className="w-12 h-6 object-cover mx-3 rounded-sm"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Illustration hyper realistic painting</td>
//             <td>
//             &#x20B9; 399
//             </td>
//             <td>Helen Bennett</td>
//             <td>
//               <img className="w-6 cursor-pointer mx-8" src="./img/message.png" alt="" />
//             </td>
//           </tr>
//           <tr className="h-12 even:bg-green-100 font-light">
//             <td>
//               <img
//                 className="w-12 h-6 object-cover mx-3 rounded-sm"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Original ai generated digital art</td>
//             <td>
//             &#x20B9; 1199
//             </td>
//             <td>Yoshi Tannamuri</td>
//             <td>
//               <img className="w-6 cursor-pointer mx-8" src="./img/message.png" alt="" />
//             </td>
//           </tr>
//           <tr className="h-12 even:bg-green-100 font-light">
//             <td>
//               <img
//                 className="w-12 h-6 object-cover mx-3 rounded-sm"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Text based ai generated art</td>
//             <td>
//             &#x20B9; 499
//             </td>
//             <td>Giovanni Rovelli</td>
//             <td>
//               <img className="w-6 cursor-pointer mx-8" src="./img/message.png" alt="" />
//             </td>
//           </tr>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders flex justify-center text-gray-700 font-[Roboto] mx-20">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container w-full py-12">
          <div className="title flex justify-between">
          <h1 className="mx-3 mb-7 font-semibold text-3xl"> Your Orders</h1>
          </div>
          <table className="w-full">
            <tr className="h-12 ">
              <th className="text-left px-5">Image</th>
              <th className="text-left px-5">Title</th>
              <th className="text-left px-5">Price</th>
              <th className="text-left px-5">Contact</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id} className="h-12 even:bg-green-100 font-light">
                <td>
                  <img className="image w-12 h-6 object-cover mx-3 rounded-sm" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>&#x20B9;  {order.price}</td>
                <td>
                  <img
                    className="message w-[25px] cursor-pointer"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
