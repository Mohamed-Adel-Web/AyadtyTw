"use client";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { doctorUrl, patientsUrl, vitalHistoryUrl } from "@/backend/backend";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { fields } from "./fields";
import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";
import { Textarea } from "@/components/ui/textarea";
import DialogLayout from "../generalDialog/DialogLayout";
import { AsyncSelectComponent } from "../Common/AsyncSelect";
import { useTranslations } from "next-intl";

export function EditDialog({
  open,
  onOpenChange,
  vitalHistory,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vitalHistory: IVitalHistory | null;
}) {
  const t = useTranslations("Dashboard.vitalHistory.Dialog"); // Translation hook
  const { register, formState, handleSubmit, reset, control } = useForm<IVitalHistory>();
  const { mutate, isSuccess, isPending } = useEditData<IVitalHistory>(
    vitalHistoryUrl,
    vitalHistory?.id,
    "editVitalHistory",
    "allVitalHistory",
    "put"
  );
  const { errors } = formState;

  const onSubmit = (data: IVitalHistory) => {
    mutate(data);
  };

  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

  React.useMemo(() => {
    if (vitalHistory) {
      reset(vitalHistory);
    }
  }, [vitalHistory, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{t("editTitle")}</DialogTitle>
          <DialogDescription>{t("editDescription")}</DialogDescription>
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
                className="col-span-3"
                {...register(field.name, field.validate ? { required: field.required } : {})}
              />
              {errors[field.name] && <div className="text-red-500 w-full">{errors[field.name]?.message}</div>}
            </div>
          ))}
        <div className="space-y-2 my-3">
          <Label htmlFor={"Report"} className="text-right">
            {t("report")}
          </Label>
          <Textarea id={"report"} className="col-span-3" {...register("report")} />
          {errors.report && <div className="text-red-500 w-full">{errors.report?.message}</div>}
        </div>
        <div className="space-y-2 my-3">
          <AsyncSelectComponent
            control={control}
            name="patient_id"
            label={t("patientName")}
            url={patientsUrl}
            placeholder={t("selectPatient")}
            isRequired={true}
            defaultValue={{
              label: `${vitalHistory?.patient?.first_name ?? ""} ${vitalHistory?.patient?.last_name ?? ""}`,
              value: vitalHistory?.patient_id ?? 0,
            }}
          />
        </div>
        <div className="flex items-center space-x-1">
          <div className="inline-flex items-center">
            <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor={`show_patient`}>
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id={`show_patient`}
                {...register(`patient_show`)}
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
          <label htmlFor={`show_patient`} className="text-sm font-medium leading-none capitalize">
            {t("showInProfile")}
          </label>
        </div>
        <div className="space-y-2 my-3">
          <AsyncSelectComponent
            control={control}
            name="doctor_id"
            label={t("doctorName")}
            url={doctorUrl}
            placeholder={t("selectDoctor")}
            isRequired={true}
          />
        </div>
        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            {t("saveChanges")}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
