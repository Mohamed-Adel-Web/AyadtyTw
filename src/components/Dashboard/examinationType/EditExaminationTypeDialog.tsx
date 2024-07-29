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
import { Doctor, DoctorDetails } from "@/types/doctorsTypes/doctors";
import { doctorUrl, examinationTypeUrl, rolesUrl } from "@/backend/backend";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { fields } from "./fields";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { Role } from "@/types/RolesTypes/role";
import {
  examination,
  examinationDetails,
} from "@/types/examinationTypes/examinationTypes";

export function EditDialog({
  open,
  onOpenChange,
  examinationType,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examinationType: examinationDetails | null;
}) {
  const { register, formState, handleSubmit, reset } = useForm<examination>();
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
      reset({
        name: examinationType.name,
        amount: examinationType.amount,
        color: examinationType.color,
        doctor_id: examinationType.doctor.id,
      });
    }
  }, [examinationType, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Examination Type</DialogTitle>
            <DialogDescription>
              Enter the details of the Examination Type. Click save when you&apos;re
              done.
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
            <Label htmlFor="doctor" className="text-right">
              Doctor Name
            </Label>
            <select
              id="doctor"
              {...register("doctor_id", {
                required: "Doctor name is required",
              })}
              className="block w-full mt-3 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select doctor</option>
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
          <DialogFooter className="mt-3">
            <Button type="submit" disabled={isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
