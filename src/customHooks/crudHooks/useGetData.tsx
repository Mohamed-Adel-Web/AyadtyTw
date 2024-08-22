"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../loginHooks/useAuth";

const useGetData = (
  url: string,
  queryKey: string,
  dependencies: (string | number | null | undefined)[] = [],
  enabledCondition: boolean = true,
  page: number = 1,
  pageSize: number = 10
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
      params: {
        page,
        pageSize,
      },
    });
  };

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: [queryKey, page, pageSize, ...dependencies],
    queryFn: getDataRequest,
    enabled: enabledCondition,
  });

  return { data, error, isLoading, isSuccess, isError };
};

export default useGetData;

