import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";

interface UpdateMerchantParams {
  merchantId: string;
  status: boolean;
}

export const useUpdateMerchant = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async ({ merchantId, status }: UpdateMerchantParams) => {
      console.log('Updating merchant status:', { merchantId, status });
      
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/merchants/${merchantId}/status`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Update response:', result);
        
        if (!result.success) {
          throw new Error(result.msg || 'Failed to update merchant status');
        }
        
        return result;
      } catch (error: any) {
        console.error('Error updating merchant status:', error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log('Mutation successful:', data, variables);
      // Invalidate and refetch merchant data
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
      queryClient.invalidateQueries({ queryKey: ["merchant", variables.merchantId] });
    },
    onError: (error, variables) => {
      console.error('Mutation error:', error, variables);
    },
  });
};
