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
import DialogLayout from "../generalDialog/DialogLayout";
import { useTranslations } from "next-intl"; // Import useTranslations

export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("Dashboard.Specializations.Dialog"); // Initialize useTranslations hook
  // Initialize useTranslations hook
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
          <DialogTitle>{t("addTitle")}</DialogTitle> {/* Translated */}
          <DialogDescription>
            {t("enterDetails")} {/* Translated */}
          </DialogDescription>
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
          <Button type="submit" disabled={isPending}>
            {t("saveChanges")} {/* Translated */}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
