"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { loginData } from "@/types/AuthTypes/loginTypes";
import useAdminSignIn from "@/customHooks/loginHooks/useAdminSignIn";
import { useState } from "react";

export default function LoginComponent() {
  const { mutate, isPending, error } = useAdminSignIn();
  const [loginError, setLoginError] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<loginData>();
  const { errors } = formState;

  const onSubmit = (loginData: loginData) => {
    setLoginError(null);
    mutate(loginData, {
      onError: (error: any) => {
        setLoginError(error.message || "Login failed. Please try again.");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loginError && (
              <div className="text-red-500 text-center">{loginError}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="Email">Email</Label>
              <Input
                id="Email"
                placeholder="Enter your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Email is not correct",
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm underline" prefetch={false}>
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign In
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm">
            Don&apos;t have an account?
            <Link href="/register" className="underline" prefetch={false}>
              Sign Up
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
