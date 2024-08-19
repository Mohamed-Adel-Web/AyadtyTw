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
import { doctorUrl, patientsUrl, vitalHistoryUrl } from "@/backend/backend";
import useAddData from "@/customHooks/crudHooks/useAddData";
import { fields } from "./fields";
import { patient } from "@/types/patientTypes/patient";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";
import { Textarea } from "@/components/ui/textarea";
import { AsyncSelectComponent } from "@/components/Common/AsyncSelect";
export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, formState, handleSubmit, control, reset } =
    useForm<IVitalHistory>();
  const { mutate, isSuccess, isPending } = useAddData<IVitalHistory>(
    vitalHistoryUrl,
    "addVitalHistory",
    "allVitalHistory"
  );
  const { errors } = formState;
  const onSubmit = (data: IVitalHistory) => {
    mutate(data);
  };
  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
      reset();
    }
  }, [isSuccess, onOpenChange, reset]);
  const { data } = useGetData(patientsUrl, "allPatient");
  const patientsData: patient[] = data?.data.data;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[780px] overflow-auto">
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full">
          <DialogHeader>
            <DialogTitle>Add New Vital History</DialogTitle>
            <DialogDescription>
              Enter the details of the new Vital History. Click save when
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
            />
          </div>{" "}
          <div className="space-y-2 my-3">
            <AsyncSelectComponent
              control={control}
              name="doctor_id"
              label="Doctor Name"
              url={doctorUrl}
              placeholder="Select doctor..."
              isRequired={true}
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
