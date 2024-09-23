"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../loginHooks/useAuth";
import { getBaseUrl } from "@/lib/utils";

const useDeleteData = (
  url: string,
  id: number | undefined,
  mutationKey: string,
  invalidateQueryKey: string,
  method: "put" | "delete" = "delete"
) => {
  const { token, setToken } = useAuth();
  const cookieToken = Cookies.get("token");
  const { toast } = useToast();

  if (cookieToken) {
    setToken(cookieToken);
  }

  const deleteDataRequest = () => {
    return axios[method](`${getBaseUrl()}${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: [mutationKey, id],
    mutationFn: deleteDataRequest,
    onSuccess: (data) => {
      if (data.data.status === 200) {
        toast({
          title: `${data.data.message}`,
        });
        queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] });
      } else {
        toast({
          title: `${data.data.message}`,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
};

export default useDeleteData;
