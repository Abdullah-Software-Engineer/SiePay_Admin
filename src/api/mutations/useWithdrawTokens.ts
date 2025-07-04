import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api-client";

export const useWithdrawToken = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["withdrawToken"],
    mutationFn: (data: { tokenId: string; amount: number; to: string }) => {
      return api
        .post(
          "/tokens/withdraw-token",
          { body: JSON.stringify(data) },
          true,
          "json"
        )
        .then((r) => r.data);
    },
    onError: (error: any) => {
      alert(`Failed: ${error.message ? error.message : "Try again"}`);
      // useNotifications.getState().addNotification({
      //   type: "error",
      //   title: "Failed to create property",
      //   message: error.message ? error.message : "Try again",
      // });
    },
    onSuccess: (_, { tokenId }) => {
      queryClient.invalidateQueries({
        queryKey: ["tokenWithdrawHistory", tokenId],
      });
      alert("Amount Withdraw!");
    },
  });
  return mutation;
};
