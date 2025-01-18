import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('hero.jpg')" }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 gap-8 max-w-3xl">
        {/* Heading */}
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl drop-shadow-xl leading-tight">
          <span className="block text-[#f56551] mb-2">
            Discover Your Next Adventure with AI:
          </span>
          Personalized Itineraries at Your Fingertips
        </h1>

        {/* Description */}
        <p className="text-gray-200 text-lg sm:text-xl lg:text-2xl drop-shadow-lg leading-relaxed">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>

        {/* Call-to-Action Button */}
        <Link to="/create-trip" aria-label="Create your personalized trip">
          <Button className="bg-gradient-to-r from-[#f56551] to-[#e25440] hover:from-[#e25440] hover:to-[#f56551] text-white text-lg font-semibold py-4 px-10 rounded-full shadow-lg transform transition-transform hover:scale-105 duration-300">
            Create Your Trip
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
