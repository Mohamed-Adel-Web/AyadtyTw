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
import { assistantsUrl, doctorUrl, rolesUrl } from "@/backend/backend";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { fields } from "./fields";
import { assistant, assistantDetails } from "@/types/assistantTypes/assistants";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { Role } from "@/types/RolesTypes/role";
import { AsyncSelectComponent } from "@/components/Common/AsyncSelect";
import DialogLayout from "@/components/generalDialog/DialogLayout";

export function EditDialog({
  open,
  onOpenChange,
  assistant,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assistant: assistantDetails | null;
}) {
  const { register, formState, handleSubmit, reset, control } =
    useForm<assistant>();
  const { mutate, isSuccess, isPending } = useEditData<FormData>(
    assistantsUrl,
    assistant?.id,
    "editAssistant",
    "allAssistant",
    "post"
  );
  const { data } = useGetData(doctorUrl, "allDoctor");
  const doctorsData = data?.data.data;
  const { data: resData } = useGetData(rolesUrl, "allRoles");
  const rolesData = resData?.data;
  const { errors } = formState;
  const onSubmit = (data: assistant) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.first_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.image.length) {
      formData.append("image", data.image[0]);
    }
    formData.append("_method", "PUT");
    formData.append("doctor_id", data.doctor_id.toString());
    formData.append("role_id", data.role.id.toString());
    mutate(formData);
  };
  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);
  React.useMemo(() => {
    if (assistant) {
      reset(assistant);
    }
  }, [assistant, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit assistant</DialogTitle>
          <DialogDescription>
            Enter the details of the assistant. Click save when you&apos;re
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
          <AsyncSelectComponent
            control={control}
            name="doctor_id"
            label="Doctor Name"
            url={doctorUrl}
            placeholder="Select doctor..."
            isRequired={true}
            defaultValue={{
              label:
                assistant?.doctor.first_name +
                " " +
                assistant?.doctor.last_name,
              value: assistant?.doctor.id ?? 0,
            }} // Pass the default doctor value here
          />
        </div>
        <h3 className="text-xl font-bold"> Role</h3>
        <select
          id="role"
          {...register("role.id", {
            required: "role is required",
          })}
          className="block w-full mt-3 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select role</option>
          {rolesData?.map((spec: Role) => (
            <option key={spec.id} value={spec.id} className="m5-2">
              {spec.name}
            </option>
          ))}
        </select>
        {errors.role?.id && (
          <div className="text-red-500 w-full">{errors.role?.id.message}</div>
        )}
        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
