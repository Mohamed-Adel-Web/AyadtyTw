"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../loginHooks/useAuth";
import { getBaseUrl } from "@/lib/utils";

const useAddData = <T,>(
  url: string,
  mutationKey: string,
  invalidateQueryKey: string | string[]
) => {
  const { token, setToken } = useAuth();
  const cookieToken = Cookies.get("token");
  const { toast } = useToast();

  if (cookieToken) {
    setToken(cookieToken);
  }

  const addDataRequest = (data: T) => {
    return axios.post(getBaseUrl() + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: addDataRequest,
    onSuccess: (data) => {
      if (data.data.status === 200) {
        if (data.data.payment_url) {
          window.open(data.data.payment_url, "_blank");
        }

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

export default useAddData;
