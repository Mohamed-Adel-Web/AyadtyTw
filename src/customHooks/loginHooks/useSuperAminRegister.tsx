"use client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { clinicRegister } from "@/backend/backend";
import Cookies from "js-cookie";

import { useToast } from "@/components/ui/use-toast";
import { ISuperAdmin } from "@/types/superAdminTypes/isuperAdmin";
export const useRegisterSuperAdmin = () => {
  const { toast } = useToast();
  const registerSuperAdminRequest = (adminData: ISuperAdmin) => {
    return axios.post(clinicRegister, adminData);
  };
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["registerSuperAmin"],
    mutationFn: registerSuperAdminRequest,
    onSuccess: (data) => {
      if (data.data.status === 200) {
        console.log(data.data);
        toast({
          title: `${data.data.message}`,
        });
        const subdomain = data.data.subdomain;
        const subdomainUrl = `https://${subdomain}.ayadty.com`;
        window.location.href = subdomainUrl;
      } else {
        toast({
          variant: "destructive",
          title: `${data.data.message}`,
        });
      }
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
};
