"use client";
import { assistant } from "@/types/assistantTypes/assistants";
import { Doctor } from "@/types/doctorsTypes/doctors";
import { patient } from "@/types/patientTypes/patient";
import React, { createContext, useContext, useState } from "react";
interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  user: Doctor | patient | assistant | undefined | null;
  setUser: (user: Doctor | patient | assistant | undefined | null) => void;
}
const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
  user: null,
  setUser: () => {},
});
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<
    Doctor | patient | assistant | undefined | null
  >();

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const { token, setToken, user, setUser } = useContext(AuthContext);
  return { token, setToken, user, setUser };
};
