import { useQuery } from "@tanstack/react-query";
import type { InvoiceType } from "../../types";
import { api } from "../api-client";

export const useGetStoreInvoices = (storeId: string) => {
  let query = useQuery<InvoiceType[]>({
    queryKey: ["storeInvoices", storeId],
    queryFn: async () => {
      let r = await api.get(`/invoice/store/${storeId}`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};

