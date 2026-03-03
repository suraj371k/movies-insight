import { OMDbMovie } from "@/types/movies";

export async function fetchMovie(query: string): Promise<OMDbMovie> {
  const res = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch movie");
  }

  return res.json();
}