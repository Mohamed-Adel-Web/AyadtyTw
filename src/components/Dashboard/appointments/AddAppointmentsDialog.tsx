import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAddData from "@/customHooks/crudHooks/useAddData";
import { appointmentUrl, doctorUrl } from "@/backend/backend";
import { fields } from "./fields";
import { appointment } from "@/types/appointmentTypes/appointments";
import useMinDateTime from "@/customHooks/appointmentHook/useMinDateTime";
import { AsyncSelectComponent } from "../Common/AsyncSelect";
import DialogLayout from "../generalDialog/DialogLayout";
import { useTranslations } from "next-intl"; // Import useTranslations hook

export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { control, register, formState, handleSubmit, reset } =
    useForm<appointment>();
  const { mutate, isSuccess, isPending } = useAddData<appointment>(
    appointmentUrl,
    "addAppointment",
    "allAppointment"
  );
  const { errors } = formState;

  const t = useTranslations("Dashboard.appointment.addDialog"); 

  const onSubmit = (data: appointment) => {
    mutate(data);
  };

  const minDateTime = useMinDateTime();

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
          <DialogTitle>{t("AddNewAppointment")}</DialogTitle>
          <DialogDescription>{t("EnterDetails")}</DialogDescription>
        </DialogHeader>

        {fields
          .filter((field) => field.showInAdd)
          .map((field) => (
            <div className="space-y-2 my-3" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {t(field.label)}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                min={field.type === "datetime-local" ? minDateTime : undefined}
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
