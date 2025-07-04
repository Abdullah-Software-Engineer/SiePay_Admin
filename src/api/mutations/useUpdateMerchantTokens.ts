import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api-client";

interface UpdateTokensParams {
  merchantId: string;
  operation: 'increase' | 'decrease';
  amount: number;
  reason: string;
}

export const useUpdateMerchantTokens = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ merchantId, operation, amount, reason }: UpdateTokensParams) => {
      const response = await api.post(`/admin/merchants/${merchantId}/tokens`, {
        operation,
        amount,
        reason
      }, true);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch merchant data
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });
};
