import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "./Review"
const Reviews = ({ gigId }) => {

  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        console.log(res.data)
        return res.data.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews mt-[50px]">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data && data.length > 0
        ? data.map((review) => <Review key={review._id} review={review} />)
        : "Be the First Reviewer"
      }
      <div className="add mt-[20px] flex flex-col gap-[20px]">
        <h3>Add a review</h3>
        <form action="" className="addForm flex flex-col gap-[20px]" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" className="p-[20px] border-2"/>
          <select name="" id="" className="w-[200px] p-[20px] self-end border-2">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button className="self-end w-[100px] border-[none] p-[10px] text-[white] bg-[#1dbf73] cursor-pointer">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;