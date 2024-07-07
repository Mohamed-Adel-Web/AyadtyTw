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
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterData } from "@/types/AuthTypes/registerTypes";
import { useRegisterPatient } from "@/customHooks/loginHooks/useRegister";
import React from "react";
import { DatePickerComponent } from "./DatePicker";

const RegisterComponent: React.FC = () => {
  const { mutate, isPending } = useRegisterPatient();

  const currentDate = new Date();
  const { register, handleSubmit, setValue, control, formState } =
    useForm<RegisterData>({
      mode: "onSubmit",
      defaultValues: {
        date: currentDate.toISOString().split("T")[0],
      },
    });

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<RegisterData> = (registerData) => {
    mutate(registerData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome!</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                {...register("first_name", {
                  required: "First name is required",
                })}
              />
              {errors.first_name && (
                <div className=" text-red-500">{errors.first_name.message}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />
              {errors.last_name && (
                <div className="text-red-500">{errors.last_name.message}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                {...register("phone", {
                  required: "Phone number is required",
                })}
              />
              {errors.phone && (
                <div className="text-red-500">{errors.phone.message}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                placeholder="Enter your weight"
                {...register("weight", {
                  required: "Weight is required",
                })}
              />
              {errors.weight && (
                <div className="text-red-500">{errors.weight.message}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="w-full">
                <DatePickerComponent />
              </div>
              {errors.date && (
                <div className="text-red-500">{errors.date.message}</div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Sign Up
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm">
            Already have an account?
            <Link href="/login" className="underline" prefetch={false}>
              Sign In
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterComponent;
