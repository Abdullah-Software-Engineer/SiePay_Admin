import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";

interface UpdateMerchantFlowParams {
  merchantId: string;
  flow: "master" | "forwarder";
}

export const useUpdateMerchantFlow = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async ({ merchantId, flow }: UpdateMerchantFlowParams) => {
      console.log('Updating merchant flow:', { merchantId, flow });
      
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/merchants/${merchantId}/flow`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ flow }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Flow update response:', result);
        
        if (!result.success) {
          throw new Error(result.msg || 'Failed to update merchant flow');
        }
        
        return result;
      } catch (error: any) {
        console.error('Error updating merchant flow:', error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log('Flow update successful:', data, variables);
      // Invalidate and refetch merchant data
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["merchant", variables.merchantId] });
    },
    onError: (error, variables) => {
      console.error('Flow update error:', error, variables);
    },
  });
}; 