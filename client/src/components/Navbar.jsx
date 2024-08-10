import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest';

function Navbar() {
    const [active, setActive]=useState(false);
    const [open, setOpen] = useState(false);

    const {pathname} = useLocation();
    const isActive = () => {
        if(window.scrollY > 0){
            setActive(true)
            setOpen(false)
        }
        else
        setActive(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
          window.removeEventListener("scroll", isActive);
        };
    }, []);
    //const currentUser=null;
    // const currentUser={
    //     id: 1,
    //     username: "Tejal",
    //     isSeller: false
    // }
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //console.log("current user")
    //console.log(currentUser);
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
  <div className={`navbar flex z-20 flex-col items-center sticky top-[0] [transition:0.5s_all_ease] ${(active || pathname !== "/")?"bg-white text-black" : "bg-[#013914] text-white"}`}>
        <div className="container w-full flex items-center justify-between py-3 px-12">
            <div className="logo text-[213%] font-bold font-[Hind]">
                <Link className="link" to="/">
                <span  className="text">gigUp</span >
                </Link>
                <span className="dot font-bold text-[#1dbf73]">.</span >
            </div>
            <div className="links flex items-center gap-6 font-[Roboto] font-medium whitespace-nowrap text-lg">
                <Link to="/">GigUp Pro</Link>
                <Link to="/">Privacy Policy</Link>
                <Link to="/">About Us</Link >
                {!currentUser?.user.isSeller && <Link to='./register'>Become a Seller</Link >}
                {currentUser ? (
                    <div className="user flex items-center gap-2 cursor-pointer relative"
                         onClick={() => setOpen(!open)}>
                        <img className="w-8 h-8 rounded-full object-cover"
                            src={currentUser.user.img || "/img/noavatar.jpg"}
                            alt=""
                        />
                        <span>{currentUser?.user.username}</span >
                        {open && (
                            <div className="options absolute top-12 right-0 p-5 bg-white rounded-md z-[999] border border-gray-200 flex flex-col gap-2 text-gray-500 text-md">
                                {currentUser.user.isSeller && (
                                    <>
                                        <Link to='/myGigs'>Gigs</Link >
                                        <Link to='/add'>Add New Gig</Link >
                                    </>
                                )}
                                <Link to='/orders'>Orders</Link >
                                <Link to='/messages'>Messages</Link >
                                <Link className="link" onClick={handleLogout}>Logout</Link >
                            </div>
                        )}
                    </div>
                ):(
                    <>
                        <Link to='/login'>Sign In</Link >
                        <Link className="link" to="/register">
                            <button className={`join-button py-2 px-4 rounded bg-transparent border ${
                                    (active || pathname !== "/") ? "border-black text-black hover:border-[#1dbf73]" : "border-white text-white"
                                    } hover:bg-[#1dbf73] hover:text-white `}>Join</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
        {(active || pathname !== "/") && (
            <>
                <hr className="w-full h-[0] border-t-[0.5px_solid_#ebe9e9] border-b-[0.5px_solid_#ebe9e9]"/>
                <div className="menu w-full max-w-[1400px] mx-auto py-2 flex justify-between text-gray-500 font-[Roboto] font-light px-6 lg:px-8 ">
                <Link className="link menuLink" to="/gigs?category=Design">
                    Graphics & Design
                    </Link>
                    <Link className="link menuLink" to="/gigs?category=Video">
                    Video & Animation
                    </Link>
                    <Link className="link menuLink" to="/gigs?category=Writing">
                    Writing & Translation
                    </Link>
                    <Link className="link menuLink" to="/gigs?category=AI">
                    AI Services
                    </Link>
                    <Link className="link menuLink" to="/gigs?category=Marketing">
                    Digital Marketing
                    </Link>
                    <Link className="link menuLink" to="/gigs?category=Audio">
                    Music & Audio
                    </Link>
                    <Link className="link menuLink" to="/gigs?category=Programming">
                    Programming & Tech
                    </Link>
                    <Link className="link menuLink" to="/gigs?category=Business">
                    Business
                    </Link>
                    <Link className="link menuLink" to="/gigs?category=Lifestyle">
                    Lifestyle
                    </Link>
                </div>
                <hr className="w-full h-[0] border-t-[0.5px_solid_#ebe9e9] border-b-[0.5px_solid_#ebe9e9]"/>
            </>
        )}
    </div>
  )
}

export default Navbar
