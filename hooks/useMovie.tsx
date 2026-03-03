import { fetchMovie } from "@/lib/fetchMovies";
import { OMDbMovie } from "@/types/movies";
import { useQuery } from "@tanstack/react-query";

export function useMovie(query: string) {
  return useQuery<OMDbMovie, Error>({
    queryKey: ["movie", query],
    queryFn: () => fetchMovie(query),
    enabled: !!query, 
    staleTime: 1000 * 60 * 5,
  });
}