import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../loginHooks/useAuth";
import { getBaseUrl } from "@/lib/utils";

const useGetData = (
  url: string,
  queryKey: string,
  dependencies: (string | number | null | undefined)[] = [],
  enabledCondition: boolean = true,
  page: number = 1,
  per_page: number = 10,
  filterKey?: string,
  filterValue?: string
) => {
  const { token, setToken } = useAuth();
  const cookieToken = Cookies.get("token");
  if (cookieToken) {
    setToken(cookieToken);
  }

  const getDataRequest = () => {
    return axios.get(getBaseUrl() + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        per_page,
        ...(filterKey && filterValue ? { [filterKey]: filterValue } : {}),
      },
    });
  };

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: [queryKey, page, per_page, filterKey, filterValue, ...dependencies],
    queryFn: getDataRequest,
    enabled: enabledCondition,
  });

  return { data, error, isLoading, isSuccess, isError };
};

export default useGetData;
