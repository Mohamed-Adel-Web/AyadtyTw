"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { RegisterData } from "@/types/AuthTypes/registerTypes";
import { useAuth } from "./useAuth";
import { registerPatientUrl } from "@/backend/backend";
import { useToast } from "@/components/ui/use-toast";
import { getBaseUrl } from "@/lib/utils";
import { useRouter } from "@/i18n/routing";

export const useRegisterPatient = () => {
  const { token, setToken, setUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const registerPatientRequest = (adminData: RegisterData) => {
    return axios.post(getBaseUrl() + registerPatientUrl, adminData);
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
        Cookies.set("user", JSON.stringify(data.data.data.user), {
          expires: 30,
        });
        setToken(data.data.token);
        setUser(data.data.data.user);
        router.push("/Dashboard/MyProfile");
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
