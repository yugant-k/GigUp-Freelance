import React from 'react'
import Featured from '../components/Featured'
import TrustedBy from '../components/TrustedBy'
import Slide2 from '../components/Slide/Slide2'
import CatCard from '../components/CatCard'
import ProjectCard from '../components/ProjectCard'
import { cards, projects } from "../data";

function Home() {
  return (
    <div className="home overflow-hidden">
        <Featured/>
        <TrustedBy/>
        <Slide2 slidesToShow={5} arrowsScroll={5}>
          {cards.map((card) => (
            <div key={card.id}>
              <CatCard card={card} />
            </div>
          ))}
        </Slide2>
        <div className="features bg-[#f1fdf7] flex justify-center p-20">
          <div className="container flex items-center gap-48 w-full">
            <div className="item flex-2 flex flex-col gap-4">
              <h1 className="font-medium mb-2 text-2xl !text-gray-500">A whole world of freelance talent at your fingertips</h1>
              <div className="title flex items-center gap-2 text-lg font-medium text-gray-400">
                <img src="./img/check.png" alt="" className="w-6 h-6" />
                The best for every budget
              </div>
              <p className=" font-light text-gray-500 mb-2 leading-7 tracking-wide">
                Find high-quality services at every price point. No hourly rates, just project-based pricing.
              </p>
              <div className="title flex items-center gap-2 text-lg font-medium text-gray-400">
                <img src="./img/check.png" alt="" className="w-6 h-6" />
                Quality work done quickly
              </div>
              <p className=" font-light text-gray-500 mb-2 leading-7 tracking-wide">
                Find the right freelancer to begin working on your project within minutes.
              </p>
              <div className="title flex items-center gap-2 text-lg font-medium text-gray-400">
                <img src="./img/check.png" alt="" className="w-6 h-6" />
                Protected payments, every time
              </div>
              <p className=" font-light text-gray-500 mb-2 leading-7 tracking-wide">
                Always know what you'll pay upfront. Your payment isn't released until you approve the work.
              </p>
              <div className="title flex items-center gap-2 text-lg font-medium text-gray-400">
                <img src="./img/check.png" alt="" className="w-6 h-6" />
                24/7 support
              </div>
              <p className=" font-light text-gray-500 mb-2 leading-7 tracking-wide">
                Find high-quality services at every price point. No hourly rates, just project-based pricing.
              </p>
            </div>
            <div className="item flex-3 flex flex-col gap-4 rounded-md bg-transparent">
              <video src="https://videos.pexels.com/video-files/4146195/4146195-hd_1280_720_50fps.mp4" controls className="w-[720px]" />
            </div>
          </div>
        </div>
          <div class="features dark bg-[#0d084d] flex justify-center px-0 py-[100px]">
            <div class="container w-11/12 lg:w-3/40 flex items-center gap-12">
              <div class="item flex-2 flex flex-col gap-4 pl-7">
                <h1 class="font-semibold text-white text-2xl">GigUp <i>business</i></h1>
                <h1 class="font-semibold text-white">A business solution designed for <i>teams</i></h1>
                <p class="text-white mb-5">Upgrade to a curated experience packed with tools and benefits, dedicated to businesses</p>
                <div class="title flex items-center gap-2 text-white text-base font-light">
                  <img src="./img/check.png" alt="" class="w-6 h-6" />
                  Connect to freelancers with proven business experience
                </div>
                <div class="title flex items-center gap-2 text-white text-base font-light">
                  <img src="./img/check.png" alt="" class="w-6 h-6" />
                  Get matched with the perfect talent by a customer success manager
                </div>
                <div class="title flex items-center gap-2 text-white text-base font-light">
                  <img src="./img/check.png" alt="" class="w-6 h-6" />
                  Manage teamwork and boost productivity with one powerful workspace
                </div>
                <button class="bg-[#1dbf73] justify-center border-[none] text-[white] px-[20px] py-[10px] rounded-[5px] w-max text-[16px] cursor-pointer mt-[20px] font-semibold">Explore GigUp Business</button>
              </div>
              <div class="item flex-3">
                <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png" alt="" class="w-full" />
              </div>
            </div>
          </div>
          <Slide2 slidesToShow={5} arrowsScroll={5}>
            {projects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </Slide2>
        </div>
        

  )
}

export default Home
