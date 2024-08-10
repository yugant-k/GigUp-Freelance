import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      //console.log(res.data.data)
      localStorage.setItem("currentUser", JSON.stringify(res.data.data));
      navigate("/")
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login flex flex-col items-center justify-center">
      <h1 className=" w-max my-8 font-bold text-3xl ">Sign in</h1>
      <form className="w-2/5 h-2/5 mx-3 px-[50px] py-[50px] flex flex-col gap-[20px] shadow-lg" onSubmit={handleSubmit}>
        <label className="text-[gray] text-[18px]" htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="username"
          className="p-[20px] border-[1px] border-[solid] border-[#d8d6d6] rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="text-[gray] text-[18px]" htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          className="p-[20px] border-[1px] border-[solid] border-[#d8d6d6] rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border-[none] p-[20px] text-[white] font-medium text-[18px] bg-[#1dbf73] cursor-pointer rounded" type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;