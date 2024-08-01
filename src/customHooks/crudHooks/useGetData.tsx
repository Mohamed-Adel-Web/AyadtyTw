"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../loginHooks/useAuth";

const useGetData = (
  url: string ,
  queryKey: string,
  dependencies: any[] = [],
  enabledCondition: boolean = true
) => {
  const { token, setToken } = useAuth();
  const cookieToken = Cookies.get("token");
  if (cookieToken) {
    setToken(cookieToken);
  }

  const getDataRequest = () => {
 
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: [queryKey, ...dependencies],
    queryFn: getDataRequest,
    enabled: enabledCondition,
  });

  return { data, error, isLoading, isSuccess, isError };
};

export default useGetData;
