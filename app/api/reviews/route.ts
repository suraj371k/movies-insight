import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    // 1️ Search movie in TMDB to get ID
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );

    const searchData = await searchRes.json();

    if (!searchData.results || searchData.results.length === 0) {
      return NextResponse.json(
        { error: "Movie not found in TMDB" },
        { status: 404 }
      );
    }

    const movieId = searchData.results[0].id;

    // Fetch reviews using movie ID
    const reviewRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_API_KEY}`
    );

    const reviewData = await reviewRes.json();

    //  Extract only comment text
    const comments = reviewData.results.map((review: any) => ({
      author: review.author,
      content: review.content,
    }));

    return NextResponse.json({ comments });

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}