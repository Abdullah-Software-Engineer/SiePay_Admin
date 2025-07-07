import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api-client";

interface UpdateMerchantParams {
  merchantId: string;
  status: boolean;
}

export const useUpdateMerchant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ merchantId, status }: UpdateMerchantParams) => {
      console.log('Updating merchant status:', { merchantId, status });
      const response = await api.patch(
        `/admin/merchants/${merchantId}/status`, 
        { body: JSON.stringify({ status }) }, 
        true, 
        "json"
      );
      console.log('Update response:', response);
      return response;
    },
    onSuccess: (data, variables) => {
      console.log('Mutation successful:', data, variables);
      // Invalidate and refetch merchant data
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
    onError: (error, variables) => {
      console.error('Mutation error:', error, variables);
    },
  });
};
