import { useQuery } from "@tanstack/react-query";
import { api } from "../api-client";
import type { InvoiceType } from "../../types";




export const useGetAddressInvoices = (addressId: string) => {
  let query = useQuery<InvoiceType[]>({
    queryKey: ["myAddressInvoices", addressId],
    queryFn: async () => {
      let r = await api.get(`/address/invoices/${addressId}`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};
