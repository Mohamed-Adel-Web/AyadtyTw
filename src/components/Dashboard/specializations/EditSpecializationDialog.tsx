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
import { Label } from "@/components/ui/label";
import DialogLayout from "../generalDialog/DialogLayout";
import { useTranslations } from "next-intl"; // Import useTranslations

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
  const t = useTranslations("Dashboard.Specializations.Dialog"); // Initialize useTranslations hook
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
          <DialogTitle>{t("editTitle")}</DialogTitle> {/* Translated */}
          <DialogClose />
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            {t("name")} {/* Translated */}
          </Label>
          <Input
            id="name"
            defaultValue=""
            className="col-span-3"
            {...register("name", {
              required: t("nameRequired"), // Translated validation message
            })}
          />
          {errors.name && (
            <div className="text-red-500 w-full">{errors.name.message}</div>
          )}
        </div>
        <DialogFooter className="mt-3">
          <Button disabled={isPending}>{t("save")}</Button> {/* Translated */}
        </DialogFooter>
      </form>
    </DialogLayout>
  );
};

export default EditDialog;
