"use client";

import { useMovie } from "@/hooks/useMovie";
import React, { useState } from "react";
import MovieCard from "./movie-card";
import { useReviews } from "@/hooks/useReview";

const Hero = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const { data, isPending, isError } = useMovie(query);
  const { data: comments } = useReviews(query);

  const handleSearch = () => {
    if (!search.trim()) return;
    setQuery(search);
  };

  // Check if there's an active search
  const hasActiveSearch = query.trim() !== "";
  // Check if currently loading (only when there's an active search)
  const isLoading = hasActiveSearch && isPending;

  return (
    <section className="relative min-h-screen flex mt-5 justify-center bg-black overflow-hidden px-6">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-600 opacity-30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-red-600 opacity-30 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-4xl text-center">
        
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Decode Cinema with
        </h1>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mt-2">
          Intelligence
        </h1>

        <p className="mt-6 text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Analyze IMDb audience sentiment, narrative depth, and critical
          reception using powerful AI-driven models.
        </p>

        {/* Search */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a movie..."
            className="w-full px-5 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold hover:opacity-90 transition duration-300 w-full sm:w-auto ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Loading - Only show when there's an active search */}
        {isLoading && (
          <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Fetching movie...</span>
          </div>
        )}

        {/* Error - Only show when there's an active search */}
        {hasActiveSearch && isError && (
          <div className="mt-6 text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p>Something went wrong. Please try again.</p>
          </div>
        )}

        {/* No Results - Only show when search is done but no movie found */}
        {hasActiveSearch && data && data.Response === "False" && (
          <div className="mt-6 text-gray-400 bg-gray-800/50 rounded-lg p-4">
            <p>No movie found. Please check the title and try again.</p>
          </div>
        )}

        {/* Movie Card - Only show when movie is found */}
        <div>
          {data && data.Response === "True" && (
            <MovieCard movie={data} comments={comments || []} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;