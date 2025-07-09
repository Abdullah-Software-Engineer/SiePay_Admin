import { useQuery } from "@tanstack/react-query";
import type { User } from "../../types";
import useAuth from "../../hook/useAuth";

export const useGetMerchant = (merchantId: string) => {
    const { token } = useAuth();

    return useQuery<User | null>({
        queryKey: ["merchant", merchantId],
        queryFn: async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/merchants/${merchantId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const merchant: User = await response.json();
                return merchant;
            } catch (error: any) {
                console.error('Error fetching merchant:', error);
                throw error;
            }
        },
        enabled: !!token && !!merchantId,
        retry: (failureCount, error: any) => {
            if (error?.status === 401 || error?.status === 403) {
                return false;
            }
            return failureCount < 3;
        },
    });
}; 