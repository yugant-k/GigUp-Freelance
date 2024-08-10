// import React from 'react'
// import { useState } from 'react';
// import GigCard from '../components/GigCard';
// //import { gigs } from '../data';
// import { useQuery } from "@tanstack/react-query";
// import { useRef, useEffect } from 'react';
// import { useLocation } from "react-router-dom";
// import newRequest from "../../utils/newRequest";


// function Gigs() {
//   const [open, setOpen] = useState(false);
//   const [sort, setSort] = useState("sales");

//   const minRef = useRef();
//   const maxRef = useRef();

//   const { search } = useLocation();

//   const { isLoading, error, data, refetch } = useQuery({
//     queryKey: ["gigs"],
//     queryFn: () =>
//       newRequest
//         .get(
//           `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
//         )
//         .then((res) => {
//           return res.data;
//         }),
//   });

//   console.log(data);


//   const reSort = (type) => {
//     setSort(type);
//     setOpen(false);
//   };
  
//   useEffect(() => {
//     refetch();
//   }, [sort]);

//   const apply = () => {
//     refetch();
//   };

//   return (
//     <div className='Gigs w-full flex justify-center py-10 px-20 font-[Roboto]'>
//       <div className='container w-[1400px] px-0 py-[30px] flex flex-col gap-[15px]'>
//       <span className="breadcrumbs font-light uppercase text-[13px] text-[#555]">GigUp &gt; Graphics & Design 	&gt;</span>
//         {/* <h1 className='font-semibold text-3xl'>AI Artists</h1>
//         <p className="text-[#999] font-light">
//           Explore the boundaries of art and technology with GigUp's AI artists
//         </p> */}
//         <div className="menu flex items-center justify-between mb-[20px]">
//           <div className="left flex items-center gap-[10px] text-[#555] font-light">
//             <span>Budget</span>
//             <input type="text" className='border border-solid border-slate-300 rounded-sm placeholder-text-[#999]' placeholder=' min'/>
//             <input type="text" className='border border-solid border-slate-300 rounded-sm placeholder-text-[#999]' placeholder=' max'/>
//             <button className="px-[10px] pt-[2px] pb-[5px] bg-[#1dbf73] text-[white] border-[none] font-medium rounded-[5px] cursor-pointer" onClick={apply}>Apply</button>
//           </div>
//           <div className="right relative flex items-center gap-[10px]">
//             <span className="sortBy text-[#555] font-light">Sort By</span>
//             <span className="sortType font-medium text-slate-500">{sort === "sales" ? "Best Selling" : "Newest"}</span>
//             <img src="./img/down.png" alt="" className='w-[15px] cursor-pointer' onClick={() => setOpen(!open)} />
//             {open && (<div className="rightMenu p-[20px] bg-[white] border-[0.5px] border-[solid] border-[lightgrey] rounded-[5px] absolute top-[30px] right-[0] flex flex-col gap-[20px] text-[#555]">
//             {sort === "sales" ? (
//                   <span className='cursor-pointer' onClick={() => reSort("createdAt")}>Newest</span>
//                 ) : (
//                   <span className='cursor-pointer' onClick={() => reSort("sales")}>Best Selling</span>
//                   )}
//             </div>)}
//           </div>
//         </div>
//         <div className="cards flex justify-between flex-wrap">
//         {isLoading
//             ? "loading"
//             : error
//             ? "Something went wrong!"
//             : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Gigs
import React, { useState, useRef, useEffect } from 'react';
import GigCard from '../components/GigCard';
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import newRequest from '../../utils/newRequest'; // Ensure newRequest is imported

function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value || 0}&max=${maxRef.current.value || 10000}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });
  console.log(data)
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  
  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className='Gigs w-full flex justify-center py-10 px-20 font-[Roboto]'>
      <div className='container w-[1400px] px-0 py-[30px] flex flex-col gap-[15px]'>
        <span className="breadcrumbs font-light uppercase text-[13px] text-[#555]">GigUp &gt; Graphics & Design &gt;</span>
        <div className="menu flex items-center justify-between mb-[20px]">
          <div className="left flex items-center gap-[10px] text-[#555] font-light">
            <span>Budget</span>
            <input ref={minRef} type="text" className='border border-solid border-slate-300 rounded-sm placeholder-text-[#999]' placeholder='min'/>
            <input ref={maxRef} type="text" className='border border-solid border-slate-300 rounded-sm placeholder-text-[#999]' placeholder='max'/>
            <button className="px-[10px] pt-[2px] pb-[5px] bg-[#1dbf73] text-[white] border-[none] font-medium rounded-[5px] cursor-pointer" onClick={apply}>Apply</button>
          </div>
          <div className="right relative flex items-center gap-[10px]">
            <span className="sortBy text-[#555] font-light">Sort By</span>
            <span className="sortType font-medium text-slate-500">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src="./img/down.png" alt="" className='w-[15px] cursor-pointer' onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu p-[20px] bg-[white] border-[0.5px] border-[solid] border-[lightgrey] rounded-[5px] absolute top-[30px] right-[0] flex flex-col gap-[20px] text-[#555]">
                {sort === "sales" ? (
                  <span className='cursor-pointer' onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span className='cursor-pointer' onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards flex justify-between flex-wrap">
          {isLoading
            ? "loading"             
            : error
            ? "Something went wrong!"
             : data.data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
