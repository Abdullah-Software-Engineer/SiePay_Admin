import { useQuery } from "@tanstack/react-query";
import type { User } from "../../types";
import useAuth from "../../hook/useAuth";

export const useGetMerchants = () => {
    const { token } = useAuth();

    let query = useQuery<User[]>({
        queryKey: ["merchants"],
        queryFn: async () => {
            try {

                // The api-client was throwing "Error: Failed" because it expects all responses 
                // to have a success: true property, but /admin/users returns the users array
                //  directly.With direct fetch, you should now see the actual data.
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/users`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const users: User[] = await response.json();
                
                const merchants = users.filter((user: User) => {
                    const role = user.role?.toLowerCase();
                    return role === 'merchant'
                });
                return merchants;
            } catch (error: any) {
                console.error('Error fetching merchants:', error);
                return [];
            }
        },
        enabled: !!token,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
    });
    
    return query;
};
