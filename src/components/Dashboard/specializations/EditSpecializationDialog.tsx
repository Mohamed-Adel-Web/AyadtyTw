"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
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
  const { mutate, isSuccess,isPending } = useEditData(
    specializationUrl,
    specialization?.id,
    "editSpecialization",
    "allSpecialization",
    "post",
  );
  const { errors } = formState;
  const onSubmit = (data: Specialization) => {
    mutate(data);
  };
  React.useMemo(() => {
    if (specialization) {
      reset({
        name: specialization.name,
      });
    }
  }, [specialization, reset]);

  React.useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
