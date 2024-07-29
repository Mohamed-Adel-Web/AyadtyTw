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
import {
  doctorUrl,
  examinationTypeUrl,
} from "@/backend/backend";
import useGetData from "@/customHooks/crudHooks/useGetData";
import useAddData from "@/customHooks/crudHooks/useAddData";
import { examination } from "@/types/examinationTypes/examinationTypes";
import { fields } from "./fields";
import { Doctor } from "@/types/doctorsTypes/doctors";
export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, formState, handleSubmit, reset } = useForm<examination>();
  const { data } = useGetData(doctorUrl, "allDoctor");
  const doctorsData = data?.data.data;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add New Examination Type</DialogTitle>
            <DialogDescription>
              Enter the details of the new Examination. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {fields
            .filter((field) => field.showInAdd)
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
            ))}{" "}
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
