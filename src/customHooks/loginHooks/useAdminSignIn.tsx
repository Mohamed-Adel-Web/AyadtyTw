"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { loginData } from "@/types/AuthTypes/loginTypes";
import { useAuth } from "./useAuth";
import { loginUrl } from "@/backend/backend";
const useAdminSignIn = () => {
  const { token, setToken, setUser } = useAuth();
  const { toast } = useToast();
  const signInRequest = (adminData: loginData) => {
    return axios.post(loginUrl, adminData);
  };
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["SignIn"],
    mutationFn: signInRequest,
    onSuccess: (data) => {
      if (data.data.status === "success") {
        toast({
          title: `${data.data.message}`,
        });
        Cookies.set("token", data.data.token, { expires: 30 });
        Cookies.set("user", JSON.stringify(data.data.user), { expires: 30 });
        setToken(data.data.token);
        setUser(data.data.user);
        window.location.href = "/Dashboard";
      } else {
        toast({
          variant: "destructive",
          title: `${data.data.message}`,
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

export default useAdminSignIn;
