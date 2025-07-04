import { useQuery } from "@tanstack/react-query";
import type { TokenType } from "../../types";
import { api } from "../api-client";

export const useGetToken = (tokenId: string) => {
  let query = useQuery<TokenType | null>({
    queryKey: ["myToken", tokenId],
    queryFn: async () => {
      let r = await api.get(`/tokens/my/token/${tokenId}`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};
