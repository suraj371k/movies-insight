import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useReviews(query: string) {
  return useQuery({
    queryKey: ["reviews", query],
    queryFn: async () => {
      const res = await axios.get(`/api/reviews?query=${query}`);
      return res.data.comments;
    },
    enabled: !!query,
  });
}