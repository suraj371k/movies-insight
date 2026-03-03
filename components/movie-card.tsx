"use client";

import { useMovie } from "@/hooks/useMovie";
import { OMDbMovie } from "@/types/movies";
import React, { useState } from "react";

interface MovieCardProps {
  movie: OMDbMovie;
  comments: any[];
}

interface AIResponse {
  summary: string;
  sentiment: "Positive" | "Negative";
  positivePercentage: number;
  negativePercentage: number;
  themes: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, comments }) => {
  const [aiData, setAiData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    if (!comments || comments.length === 0) {
      setError("No reviews available to analyze.");
      return;
    }

    // Don't generate if AI data already exists
    if (aiData) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI analysis failed");
      }

      setAiData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl">
        
        {/* Movie Header Section with Gradient */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute -bottom-12 left-8">
            <div className="flex items-end space-x-6">
              {/* Poster */}
              <div className="w-32 h-40 rounded-xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-900 transform transition-transform duration-300 hover:scale-105">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                  alt={movie.Title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 px-8 pb-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Left Column - Poster (Mobile) */}
            <div className="md:hidden flex justify-center mb-4">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                alt={movie.Title}
                className="rounded-xl shadow-lg w-48 h-64 object-cover"
              />
            </div>

            {/* Main Content - Right Column */}
            <div className="md:col-span-3 space-y-6">
              
              {/* Title and Metadata */}
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {movie.Title}
                  <span className="text-2xl ml-3 text-gray-500 dark:text-gray-400 font-normal">
                    ({movie.Year})
                  </span>
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                    {movie.Genre}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                    {movie.Runtime}
                  </span>
                </div>
              </div>

              {/* Plot */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {movie.Plot}
              </p>

              {/* Rating Badges */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/30 px-4 py-2 rounded-xl">
                  <span className="text-amber-500 text-lg">⭐</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {movie.imdbRating}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">/10</span>
                </div>

                {aiData?.sentiment && (
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                    aiData.sentiment === "Positive" 
                      ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}>
                    <span className="text-lg">
                      {aiData.sentiment === "Positive" ? "👍" : "👎"}
                    </span>
                    <span className="font-medium">{aiData.sentiment}</span>
                  </div>
                )}
              </div>

              {/* AI Summary Section */}
              {aiData && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      AI Analysis
                    </h3>
                    
                    {/* Sentiment Progress Bars */}
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500"
                          style={{ width: `${aiData.positivePercentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {aiData.positivePercentage}% Positive
                      </span>
                    </div>
                  </div>

                  {/* Summary Text */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {aiData.summary}
                  </p>

                  {/* Themes */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Key Themes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {aiData.themes.map((theme, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm shadow-sm border border-gray-200 dark:border-gray-600 hover:border-blue-500 transition-colors duration-200"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AI summary generated successfully
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              <button
                onClick={handleGenerateSummary}
                disabled={loading || aiData !== null}
                className={`group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  aiData 
                    ? "bg-green-600 hover:bg-green-700 cursor-not-allowed opacity-75"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing Reviews...
                  </>
                ) : aiData ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Summary Generated
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate AI Summary
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;