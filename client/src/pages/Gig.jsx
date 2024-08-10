import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from "../components/Slide/Slide2";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../components/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        console.log("gig")
        console.log(res.data.data);
        return res.data.data;
      }),
  });

  const userId = data?.userId;
  console.log("User ID", userId)

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await newRequest.get(`/users/${userId}`);
        console.log("User:", response.data); // Log the API response data
        return response.data.data;
      } catch (error) {
        console.error("API Error:", error); // Log any error
        throw error;
      }
    },
    enabled: !!userId, // Ensure the query runs only if userId is truthy
  });
  
  return (
    <div className="gig flex justify-center px-20 py-5 font-[Roboto]">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
      <div className="container w-full px-0 py-[30px] flex gap-[50px]">
        <div className="left flex-[2] flex flex-col gap-[20px]">
          <span className="breadcrumbs font-light uppercase text-[13px] text-[#555]">GigUp &gt; Graphics & Design 	&gt;</span>
          <h1 className="title font-semibold text-3xl">{data.title}</h1>
          {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
          <div className="user flex items-center gap-[10px]">
            
            <img
              className="pp w-[32px] h-[32px] rounded-[50%] object-cover"
              src={dataUser.img || "/img/noavatar.jpg"}
              alt=""
            />
            <span className="span text-[14px] font-medium">{dataUser.username}</span>
            {!isNaN(data.totalStars / data.starNumber) && (
            <div className="stars flex items-center gap-[5px]">
                  {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" className="h-[14px] w-[14px]" alt="" key={i} />
                      ))}
                    <span className="text-[14px] font-bold text-[#ffc108]">{Math.round(data.totalStars / data.starNumber)}</span>
            </div>
          )}
          </div>
          )}
          <Slider slidesToShow={1} arrowsScroll={1} nextArrow={ <SampleNextArrow to="next"/> } prevArrow={ <SamplePrevArrow to="prev"/> } className="slider bg-[#f5f5f5] max-w-[700px]">
          {data.descMedia.map((descMedia) => (
                <img key={descMedia} src={descMedia} alt="" className="max-h-[500px] object-contain"/>
              ))}
          </Slider>
          <h2 className="h2 font-normal">About This Gig</h2>
          <p className="p font-light leading-[25px] text-[#555]">
          {data.desc}
          </p>
          {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
          <div className="seller mt-[50px] flex flex-col gap-[20px]">
            <h2>About The Seller</h2>
            <div className="user flex items-center gap-[20px]">
              <img
                src={dataUser.img || "/img/noavatar.jpg"}
                className="w-[100px] h-[100px] rounded-[50%] object-cover"
                alt=""
              />
              <div className="info flex flex-col gap-[10px]">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                <div className="stars flex items-center gap-[5px]">
                   {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((_, i) => (
                            <img src="/img/star.png" className="h-[14px] w-[14px]" alt="" key={i} />
                          ))}
                          <span className="text-[14px] font-bold text-[#ffc108]">
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                </div>
                )}
                <button className="bg-[white] rounded-[5px] border-[1px] border-[solid] border-[gray] p-[10px]">Contact Me</button>
              </div>
            </div>
            <div className="box border-[1px] border-[solid] border-[lightgray] rounded-[5px] p-[20px] mt-[20px]">
              <div className="items flex justify-between flex-wrap">
                <div className="item w-[300px] flex flex-col gap-[10px] mb-[20px]">
                  <span className="title font-light">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item w-[300px] flex flex-col gap-[10px] mb-[20px]">
                  <span className="title font-light">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item w-[300px] flex flex-col gap-[10px] mb-[20px]">
                  <span className="title font-light">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item w-[300px] flex flex-col gap-[10px] mb-[20px]">
                  <span className="title font-light">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item w-[300px] flex flex-col gap-[10px] mb-[20px]">
                  <span className="title font-light">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr className="h-[0] border-[0.5px] border-[solid] border-[lightgray] mb-[20px]"/>
              <p>
              {dataUser.desc}
              </p>
            </div>
          </div>
      )}
        <Reviews gigId={id} />
        </div>
        <div className="right flex-[1] border-[1px] border-[solid] border-[lightgray] p-[20px] rounded-[5px] flex flex-col gap-[20px] h-max max-h-[500px] sticky top-[150px]">
          <div className="price flex items-center justify-between">
            <h3 className="font-medium">{data.shortTitle}</h3>
            <h2 className="font-light">&#x20B9; {data.price}</h2>
          </div>
          <p className="text-[gray] mx-0 my-[10px]">
          {data.shortDesc}
          </p>
          <div className="details flex items-center justify-between text-[14px]">
            <div className="item flex items-center gap-[10px]">
              <img src="/img/clock.png" className="w-[20px]" alt="" />
              <span>{data.deliveryDate} Days Delivery</span>
            </div>
            <div className="item flex items-center gap-[10px] font-light text-[gray] mb-[5px]">
              <img className='w-[14px]' src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features ">
          {data.features.map((feature) => (
                <div className="item flex items-center gap-[10px] font-light text-[gray] mb-[5px]" key={feature}>
                  <img src="/img/greencheck.png" className="w-[14px]" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
          </div>
          <Link to={`/pay/${id}`}>
          <button className="bg-[#1dbf73] p-[10px] text-[white] font-medium border-[none] text-[18px] cursor-pointer">Continue</button>
          </Link>
        </div>
      </div>
     )}
    </div>
  );
}

export default Gig;

