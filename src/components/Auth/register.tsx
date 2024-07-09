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
import { DatePickerComponent } from "../DatePicker";
import { fields } from "./fields";
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
            {fields.map((field) => (
              <div className="space-y-2" key={field.name}>
                <Label htmlFor={field.name} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  type={field.type}
                  className="col-span-3"
                  {...register(field.name, {
                    required: field.required,
                  })}
                />
                {errors[field.name] && (
                  <div className="text-red-500 w-full">
                    {errors[field.name]?.message}
                  </div>
                )}
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="w-full">
                <DatePickerComponent />
              </div>
              {errors.date && (
                <div className="text-red-500">{errors.date.message}</div>
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
