import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { StoreAddValuesType } from "../../types";
import toast from "react-hot-toast";
import { api } from "../api-client";

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["createStore"],
    mutationFn: (store: StoreAddValuesType) => {
      return api.post(
        "/users/stores",
        { body: JSON.stringify(store) },
        true,
        "json"
      );
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to create store");
    },
    onSuccess: () => {
      toast.success("Store created successfully!");
      queryClient.invalidateQueries({ queryKey: ["myStores"] });
    },
  });
  return mutation;
};
