import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { SignupFormBaseValues } from "../../types";
import { api } from "../api-client";
import { toast } from "react-hot-toast";
import useAuth from "../../hook/useAuth";

export const useRegister = () => {

  const queryClient = useQueryClient();
  const { setToken } = useAuth();

  const mutation = useMutation({

    mutationKey: ["userRegister"],

    mutationFn: (data: SignupFormBaseValues) => {
      return api.post(
        "/users/register",
        { body: JSON.stringify(data) },
        false,
        "json"
      );
    },

    onSuccess: ({ token }) => {
      
      setToken(token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User successfully created");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return mutation;
};
