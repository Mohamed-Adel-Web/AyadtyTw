"use client";
import * as React from "react";
import {

  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Specialization } from "@/types/specializationsTypes/specialization";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import useEditData from "@/customHooks/crudHooks/useEditData";
import { specializationUrl } from "@/backend/backend";
import { Label } from "@radix-ui/react-label";
import DialogLayout from "@/components/generalDialog/DialogLayout";

interface EditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  specialization: Specialization | null;
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onOpenChange,
  specialization,
}) => {
  const { register, formState, handleSubmit, reset } =
    useForm<Specialization>();
  const { mutate, isSuccess, isPending } = useEditData(
    specializationUrl,
    specialization?.id,
    "editSpecialization",
    "allSpecialization",
    "post"
  );
  const { errors } = formState;
  const onSubmit = (data: Specialization) => {
    mutate(data);
  };
  React.useMemo(() => {
    if (specialization) {
      reset(specialization);
    }
  }, [specialization, reset]);

  React.useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);
  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit Specialization</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            defaultValue=""
            className="col-span-3"
            {...register("name", {
              required: "specialization name is required",
            })}
          />
          {errors.name && (
            <div className="text-red-500 w-full">{errors.name.message}</div>
          )}
        </div>

        <DialogFooter className="mt-3">
          <Button disabled={isPending}>Save</Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
};

export default EditDialog;
