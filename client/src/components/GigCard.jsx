import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        //console.log("user")
        //console.log(res.data.data)
        return res.data.data;
      }),
  });
console.log(item._id);
  return (
    <Link to={`/gigs/single/${item._id}`} className="link">
      <div className="w-[60vh] h-[86.2vh] border border-gray-300 mb-10 font-[Roboto]">
        <img src={item.coverImage} alt="" className="img w-full h-1/2 object-cover" />
        <div className="info px-[20px] py-[10px] flex flex-col gap-5 font-[Roboto]">
        {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
            
          ) : (
          <div className="user flex items-center gap-2.5 ">
            <img src={data.img || "/img/noavatar.jpg"} alt="" className="w-[26px] h-[26px] rounded-[50%] object-cover" />
            <span>{data.username}</span>
          </div>
          )}
          <p className="text-[#111] font-light overflow-hidden overflow-ellipsis whitespace-nowrap
">{item.title}</p>
          <div className="star flex items-center gap-[5px]">
            <img src="./img/star.png" alt="" className="h-[14px] w-[14px]" />
            <span className="text-[14px] font-bold text-[#ffc108]">{!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
                </span>
          </div>
        </div>
        <hr className="h-[0] border-[0.5px] border-[solid] border-[#e4e4e4]" />
        <div className="detail p-2.5 px-5 flex items-center justify-between">
          <img src="./img/heart.png" alt="" className="w-4 h-4 cursor-pointer object-cover" />
          <div className="price">
            <span className="text-[#999] text-[12px]">STARTING AT</span>
            <h2 className="text-[#555] text-[18px] font-normal">
            &#x20B9; {item.price}
              {/* <sup className="text-[12px] font-light">99</sup> */}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
