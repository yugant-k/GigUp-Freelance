import React from "react";
import { Link } from "react-router-dom";

function CatCard({ card }) {
  return (
    <Link to={`/gigs?category=${card.category}`}>
      <div className="w-[252px] h-[344px] text-white rounded-lg relative cursor-pointer z-10 bg-transparent">
        <img src={card.img} alt="" className="w-full h-full" />
        <span className="font-light absolute top-[15px] left-[15px]">{card.desc}</span>
        <span className="absolute top-[40px] left-[15px] text-xl font-medium">{card.title}</span>
      </div>
    </Link>
  );
}

export default CatCard;

