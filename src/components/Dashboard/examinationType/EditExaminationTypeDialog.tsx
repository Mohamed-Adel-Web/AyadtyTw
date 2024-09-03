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
import { doctorUrl, examinationTypeUrl, rolesUrl } from "@/backend/backend";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { fields } from "./fields";
import useGetData from "@/customHooks/crudHooks/useGetData";
import {
  examination,
  examinationDetails,
} from "@/types/examinationTypes/examinationTypes";
import { AsyncSelectComponent } from "@/components/Common/AsyncSelect";
import DialogLayout from "@/components/generalDialog/DialogLayout";

export function EditDialog({
  open,
  onOpenChange,
  examinationType,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examinationType: examinationDetails | null;
}) {
  const { register, formState, handleSubmit, reset, control } =
    useForm<examination>();
  const { mutate, isSuccess, isPending } = useEditData<examination>(
    examinationTypeUrl,
    examinationType?.id,
    "editExaminationType",
    "allExaminationType",
    "put"
  );
  const { data } = useGetData(doctorUrl, "allDoctor");
  const doctorsData = data?.data.data;
  const { data: resData } = useGetData(rolesUrl, "allRoles");
  const { errors } = formState;
  const onSubmit = (data: examination) => {
    mutate(data);
  };
  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);
  React.useMemo(() => {
    if (examinationType) {
      reset(examinationType);
    }
  }, [examinationType, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit Examination Type</DialogTitle>
          <DialogDescription>
            Enter the details of the Examination Type. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {fields
          .filter((field) => field.showInEdit)
          .map((field) => (
            <div className="space-y-2 my-3" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {field.label}
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
        <div className="space-y-2 my-3">
          <AsyncSelectComponent
            control={control}
            name="doctor_id"
            label="Doctor Name"
            url={doctorUrl}
            placeholder="Select doctor..."
            isRequired={true}
            defaultValue={{
              label:
                examinationType?.doctor.first_name +
                " " +
                examinationType?.doctor.last_name,

              value: examinationType?.doctor.id ?? 0,
            }}
          />
        </div>
        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
