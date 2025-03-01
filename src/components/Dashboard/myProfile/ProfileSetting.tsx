"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { PencilIcon } from "lucide-react";
import { fields } from "./fields";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { patientsUrl, assistantsUrl, doctorUrl } from "@/backend/backend";
import { DoctorDetails } from "@/types/doctorsTypes/doctors";
import { Role } from "@/types/RolesTypes/role";
import { useTranslations } from "next-intl"; // Import useTranslations

type ProfileType = DoctorDetails;

export default function ProfileSetting({
  profileData,
  role,
}: {
  profileData: ProfileType;
  role: Role;
}) {
  const  t = useTranslations("Dashboard.profile"); // Fetch translations from the profile namespace
  const { register, formState, handleSubmit, control, reset } =
    useForm<ProfileType>();
  let endpointUrl;
  switch (role?.permissions?.profileType?.type) {
    case "doctor":
      endpointUrl = doctorUrl;
      break;
    case "assistant":
      endpointUrl = assistantsUrl;
      break;
    case "patient":
      endpointUrl = patientsUrl;
      break;
    default:
      endpointUrl = patientsUrl;
  }
  const { mutate, isPending } = useEditData(
    endpointUrl,
    profileData?.id,
    `edit${role?.permissions?.profileType?.type}`,
    `all${role?.permissions?.profileType?.type}`,
    "post"
  );

  useMemo(() => {
    if (profileData) {
      const { image, ...resetData } = profileData;
      reset(resetData);
    }
  }, [profileData, reset]);

  const onSubmit = (data: ProfileType) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("role_id", role?.id.toString());
    if ("specialization_id" in profileData && profileData.specialization_id) {
      formData.append(
        "specialization_id",
        profileData.specialization_id.toString()
      );
    }
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    mutate(formData);
  };

  const { errors } = formState;
  return (
    <>
      <div className="flex flex-col min-h-dvh bg-background shadow-2xl rounded-xl">
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <div className="text-lg font-semibold"></div>
              <div className="text-sm text-muted-foreground">
                {profileData?.first_name + " " + profileData?.last_name}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto grid max-w-3xl gap-8">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>{t("personalInfo")}</CardTitle>
                  <CardDescription>{t("updateDetails")}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {fields.map((field) => (
                    <div
                      key={field.name}
                      className="grid grid-cols-[minmax(100px,_1fr)_2fr] items-center gap-4"
                    >
                      <Label htmlFor={field.name}>{t(field.label)}</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={field.name}
                          type={field.type}
                          className="col-span-3"
                          {...register(
                            field.name,
                            field.validate ? { required: field.required } : {}
                          )}
                        />
                        {errors[field.name] && (
                          <div className="text-red-500 w-full">
                            {errors[field.name]?.message}
                          </div>
                        )}
                        <Button variant="outline" size="icon">
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">{t("edit")}</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button disabled={isPending}>{t("saveChanges")}</Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
