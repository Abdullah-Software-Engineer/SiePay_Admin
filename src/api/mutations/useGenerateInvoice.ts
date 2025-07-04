import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { InvoiceCreateArgs } from "../../validation";
import { api } from "../api-client";

export const useGenerateInvoice = (storeId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["generateInvoice", storeId],
    mutationFn: (args: InvoiceCreateArgs) => {
      return api
        .post(
          "/invoice/store/" + storeId,
          {
            body: JSON.stringify({
              ...args,
              ...(args.endAt
                ? { endAt: new Date(args.endAt).toISOString() }
                : {}),
            }),
          },
          true,
          "json"
        )
        .then((r) => r.data);
    },
    onError: (error) => {
      alert(`Failed: ${error.message ? error.message : "Try again"}`);
      // useNotifications.getState().addNotification({
      //   type: "error",
      //   title: "Failed to create property",
      //   message: error.message ? error.message : "Try again",
      // });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeInvoices", storeId] });
      alert("Invoice generated");
    },
  });
  return mutation;
};
