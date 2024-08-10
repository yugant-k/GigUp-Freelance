import React, { useState } from "react";
//import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        formData.append(key, user[key]);
      });
      if (file) {
        formData.append("img", file);
      }
      const res = await newRequest.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(res.data.data)
      //alert("Account Created");
      //console.log(res.data.data);
      //localStorage.setItem("currentUser", JSON.stringify(res.data.data));
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register flex justify-center my-5 mx-20 font-[Roboto]">
      <div className="container w-full py-10">
        <h1 className="w-max mb-8 font-semibold text-3xl">Create a new account</h1>
        <form onSubmit={handleSubmit} className="sections flex justify-between gap-24">
          <div className="left flex-1 flex flex-col gap-2.5 justify-between">
            <label className="text-gray-500 text-md" htmlFor="username">Username</label>
            <input
              className="p-3 border border-solid border-slate-400 rounded"
              name="username"
              type="text"
              placeholder="username"
              onChange={handleChange}
            />
            <label className="text-gray-500 text-md" htmlFor="email">Email</label>
            <input
              className="p-3 border border-solid border-slate-400 rounded"
              name="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
            />
            <label className="text-gray-500 text-md" htmlFor="password">Password</label>
            <input
              className="p-3 border border-solid border-slate-400 rounded"
              name="password"
              type="password"
              onChange={handleChange}
            />
            <label className="text-gray-500 text-md" htmlFor="file">Profile Picture</label>
            <input
              className="p-3 border border-solid border-slate-400 rounded"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="text-gray-500 text-md" htmlFor="country">Country</label>
            <input
              className="p-3 border border-solid border-slate-400 rounded"
              name="country"
              type="text"
              placeholder="India"
              onChange={handleChange}
            />
            <button type="submit" className="border-none p-3 text-white font-medium text-md bg-green-600 cursor-pointer">
              Register
            </button>
          </div>
          <div className="right flex-1 flex flex-col justify-between">
            <label className="text-gray-500 text-md">I want to become a seller</label>
            {/* <div className="toggle flex items-center">
              <label className="text-gray-500 text-md mr-3" htmlFor="isSeller">Activate the seller account</label>
              <label className="switch relative inline-block w-[50px] h-[24px]">
                <input type="checkbox" onChange={handleSeller} className="opacity-0 w-0 h-0" />
                <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:transition before:rounded-full input:checked:before:transform input:checked:before:translate-x-6 input:checked:bg-blue-500"></span>
              </label>
              
              <label className="text-gray-500 text-md mr-3" htmlFor="isSeller">Activate the seller account</label>
                <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" onChange={handleSeller} className="opacity-0 w-0 h-0" />
                  <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Checked toggle</span> 
                </label>
            </div> */}
                <div className="toggle flex items-center">
                  <label className="text-gray-500 text-md mr-3" htmlFor="isSeller">Activate the seller account</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" onChange={handleSeller} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                  </label>
                </div>

            <label className="text-gray-500 text-md" htmlFor="phone">Phone Number</label>
            <input
              className="p-3 border border-solid border-slate-400 rounded"
              name="phone"
              type="text"
              placeholder="+1 234 567 89"
              onChange={handleChange}
            />
            <label className="text-gray-500 text-lg" htmlFor="desc">Description</label>
            <textarea
              className="p-3 border border-solid border-slate-400 rounded"
              name="desc"
              placeholder="A short description of yourself"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
