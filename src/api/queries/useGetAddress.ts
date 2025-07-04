import { useQuery } from "@tanstack/react-query";
import type { AddressType } from "../../types";
import { api } from "../api-client";




export const useGetAddress = (addressId: string) => {
  let query = useQuery<AddressType | null>({
    queryKey: ["myAddress", addressId],
    queryFn: async () => {
      let r = await api.get(`/users/my/address/${addressId}`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};
