"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { patientsUrl, rolesUrl } from "@/backend/backend";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { fields } from "./fields";
import { patient, patientDetails } from "@/types/patientTypes/patient";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { Role } from "@/types/RolesTypes/role";
import DialogLayout from "../generalDialog/DialogLayout";
import { useTranslations } from "next-intl"; // Import useTranslations

export function EditDialog({
  open,
  onOpenChange,
  patient,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: patientDetails | null;
}) {
  const t = useTranslations("Dashboard.Patients.Dialog");

  const { register, formState, handleSubmit, reset } = useForm<patient>();
  const { mutate, isSuccess, isPending } = useEditData<FormData>(
    patientsUrl,
    patient?.id,
    "editPatient",
    "allPatient",
    "post"
  );

  const { data: resData } = useGetData(rolesUrl, "allRoles");
  const rolesData = resData?.data;
  const { errors } = formState;
  const onSubmit = (data: patient) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    if (data.image.length) {
      formData.append("image", data.image[0]);
    }
    formData.append("role_id", data.role_id.toString());
    mutate(formData);
  };
  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);
  React.useMemo(() => {
    if (patient) {
      const { image, ...restData } = patient;
      reset(restData);
    }
  }, [patient, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{t("editPatient")}</DialogTitle> {/* Translated */}
          <DialogDescription>
            {t("enterDoctorDetails")} {/* Translated */}
          </DialogDescription>
        </DialogHeader>
        {fields
          .filter((field) => field.showInEdit)
          .map((field) => (
            <div className="space-y-2 my-2" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {t(field.label)} {/* Translated */}
              </Label>
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
            </div>
          ))}
        <h3 className="text-xl font-bold">{t("role")}</h3> {/* Translated */}
        <select
          id="role"
          {...register("role_id", {
            required: t("roleRequired"), // Translated validation message
          })}
          className="block w-full mt-3 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">{t("selectRole")}</option> {/* Translated */}
          {rolesData?.map((spec: Role) => (
            <option key={spec.id} value={spec.id} className="m5-2">
              {spec.name}
            </option>
          ))}
        </select>
        {errors.role_id && (
          <div className="text-red-500 w-full">{errors.role_id.message}</div>
        )}
        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            {t("saveChanges")} {/* Translated */}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
