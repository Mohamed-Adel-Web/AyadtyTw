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
import useAddData from "@/customHooks/crudHooks/useAddData";
import { Specialization } from "@/types/specializationsTypes/specialization";
import { specializationUrl } from "@/backend/backend";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import DialogLayout from "@/components/generalDialog/DialogLayout";
export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, formState, handleSubmit, reset } =
    useForm<Specialization>();
  const { mutate, isSuccess, isPending } = useAddData<Specialization>(
    specializationUrl,
    "addSpecialization",
    "allSpecialization"
  );
  const { errors } = formState;
  const onSubmit = (data: Specialization) => {
    mutate(data);
  };
  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
      reset();
    }
  }, [isSuccess, onOpenChange, reset]);
  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add New Specialization</DialogTitle>
            <DialogDescription>
              Enter the details of the new specialization. Click save when
              you&apos;re done.
            </DialogDescription>
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
            <Button type="submit" disabled={isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
    </DialogLayout>
  );
}
