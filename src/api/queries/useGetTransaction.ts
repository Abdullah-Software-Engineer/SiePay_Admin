import { useQuery } from "@tanstack/react-query";
import type { TransactionType } from "../../types";
import { api } from "../api-client";



export const useGetTransaction = (txId: string) => {
  let query = useQuery<TransactionType>({
    queryKey: ["myTransaction", txId],
    queryFn: async () => {
      let r = await api.get(`/invoice/transaction/${txId}`, {}, true);
      return r.data;
    },
    refetchOnWindowFocus: true,
    // data will be refetched on window focus after 30 mins
    staleTime: 30 * 60 * 1000,
  });
  return query;
};
