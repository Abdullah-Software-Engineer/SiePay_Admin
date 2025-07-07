import { useQuery } from "@tanstack/react-query";
import { api } from "../api-client";
import type { User } from "../../types";
import useAuth from "../../hook/useAuth";

export const useGetMerchants = () => {
    const { token } = useAuth();

    let query = useQuery<User[]>({
        queryKey: ["merchants"],
        queryFn: async () => {
            try {
            
                const response = await api.get('/admin/users', {}, true);
                const users = response.data || response;
                
                // Filter to only get users with role 'merchant'
                const merchants = users.filter((user: User) => user.role === 'merchant');
                
                return merchants;
            } catch (error) {
                console.error('Error fetching merchants:', error);
                throw error;
            }
        },
        enabled: !!token, // Only run the query if there's a token
        retry: (failureCount, error: any) => {
            console.log('Retry attempt:', failureCount, 'Error:', error);
            // Don't retry on authentication errors
            if (error?.message?.includes('401') || error?.message?.includes('403') || error?.message?.includes('Session expired')) {
                console.log('Authentication error, not retrying');
                return false;
            }
            return failureCount < 3;
        },
    });
    return query;
};
