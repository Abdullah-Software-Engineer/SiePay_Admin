import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AssignTokenParams {
  token_id: string;
  merchant_id: string;
}

export const useAssignTokenToMerchant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token_id, merchant_id }: AssignTokenParams) => {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/merchant-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          token_id,
          merchant_id
        }),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Session expired. Please login again");
        }
        throw new Error(data.msg || data.message || `Server error: ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.msg || data.message || "Failed to assign token to merchant");
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch merchants data
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });
}; 