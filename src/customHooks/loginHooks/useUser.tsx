"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "./useAuth";
import useGetData from "../crudHooks/useGetData";
import { rolesUrl } from "@/backend/backend";

export default function useUser() {
  const { user, setUser } = useAuth();
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      const parsedUser = JSON.parse(cookieUser);
      setUser(parsedUser);
      setRoleId(parsedUser.role.id);
    }
  }, [setUser]);

  const { data, isSuccess } = useGetData(
    `${rolesUrl}/${roleId}`,
    "role",
    [roleId],
    !!roleId
  );

  return { user, role: data?.data.role, isSuccess };
}
