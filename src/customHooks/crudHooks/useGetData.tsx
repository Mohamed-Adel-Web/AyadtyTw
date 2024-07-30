"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../loginHooks/useAuth";

const useGetData = (
  url: string | null,
  queryKey: string,
  dependencies: any[] = []
) => {
  const { token, setToken } = useAuth();
  const cookieToken = Cookies.get("token");
  if (cookieToken) {
    setToken(cookieToken);
  }

  const getDataRequest = () => {
    if (!url) {
      return Promise.reject(new Error("URL is required"));
    }
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: [queryKey, ...dependencies],
    queryFn: getDataRequest,
    enabled: !!url, 
  });

  return { data, error, isLoading, isSuccess, isError };
};

export default useGetData;
