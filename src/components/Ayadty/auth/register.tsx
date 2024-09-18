"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { fields } from "./field";
import { ISuperAdmin } from "@/types/superAdminTypes/isuperAdmin";
import { useRegisterSuperAdmin } from "@/customHooks/loginHooks/useSuperAminRegister";
import { useTranslations } from "next-intl";

const RegisterComponent: React.FC = () => {
  const t = useTranslations("Ayadty.RegisterForm");
  const { mutate, isPending } = useRegisterSuperAdmin();
  const { register, handleSubmit, formState } = useForm<ISuperAdmin>({
    mode: "onSubmit",
  });

  const { errors, isSubmitting } = formState;
  const onSubmit: SubmitHandler<ISuperAdmin> = (registerData) => {
    mutate(registerData);
  };

  return (
    <div className="flex items-center justify-center  ">
      <Card className="w-[700px] shadow-xl ">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              {t("welcomeTitle")}
            </CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div className={`space-y-2  col-span-1 `} key={field.name}>
                  <Label htmlFor={field.name} className="text-right">
                    {t(`fields.${field.name}.label`)}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={
                      field.name == "subdomain" ? "yourdomain.com" : ""
                    }
                    {...register(field.name, {
                      required: t(`fields.${field.name}.required`),
                    })}
                  />

                  {errors[field.name] && (
                    <div className="text-red-500 w-full">
                      {errors[field.name]?.message}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isPending || isSubmitting}
            >
              {t("submitButton")}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default RegisterComponent;
