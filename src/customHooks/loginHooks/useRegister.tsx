"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { RegisterData } from "@/types/AuthTypes/registerTypes";
import { useAuth } from "./useAuth";
import { registerPatientUrl } from "@/backend/backend";
import { useToast } from "@/components/ui/use-toast";

export const useRegisterPatient = () => {
  const { token, setToken, setUser } = useAuth();
  const { toast } = useToast();

  const registerPatientRequest = (adminData: RegisterData) => {
    return axios.post(registerPatientUrl, adminData);
  };
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["registerPatient"],
    mutationFn: registerPatientRequest,
    onSuccess: (data) => {
      if (data.data.status === 200) {
        toast({
          title: `${data.data.message}`,
        });
        Cookies.set("token", data.data.data.token, { expires: 30 });
        Cookies.set("user", JSON.stringify(data.data.data.user), { expires: 30 });
        setToken(data.data.token);
        setUser(data.data.data.user);
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
