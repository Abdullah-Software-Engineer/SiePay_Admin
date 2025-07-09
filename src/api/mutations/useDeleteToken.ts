import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api-client";

export const useDeleteToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tokenId: string) => {
      const response = await api.delete(`/admin/tokens/${tokenId}`, {}, true);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch tokens data
      queryClient.invalidateQueries({ queryKey: ["allTokens"] });
    },
  });
}; 