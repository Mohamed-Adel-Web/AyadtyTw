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
import { appointmentUrl, doctorUrl } from "@/backend/backend";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { fields } from "./fields";
import useGetData from "@/customHooks/crudHooks/useGetData";
import {
  appointment,
  appointmentDetails,
} from "@/types/appointmentTypes/appointments";
import DialogLayout from "../generalDialog/DialogLayout";
import { useTranslations } from "next-intl"; // Import useTranslations hook

export function EditDialog({
  open,
  onOpenChange,
  appointment,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: appointmentDetails | null;
}) {
  const { register, formState, handleSubmit, reset } = useForm<appointment>();
  const { mutate, isSuccess, isPending } = useEditData<appointment>(
    appointmentUrl,
    appointment?.id,
    "editAppointment",
    "allAppointment",
    "put"
  );
  const { data } = useGetData(doctorUrl, "allDoctor");
  const doctorsData = data?.data.data;
  const { errors } = formState;

  const t = useTranslations("Dashboard.appointment.editDialog"); 

  const onSubmit = (data: appointment) => {
    mutate(data);
  };

  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

  React.useMemo(() => {
    if (appointment) {
      reset({
        time_start: appointment.time_start,
        time_end: appointment.time_end,
        duration: appointment.duration,
        doctor_id: appointment.doctor.id,
        status: appointment.status,
      });
    }
  }, [appointment, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{t("EditAppointment")}</DialogTitle>
          <DialogDescription>{t("EnterDetails")}</DialogDescription>
        </DialogHeader>
        {fields
          .filter((field) => field.showInEdit)
          .map((field) => (
            <div className="space-y-2 my-3" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {t(field.label)}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                disabled
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
          <Label htmlFor="doctor" className="text-right">
            {t("DoctorName")}
          </Label>
          <select
            id="doctor"
            {...register("doctor_id", {
              required: t("DoctorNameRequired"),
            })}
            disabled
            className="block w-full mt-3 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">{t("SelectDoctor")}</option>
            {doctorsData?.map((spec: Doctor) => (
              <option key={spec.id} value={spec.id} className="m5-2">
                {spec.first_name + " " + spec.last_name}
              </option>
            ))}
          </select>
          {errors.doctor_id && (
            <div className="text-red-500 w-full">
              {errors.doctor_id?.message}
            </div>
          )}
        </div>

        <div className="space-y-2 my-3">
          <Label htmlFor="status" className="text-right">
            {t("Status")}
          </Label>
          <select
            id="status"
            {...register("status", {
              required: t("StatusRequired"),
            })}
            className="block w-full mt-3 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">{t("SelectStatus")}</option>
            <option value={"available"}>{t("Available")}</option>
            <option value={"not-available"}>{t("NotAvailable")}</option>
          </select>
          {errors.status && (
            <div className="text-red-500 w-full">{errors.status?.message}</div>
          )}
        </div>
        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            {t("SaveChanges")}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
