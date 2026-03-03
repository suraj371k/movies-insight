"use client";

import React from "react";
import { Film } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-linear-to-r from-black via-gray-900 to-black shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          href="/"
          className="flex items-center gap-3 group transition duration-300"
        >
          <div className="p-2 bg-red-600 rounded-xl group-hover:scale-110 transition duration-300">
            <Film className="text-white w-6 h-6" />
          </div>

          <h2 className="text-white text-xl md:text-2xl font-bold tracking-wide group-hover:text-red-500 transition duration-300">
            AI MOVIE INSIGHT
          </h2>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;