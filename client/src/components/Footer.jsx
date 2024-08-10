import React from "react";

function Footer() {
  return (
    <div className="footer flex justify-center bg-gray-100 pt-20 pl-20 pr-20 pb-10">
      <div className="container w-full">
        <div className="top flex justify-between">
          <div className="item flex flex-col gap-5">
            <h2 className="font-semibold text-lg text-gray-500">Categories</h2>
            <span className="font-light">Graphics & Design</span>
            <span className="font-light">Digital Marketing</span>
            <span className="font-light">Writing & Translation</span>
            <span className="font-light">Video & Animation</span>
            <span className="font-light">Music & Audio</span>
            <span className="font-light">Programming & Tech</span>
            <span className="font-light">Data</span>
            <span className="font-light">Business</span>
            <span className="font-light">Lifestyle</span>
            <span className="font-light">Photography</span>
            <span className="font-light">Sitemap</span>
          </div>
          <div className="item flex flex-col gap-5">
            <h2 className="font-semibold text-lg text-gray-500">About</h2>
            <span className="font-light">Press & News</span>
            <span className="font-light">Partnerships</span>
            <span className="font-light">Privacy Policy</span>
            <span className="font-light">Terms of Service</span>
            <span className="font-light">Intellectual Property Claims</span>
            <span className="font-light">Investor Relations</span>
            <span className="font-light">Contact Sales</span>
          </div>
          <div className="item flex flex-col gap-5">
            <h2 className="font-semibold text-lg text-gray-500">Support</h2>
            <span className="font-light">Help & Support</span>
            <span className="font-light">Trust & Safety</span>
            <span className="font-light">Selling on GigUp</span>
            <span className="font-light">Buying on GigUp</span>
          </div>
          <div className="item flex flex-col gap-5">
            <h2 className="font-semibold text-lg text-gray-500">Community</h2>
            <span  className="font-light ">Customer Success Stories</span>
            <span className="font-light">Community hub</span>
            <span className="font-light">Forum</span>
            <span className="font-light">Events</span>
            <span className="font-light">Blog</span>
            <span className="font-light">Influencers</span>
            <span className="font-light">Affiliates</span>
            <span className="font-light">Podcast</span>
            <span className="font-light">Invite a Friend</span>
            <span className="font-light">Become a Seller</span>
            <span className="font-light">Community Standards</span>
          </div>
          <div className="item flex flex-col gap-5">
            <h2 className="font-semibold text-lg text-gray-500">More From GigUp</h2>
            <span className="font-light">GigUp Business</span>
            <span className="font-light">GigUp Pro</span>
            <span className="font-light">GigUp Logo Maker</span>
            <span className="font-light">GigUp Guides</span>
            <span className="font-light">Get Inspired</span>
            <span className="font-light">GigUp Select</span>
            <span className="font-light">ClearVoice</span>
            <span className="font-light">GigUp Workspace</span>
            <span className="font-light">Learn</span>
            <span className="font-light">Working Not Working</span>
          </div>
        </div>
        <hr className="my-[40px]  border-[1px] border-[solid] border-[#ebe9e9]" />
        <div className="bottom flex items-center justify-between">
          <div className="left w-max flex items-center gap-[20px]">
            <h2 className="text-[213%] text-gray-500 font-bold font-[Hind]">gigUp</h2>
            <span className="ml-[-20px] pt-5 text-sm text-gray-500 font-bold font-[Hind]">®</span>
            <span className="text-[13px] whitespace-nowrap font-semibold text-md text-gray-500 font-[Hind] mx-3">© GigUp International Ltd. 2023</span>
          </div>
          <div className="right w-max flex items-center gap-[30px]">
            <div className="social flex gap-5">
              <img src="/img/twitter.png" alt="" className="w-6 h-6" />
              <img src="/img/facebook.png" alt="" className="w-6 h-6" />
              <img src="/img/linkedin.png" alt="" className="w-6 h-6" />
              <img src="/img/pinterest.png" alt="" className="w-6 h-6" />
              <img src="/img/instagram.png" alt="" className="w-6 h-6" />
            </div>
            <div className="link flex items-center gap-[10px]">
              <img src="/img/language.png" alt="" className="w-6 h-6" />
              <span className="font-md text-gray-400 font-[Hind]">English</span>
            </div>
            <div className="link flex items-center gap-[10px]">
              <img src="/img/indian-rupee-xxl (1).png" alt="" className="w-6 h-6" />
              <span className="font-md text-gray-400 font-[Hind]">INR</span>
            </div>
            <img src="/img/accessibility.png" alt="" className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

