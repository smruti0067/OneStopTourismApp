import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader 
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Booking from "@/booking";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => fetchUserProfile(tokenInfo),
    onError: (error) => console.error("Login failed:", error),
  });

  const fetchUserProfile = async (tokenInfo) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(data));
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <div
        onClick={() => (window.location.href = "/")}
        className="text-2xl font-extrabold cursor-pointer flex items-center gap-1"
      >
        <span className="text-blue-500 hover:text-blue-600 transition-colors">
          Tour
        </span>
        <span className="text-purple-500 hover:text-purple-600 transition-colors">
          Vista
        </span>
      </div>
      <div>
  {user ? (
    <div className="flex items-center gap-4">
      <a href="/booking">
        <Button
          className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 
          text-white font-bold py-3 px-6 rounded-lg
          shadow-lg hover:shadow-xl 
          transform hover:-translate-y-1 hover:scale-105
          transition-all duration-500 ease-out
          flex items-center gap-3
          border border-white/20 backdrop-blur-sm"
        >
          {/* <span className="text-2xl font-bold animate-pulse">+</span> */}
          <span className="tracking-wide">Book Now</span>
        </Button>
      </a>
      <a href="/create-trip">
        <Button
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-xl font-bold">+</span>
          Create Trip
        </Button>
      </a>
      <a href="/my-trips">
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m6 4H9m6-8H9m3 14a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>
          My Trips
        </Button>
      </a>
      <Popover>
        <PopoverTrigger>
          <img
            src={user.picture}
            alt=""
            className="w-[35px] h-[35px] rounded-full"
          />
        </PopoverTrigger>
        <PopoverContent>
          <h2
            className="cursor-pointer"
            onClick={() => {
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }}
          >
            LogOut
          </h2>
        </PopoverContent>
      </Popover>
    </div>
  ) : (
    <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
  )}
</div>


      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md p-6 rounded-xl shadow-xl">
          <DialogHeader className="space-y-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              
            </div>
            <DialogDescription>
              <div className="space-y-6 text-center">
                <h2 className="font-semibold text-lg text-gray-700">
                  Please sign in with Google
                </h2>

                <Button
                  onClick={login}
                  className="google-button"
                >
                  <FcGoogle className="h-6 w-6" />
                  <span className="font-medium">Continue with Google</span>
                </Button>
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
