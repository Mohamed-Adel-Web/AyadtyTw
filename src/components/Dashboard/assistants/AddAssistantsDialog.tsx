"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { assistantsUrl, doctorUrl, rolesUrl } from "@/backend/backend";
import useAddData from "@/customHooks/crudHooks/useAddData";
import { fields } from "./fields";
import { assistant } from "@/types/assistantTypes/assistants";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { Role } from "@/types/RolesTypes/role";
import DialogLayout from "../generalDialog/DialogLayout";
import { AsyncSelectComponent } from "../Common/AsyncSelect";
import { useTranslations } from "next-intl"; // Import useTranslations

export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, formState, handleSubmit, reset, control } =
    useForm<assistant>();
  const { mutate, isSuccess, isPending } = useAddData<FormData>(
    assistantsUrl,
    "addAssistant",
    "allAssistant"
  );
  const { errors } = formState;

  const t = useTranslations("Dashboard.assistant.addDialog"); // Initialize useTranslations hook

  const onSubmit = (data: assistant) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("image", data.image[0]);
    formData.append("doctor_id", data.doctor_id.toString());
    formData.append("role_id", data.role.id.toString());
    mutate(formData);
  };

  const { data } = useGetData(doctorUrl, "allDoctor");
  const doctorsData = data?.data.data;
  const { data: resData } = useGetData(rolesUrl, "allRole");
  const rolesData = resData?.data;

  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
      reset();
    }
  }, [isSuccess, onOpenChange, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{t("AddNewAssistant")}</DialogTitle> {/* Translated */}
          <DialogDescription>{t("EnterAssistantDetails")}</DialogDescription> {/* Translated */}
        </DialogHeader>
        {fields
          .filter((field) => field.showInAdd)
          .map((field) => (
            <div className="space-y-2 my-3" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {t(field.label)} {/* Translated */}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                className="col-span-3"
                {...register(
                  field.name,
                  field.validate ? { required: t(field.required || "") } : {}
                )}
              />
              {errors[field.name] && (
                <div className="text-red-500 w-full">
                  {errors[field.name]?.message}
                </div>
              )}
            </div>
          ))}

        <div className="space-y-2 my-3">
          <AsyncSelectComponent
            control={control}
            name="doctor_id"
            label={t("DoctorName")} 
            url={doctorUrl}
            placeholder={t("SelectDoctor")} 
            isRequired={true}
          />
        </div>
        <h3 className="text-xl font-bold">{t("Role")}</h3> {/* Translated */}
        <select
          id="role"
          {...register("role.id", {
            required: t("RoleRequired"), // Translated
          })}
          className="block w-full mt-3 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">{t("SelectRole")}</option> {/* Translated */}
          {rolesData?.map((spec: Role) => (
            <option key={spec.id} value={spec.id} className="mt-2">
              {spec.name}
            </option>
          ))}
        </select>
        {errors.role?.id && (
          <div className="text-red-500 w-full">{errors.role?.id.message}</div>
        )}
        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            {t("SaveChanges")} {/* Translated */}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
