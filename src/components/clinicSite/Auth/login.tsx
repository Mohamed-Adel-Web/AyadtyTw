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
import { useForm } from "react-hook-form";
import { loginData } from "@/types/AuthTypes/loginTypes";
import useAdminSignIn from "@/customHooks/loginHooks/useAdminSignIn";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function LoginComponent() {
  const t = useTranslations("clinicWebsite.Login"); // Translation namespace
  const { mutate, isPending, error } = useAdminSignIn();
  const [loginError, setLoginError] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<loginData>();
  const { errors } = formState;

  const onSubmit = (loginData: loginData) => {
    setLoginError(null);
    mutate(loginData, {
      onError: (error: any) => {
        setLoginError(error.message || t("loginFailed"));
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              {t("welcomeBack")}
            </CardTitle>
            <CardDescription>
              {t("enterCredentials")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loginError && (
              <div className="text-red-500 text-center">{loginError}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="Email">{t("emailLabel")}</Label>
              <Input
                id="Email"
                placeholder={t("emailPlaceholder")}
                {...register("email", {
                  required: t("emailRequired"),
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: t("emailInvalid"),
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("passwordLabel")}</Label>
                <Link href="#" className="text-sm underline" prefetch={false}>
                  {t("forgotPassword")}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder={t("passwordPlaceholder")}
                {...register("password", {
                  required: t("passwordRequired"),
                })}
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {t("signInButton")}
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm">
            {t("noAccount")}{" "}
            <Link href="/clinic-website/register" className="underline" prefetch={false}>
              {t("signUp")}
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
