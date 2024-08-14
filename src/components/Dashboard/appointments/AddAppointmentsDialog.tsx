"use client";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
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
import useAddData from "@/customHooks/crudHooks/useAddData";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { appointmentUrl, doctorUrl } from "@/backend/backend";
import { fields } from "./fields";
import { Doctor } from "@/types/doctorsTypes/doctors";
import { appointment } from "@/types/appointmentTypes/appointments";
import useMinDateTime from "@/customHooks/appointmentHook/useMinDateTime";
export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, formState, handleSubmit, reset } = useForm<appointment>();
  const { mutate, isSuccess, isPending } = useAddData<appointment>(
    appointmentUrl,
    "addAppointment",
    "allAppointment"
  );
  const { errors } = formState;
  const onSubmit = (data: appointment) => {
    mutate(data);
  };
  const { data } = useGetData(doctorUrl, "allDoctor");
  const doctorsData = data?.data.data;
  const minDateTime = useMinDateTime();

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
            <DialogTitle>Add New appointment</DialogTitle>
            <DialogDescription>
              Enter the details of the new appointment. Click save when
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
                  min={
                    field.type === "datetime-local" ? minDateTime : undefined
                  }
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

          <div className="space-y-2 my-3">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <select
              id="status"
              {...register("status", {
                required: "Status is required",
              })}
              className="block w-full mt-3 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select status</option>
              <option value={"available"}>Available</option>

              <option value={"not-available"}>Not Available</option>
            </select>
            {errors.status && (
              <div className="text-red-500 w-full">
                {errors.status?.message}
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
