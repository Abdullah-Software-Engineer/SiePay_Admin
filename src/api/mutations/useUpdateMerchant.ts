import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api-client";
import type { MerchantUpdateType } from "../../types";

interface UpdateMerchantParams {
  merchantId: string;
  updates: MerchantUpdateType;
}

export const useUpdateMerchant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ merchantId, updates }: UpdateMerchantParams) => {
      const response = await api.put(`/admin/merchants/${merchantId}`, updates, true);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch merchant data
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });
};
