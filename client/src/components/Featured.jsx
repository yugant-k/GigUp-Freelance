import React from 'react'

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured h-full flex justify-center bg-[#013914] text-white">
      <div className="container w-full flex items-center px-10 gap-8">
        <div className="left flex flex-col gap-10 w-2/3 justify-center px-10">
            <h1 className="text-5xl justify-center">
            Find the perfect <span className="italic">freelance</span> services for your business
            </h1>
            <div className="search bg-white rounded flex items-center justify-between overflow-hidden">
                <div className="searchInput flex items-center gap-2.5">
                    <img src="./img/search.png" alt="" className="w-5 h-5 m-2.5" />
                    <input
                        type="text"
                        placeholder='Try "building mobile app"'
                        className="border-none outline-none placeholder-gray-500 font-[Roboto]"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <button 
                  className="w-30 h-12 border-none bg-[#1dbf73] text-white self-end cursor-pointer px-7 font-[Roboto] font-medium"
                  onClick={handleSubmit}>
                Search
                </button>
            </div>
            <div className="popular flex items-center gap-2.5">
                <span className="w-max">Popular:</span>
                <button className="w-max text-white border border-white py-1 px-2.5 rounded-full bg-transparent text-sm">Web Design</button>
                <button className="w-max text-white border border-white py-1 px-2.5 rounded-full bg-transparent text-sm">WordPress</button>
                <button className="w-max text-white border border-white py-1 px-2.5 rounded-full bg-transparent text-sm">Logo Design</button>
                <button className="w-max text-white border border-white py-1 px-2.5 rounded-full bg-transparent text-sm">AI Services</button>
          </div>
        </div>
        <div className="right h-full flex-grow">
          <img src="./img/mman.png" alt="" className="h-full w-auto object-cover ml-[80px]" />
        </div>
      </div>
    </div>
  )
}

export default Featured
