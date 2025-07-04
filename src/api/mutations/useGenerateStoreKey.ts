import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../api-client";

export const useGenerateStoreKey = (storeId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["generateStoreKey", storeId],
    mutationFn: () => {
      return api
        .post("/users/tokens/" + storeId, {}, true, "json")
        .then((r) => r.data);
    },
    onError: (error) => {
      alert(`Failed: ${error.message ? error.message : "Try again"}`);
      // useNotifications.getState().addNotification({
      //   type: "error",
      //   title: "Failed to create property",
      //   message: error.message ? error.message : "Try again",
      // });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myStoreKey", storeId] });
      alert("Key generated");
    },
  });
  return mutation;
};
