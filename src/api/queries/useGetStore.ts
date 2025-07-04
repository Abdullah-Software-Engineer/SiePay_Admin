import { useQuery } from "@tanstack/react-query";
import type { StoreType } from "../../types";
import { api } from "../api-client";



export const useGetMyStore = (storeId: string) => {
  let query = useQuery<StoreType>({
    queryKey: ["myStore", storeId],
    queryFn: async () => {
      let r = await api.get(`/users/stores/${storeId}`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};
