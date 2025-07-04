import { useQuery } from "@tanstack/react-query";
import { api } from "../api-client";
import type { ProductType } from "../../types";


export const useGetMyStores = () => {
  let query = useQuery<ProductType[]>({
    queryKey: ["myStores"],
    queryFn: async () => {
      let r = await api.get(`/users/stores`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};
