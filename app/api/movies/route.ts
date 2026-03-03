import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "missing query" }, { status: 400 });
  }

  const isImdbId = query.startsWith("tt");

  const url = isImdbId
    ? `https://www.omdbapi.com/?i=${query}&apikey=${process.env.OMDB_API_KEY}&plot=full`
    : `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${process.env.OMDB_API_KEY}&plot=full`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      return NextResponse.json({ error: data.Error }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movie data" },
      { status: 500 },
    );
  }
}
