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
import { Doctor } from "@/types/doctorsTypes/doctors";
import { doctorUrl, rolesUrl, specializationUrl } from "@/backend/backend";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { Specialization } from "@/types/specializationsTypes/specialization";
import useAddData from "@/customHooks/crudHooks/useAddData";
import { fields } from "./fields";
import { Role } from "@/types/RolesTypes/role";
import DialogLayout from "../generalDialog/DialogLayout";
import { useTranslations } from "next-intl"; // Import useTranslations

export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("Dashboard.doctor.dialog");

  const { register, formState, handleSubmit, reset } = useForm<Doctor>();
  const { data } = useGetData(specializationUrl, "allSpecialization");
  const { data: resData } = useGetData(rolesUrl, "allRole");
  const rolesData = resData?.data;
  const specializationsData = data?.data.data;
  const { mutate, isSuccess, isPending } = useAddData<FormData>(
    doctorUrl,
    "addDoctor",
    "allDoctor"
  );
  const { errors } = formState;

  const onSubmit = (data: Doctor) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("specialization_id", data.specialization_id.toString());
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    formData.append("role_id", data.role.id.toString());
    mutate(formData);
  };

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
          <DialogTitle>{t("AddNewDoctor")}</DialogTitle> {/* Translated */}
          <DialogDescription>{t("EnterDoctorDetails")}</DialogDescription>{" "}
          {/* Translated */}
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
        <div>
          <Label htmlFor="specialization" className="text-right">
            {t("Specialization")} {/* Translated */}
          </Label>
          <select
            id="specialization"
            {...register("specialization_id", {
              required: t("SpecializationRequired"), // Translated
            })}
            className="block w-full mt-2 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">{t("SelectSpecialization")}</option>{" "}
            {/* Translated */}
            {specializationsData?.map((spec: Specialization) => (
              <option key={spec.id} value={spec.id} className="m5-2">
                {spec.name}
              </option>
            ))}
          </select>
          {errors.specialization_id && (
            <div className="text-red-500 w-full">
              {errors.specialization_id?.message}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="role" className="text-right">
            {t("Role")} {/* Translated */}
          </Label>
          <select
            id="role"
            {...register("role.id", {
              required: t("RoleRequired"), // Translated
            })}
            className="block w-full mt-2 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">{t("SelectRole")}</option> {/* Translated */}
            {rolesData?.map((spec: Role) => (
              <option key={spec.id} value={spec.id} className="m5-2">
                {spec.name}
              </option>
            ))}
          </select>
          {errors.role?.id && (
            <div className="text-red-500 w-full">{errors.role?.id.message}</div>
          )}
        </div>
        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            {t("SaveChanges")} {/* Translated */}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
