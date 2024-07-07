"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { RegisterData } from "@/types/AuthTypes/registerTypes";
import { useAuth } from "./useAuth";
import { registerPatientUrl } from "@/backend/backend";
import { useToast } from "@/components/ui/use-toast";

export const useRegisterPatient = () => {
  const { token, setToken } = useAuth();
  const { toast } = useToast();

  const registerPatientRequest = (adminData: RegisterData) => {
    return axios.post(registerPatientUrl, adminData);
  };
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["registerPatient"],
    mutationFn: registerPatientRequest,
    onSuccess: (data) => {
      console.log(data.data);
      if (data.data.status) {
        toast({
          title: `${data.data.msg}`,
        });
        Cookies.set("token", data.data.data.token, { expires: 30 });
        setToken(data.data.token);
        // window.location.href = "/Dashboard";
      } else {
        toast({
          variant: "destructive",
          title: `${data.data.validation_error[0]}`,
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
