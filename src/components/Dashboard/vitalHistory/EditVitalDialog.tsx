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
import { Doctor } from "@/types/doctorsTypes/doctors";
import {
  appointmentUrl,
  doctorUrl,
  patientsUrl,
  vitalHistoryUrl,
} from "@/backend/backend";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { fields } from "./fields";
import useGetData from "@/customHooks/crudHooks/useGetData";
import {
  appointment,
  appointmentDetails,
} from "@/types/appointmentTypes/appointments";
import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";
import { AsyncSelectComponent } from "@/components/Common/AsyncSelect";
import { Textarea } from "@/components/ui/textarea";

export function EditDialog({
  open,
  onOpenChange,
  vitalHistory,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vitalHistory: IVitalHistory | null;
}) {
  const { register, formState, handleSubmit, reset, control } =
    useForm<IVitalHistory>();
  const { mutate, isSuccess, isPending } = useEditData<IVitalHistory>(
    vitalHistoryUrl,
    vitalHistory?.id,
    "editVitalHistory",
    "allVitalHistory",
    "put"
  );
  const { data } = useGetData(doctorUrl, "allDoctor");
  const doctorsData = data?.data.data;
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[780px] overflow-auto">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit appointment</DialogTitle>
            <DialogDescription>
              Enter the details of the appointment. Click save when you&apos;re
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
            <Label htmlFor={"Report"} className="text-right">
              Report
            </Label>
            <Textarea
              id={"report"}
              className="col-span-3"
              {...register("report")}
            />
            {errors.report && (
              <div className="text-red-500 w-full">
                {errors.report?.message}
              </div>
            )}
          </div>
          <div className="space-y-2 my-3">
            <AsyncSelectComponent
              control={control}
              name="patient_id"
              label="Patient Name"
              url={patientsUrl}
              placeholder="Select patient..."
              isRequired={true}
              defaultValue={{
                label:
                  vitalHistory?.patient.first_name +
                  " " +
                  vitalHistory?.patient.last_name,
                value: vitalHistory?.patient_id ?? 0,
              }}
            />
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
