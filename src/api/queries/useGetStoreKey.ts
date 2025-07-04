import { useQuery } from "@tanstack/react-query";
import { api } from "../api-client";



export const useGetStoreKey = (storeId: string) => {
  let query = useQuery<string | null>({
    queryKey: ["myStoreKey", storeId],
    queryFn: async () => {
      let r = await api.get(`/users/tokens/${storeId}`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};
