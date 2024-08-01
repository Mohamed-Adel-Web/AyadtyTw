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
import { patient } from "@/types/patientTypes/patient";
import { useMemo } from "react";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { patientsUrl } from "@/backend/backend";
import useUser from "@/customHooks/loginHooks/useUser";
export default function ProfileSetting({ patient }: { patient: patient }) {
  const { register, formState, handleSubmit, control, reset } =
    useForm<patient>();
  const { mutate } = useEditData(
    patientsUrl,
    patient?.id,
    "editPatient",
    "patient",
    "post"
  );
  const { role } = useUser();
  useMemo(() => {
    if (patient) {
      reset({
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        phone: patient.phone,
      });
    }
  }, [patient, reset]);
  const onSubmit = (data: patient) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("role_id", role.id);

    if (data.image.length) {
      formData.append("image", data.image[0]);
    }
    mutate(formData);
  };
  const { errors } = formState;
  return (
    <>
      <div className="flex flex-col min-h-dvh bg-background">
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <div className="text-lg font-semibold"></div>
              <div className="text-sm text-muted-foreground">
                {patient?.first_name + "" + patient?.last_name}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto grid max-w-3xl gap-8">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {fields.map((field) => (
                    <div
                      key={field.name}
                      className="grid grid-cols-[minmax(100px,_1fr)_2fr] items-center gap-4"
                    >
                      <Label htmlFor={field.name}>{field.label}</Label>
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
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
