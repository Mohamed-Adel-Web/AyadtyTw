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
import { doctorUrl, specializationUrl } from "@/backend/backend";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { Specialization } from "@/types/specializationsTypes/specialization";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { fields } from "./fields";
import { assistant } from "@/types/assistantTypes/assistants";

export function EditDialog({
  open,
  onOpenChange,
  assistant,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assistant: assistant | null;
}) {
  const { register, formState, handleSubmit, reset } = useForm<Doctor>();
  const { mutate, isSuccess, isPending } = useEditData<FormData>(
    doctorUrl,
    assistant?.id,
    "editAssistant",
    "allAssistant"
  );
  const { errors } = formState;
  const onSubmit = (data: assistant) => {
    const formData = new FormData();
    formData.append("full_name", data.full_name);

    mutate(formData);
  };
  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);
  React.useMemo(() => {
    if (assistant) {
      reset({
        full_name: assistant.full_name,
     
      });
    }
  }, [assistant, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit assistant</DialogTitle>
            <DialogDescription>
              Enter the details of the assistant. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {fields
            .filter((field) => field.showInEdit)
            .map((field) => (
              <div className="space-y-2 my-2" key={field.name}>
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
