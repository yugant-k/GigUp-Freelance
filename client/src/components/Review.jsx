import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.userId],
      queryFn: () =>
        newRequest.get(`/users/${review.userId}`).then((res) => {
          console.log("reviewer", res.data)
          return res.data;
        }),
    },
  );


  return (
    <div className="review flex flex-col gap-[20px] mx-0 my-[20px]">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user flex items-center">
          <img className="pp h-[50px] w-[50px] rounded-[50%]" src={data.img || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country flex items-center gap-[10px] text-[gray]">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars flex gap-[5px]">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} className="h-[14px] w-[14px]" />
          ))}
        <span className="text-[14px] font-bold text-[#ffc108]">{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful flex items-center gap-[10px]">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" className="w-[14px]"/>
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" className="w-[14px]"/>
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;