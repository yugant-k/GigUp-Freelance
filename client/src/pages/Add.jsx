import React from "react";

const Add = () => {
  return (
    <div className="add flex justify-center my-5 mx-20 font-[Roboto]">
      <div className="container w-full py-10">
        <h1 className=" w-max mb-8 font-semibold text-3xl ">Add New Gig</h1>
        <div className="sections flex justify-between gap-24">
          <div className="info flex-1 flex flex-col gap-2.5 justify-between">
            <label className="text-gray-500 text-lg" htmlFor="">
              Title
            </label>
            <input
              className="p-5 border border-solid border-slate-400 rounded "
              type="text"
              placeholder="e.g. I will do something I'm really good at"
            />
            <label className="text-gray-500 text-lg" htmlFor="">
              Category
            </label>
            <select className="p-5 border border-solid border-slate-400 rounded" name="cats" id="cats">
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label className="text-gray-500 text-lg" htmlFor="">
              Cover Image
            </label>
            <input className="p-5 border border-solid border-slate-400 rounded" type="file" />
            <label className="text-gray-500 text-lg" htmlFor="">
              Upload Images
            </label>
            <input className="p-5 border border-solid border-slate-400 rounded" type="file" multiple />
            <label className="text-gray-500 text-lg" htmlFor="">
              Description
            </label>
            <textarea
              className="p-5 border border-solid border-slate-400 rounded"
              name=""
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
            ></textarea>
            <button className="border-none p-5 text-white font-medium text-lg bg-green-500 cursor-pointer">
              Create
            </button>
          </div>
          <div className="details flex-1 flex flex-col gap-2.5 justify-between">
            <label className="text-gray-500 text-lg" htmlFor="">
              Service Title
            </label>
            <input className="p-5 border border-solid border-slate-400 rounded" type="text" placeholder="e.g. One-page web design" />
            <label className="text-gray-500 text-lg" htmlFor="">
              Short Description
            </label>
            <textarea
              className="p-5 border border-solid border-slate-400 rounded"
              name=""
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label className="text-gray-500 text-lg" htmlFor="">
              Delivery Time (e.g. 3 days)
            </label>
            <input className="p-5 border border-solid border-slate-400 rounded" type="number" />
            <label className="text-gray-500 text-lg" htmlFor="">
              Revision Number
            </label>
            <input className="p-5 border border-solid border-slate-400 rounded" type="number" />
            <label className="text-gray-500 text-lg" htmlFor="">
              Add Features
            </label>
            <input className="p-5 border border-solid border-slate-400 rounded" type="text" placeholder="e.g. page design" />
            <input className="p-5 border border-solid border-slate-400 rounded" type="text" placeholder="e.g. file uploading" />
            <input className="p-5 border border-solid border-slate-400 rounded" type="text" placeholder="e.g. setting up a domain" />
            <input className="p-5 border border-solid border-slate-400 rounded" type="text" placeholder="e.g. hosting" />
            <label className="text-gray-500 text-lg" htmlFor="">
              Price
            </label>
            <input className="p-5 border border-solid border-slate-400 rounded" type="number" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
