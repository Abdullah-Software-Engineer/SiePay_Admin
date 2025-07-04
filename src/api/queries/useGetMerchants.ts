import { useQuery } from "@tanstack/react-query";
import { api } from "../api-client";
import type { MerchantType } from "../../types";
import useAuth from "../../hook/useAuth";

export const useGetMerchants = () => {
    const { token } = useAuth();

    let query = useQuery<MerchantType[]>({
        queryKey: ["merchants"],
        queryFn: async () => {
            let response = await api.get(`/admin/merchants`, {}, true);
            return response.data;
        },
        enabled: !!token, // Only run the query if there's a token
        retry: (failureCount, error: any) => {
            // Don't retry on authentication errors
            if (error?.status === 401 || error?.status === 403) {
                return false;
            }
            return failureCount < 3;
        },
    });
    return query;
};
