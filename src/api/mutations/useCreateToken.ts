import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateTokenParams {
  name: string;
  symbol: string;
  decimals: number;
  chainId: string;
  address: string;
}

export const useCreateToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, symbol, decimals, chainId, address }: CreateTokenParams) => {
      // Ensure we create a clean token object without any _id
      const tokenData = {
        name: name.trim(),
        symbol: symbol.trim().toUpperCase(),
        decimals: Number(decimals),
        chainId: chainId.trim(),
        address: address.trim()
      };

      console.log('Sending token data:', tokenData);
      console.log('Address specifically:', tokenData.address);
      
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(tokenData),
      });

      const responseText = await response.text();
      console.log('Backend response text:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed backend response:', data);
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
        throw new Error(data.msg || data.message || "Failed to create token");
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch tokens data
      queryClient.invalidateQueries({ queryKey: ["allTokens"] });
    },
  });
}; 