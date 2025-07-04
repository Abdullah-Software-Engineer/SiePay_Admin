import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../api-client";



export const useGenerateAddresses = (storeId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["generateAddress", storeId],
    mutationFn: (numAddresses: number) => {
      return api.post(
        "/users/addresses/" + storeId,
        { body: JSON.stringify({ numAddresses }) },
        true,
        "json"
      );
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
      queryClient.invalidateQueries({ queryKey: ["myAddresses"] });
      alert("Addresses generated");
    },
  });
  return mutation;
};
