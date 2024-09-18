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
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterData } from "@/types/AuthTypes/registerTypes";
import { useRegisterPatient } from "@/customHooks/loginHooks/useRegister";
import React from "react";
import { useTranslations } from "next-intl";
import { fields } from "./fields";
import { Link } from "@/i18n/routing";

const RegisterComponent: React.FC = () => {
  const t = useTranslations("clinicWebsite.Register"); // Translation namespace
  const { mutate, isPending, isSuccess } = useRegisterPatient();
  const currentDate = new Date();
  const { register, handleSubmit, formState } = useForm<RegisterData>({
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
    <div className="flex items-center justify-center min-h-screen bg-muted ">
      <Card className="w-full max-w-4xl p-4 shadow-2xl">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">{t("welcome")}</CardTitle>
            <CardDescription>{t("enterDetails")}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name} className="block text-sm font-medium">
                    {t(`${field.label}`)}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    className="mt-1 block w-full"
                    {...register(field.name, {
                      required: t(`${field.required}`),
                    })}
                  />
                  {errors[field.name] && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button
              type="submit"
              className="w-full max-w-xs"
              disabled={isSubmitting}
            >
              {t("signUp")}
            </Button>
            <div className="text-center text-sm">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/clinic-website/login" className="underline" prefetch={false}>
                {t("signIn")}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterComponent;
