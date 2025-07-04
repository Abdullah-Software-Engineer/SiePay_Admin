import { useQuery } from "@tanstack/react-query";
import type { PaymentType } from "../../types";
import { api } from "../api-client";


export const useGetAddressPayments = (addressId: string) => {
  let query = useQuery<PaymentType[]>({
    queryKey: ["myAddressPayments", addressId],
    queryFn: async () => {
      let r = await api.get(`/address/payments/${addressId}`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};
