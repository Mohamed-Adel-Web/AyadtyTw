"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useDeleteAllData from "@/customHooks/crudHooks/useDeleteAllData";
import { useTranslations } from "next-intl"; // Import useTranslations

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  mutationKey: string;
  queryKey: string;
  itemName?: string;
  method?: "put" | "delete";
}

const DeleteAllDialog = ({
  open,
  onOpenChange,
  url,
  mutationKey,
  queryKey,
  itemName = "item",
  method = "delete",
}: DeleteDialogProps) => {
  const { mutate, isSuccess, isPending } = useDeleteAllData(
    url,
    mutationKey,
    queryKey
  );

  const t = useTranslations("Dashboard.delete"); // Initialize translations

  const handleDelete = () => {
    mutate();
  };

  React.useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Confirm Delete")}</DialogTitle>{" "}
          {/* Translate title */}
        </DialogHeader>
        <DialogDescription>
          {method == "put"
            ? t("Are you sure you want to cancel all {itemName}?", { itemName })
            : t("Are you sure you want to delete all {itemName}?", {
                itemName,
              })}
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {t("Cancel")} {/* Translate button text */}
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {method == "put" ? t("Cancel") : t("Delete")}{" "}
            {/* Translate button text */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAllDialog;
