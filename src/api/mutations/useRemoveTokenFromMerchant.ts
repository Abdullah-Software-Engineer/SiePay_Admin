import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api-client";

export const useRemoveTokenFromMerchant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (merchantTokenId: string) => {
      const response = await api.delete(`/admin/merchant-token/${merchantTokenId}`, {}, true);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch merchants data
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });
}; 