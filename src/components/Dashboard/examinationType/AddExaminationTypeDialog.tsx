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
import { doctorUrl, examinationTypeUrl } from "@/backend/backend";
import useAddData from "@/customHooks/crudHooks/useAddData";
import { examination } from "@/types/examinationTypes/examinationTypes";
import { fields } from "./fields";
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
  const  t  = useTranslations("Dashboard.examinationType.dialog"); // Initialize useTranslations hook

  const { register, formState, handleSubmit, reset, control } =
    useForm<examination>();
  const { mutate, isSuccess, isPending } = useAddData<examination>(
    examinationTypeUrl,
    "addExaminationType",
    "allExaminationType"
  );
  const { errors } = formState;

  const onSubmit = (data: examination) => {
    mutate(data);
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
          <DialogTitle>{t("AddNewExaminationType")}</DialogTitle> {/* Translated */}
          <DialogDescription>{t("EnterExaminationDetails")}</DialogDescription> {/* Translated */}
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
            label={t("DoctorName")} // Translated
            url={doctorUrl}
            placeholder={t("SelectDoctor")} // Translated
            isRequired={true}
          />
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
