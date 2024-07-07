"use client"
import React, { createContext, useContext, useState } from "react";
interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
});
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const { token, setToken } = useContext(AuthContext);
  return { token, setToken };
};
