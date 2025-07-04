import { useQuery } from "@tanstack/react-query";
import type { InvoiceType } from "../../types";
import { api } from "../api-client";




export const useGetInvoice = (invoiceId: string) => {
  let query = useQuery<InvoiceType>({
    queryKey: ["myInvoice", invoiceId],
    queryFn: async () => {
      let r = await api.get(`/invoice/invoice/${invoiceId}`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};
