import { useQuery } from "@tanstack/react-query";
import { api } from "../api-client";
import type { User } from "../../types";
import useAuth from "../../hook/useAuth";

export const useGetMerchants = () => {
    const { token } = useAuth();

    let query = useQuery<User[]>({
        queryKey: ["merchants"],
        queryFn: async () => {
            const response = await api.get('/admin/users', {}, true);
            
            // Handle different response structures
            let users: User[] = [];
            
            if (Array.isArray(response)) {
                users = response;
            } else if (response?.data && Array.isArray(response.data)) {
                users = response.data;
            } else if (response?.users && Array.isArray(response.users)) {
                users = response.users;
            } else if (response && typeof response === 'object') {
                const arrayProp = Object.values(response).find(val => Array.isArray(val));
                if (arrayProp) {
                    users = arrayProp as User[];
                }
            }
            
            if (!Array.isArray(users)) {
                console.warn('Unexpected response format:', response);
                return [];
            }
            
            const merchants = users.filter((user: User) => {
                const role = user.role?.toLowerCase();
                return role === 'merchant' || role === 'user' || !role;
            });
            
            return merchants;
        },
        enabled: !!token,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
    });
    
    return query;
};
