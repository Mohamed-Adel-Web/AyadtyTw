"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "./useAuth";

export default function UseUser() {
  const { user, setUser } = useAuth();

  React.useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
  }, [setUser]);

  return { user };
}
