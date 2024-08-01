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
import useDeleteData from "@/customHooks/crudHooks/useDeleteData";

interface DeleteDialogProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: T | null;
  url: string;
  mutationKey: string;
  queryKey: string;
  itemName?: string;
  method?: "put" | "delete";
}

const DeleteDialog = <T extends { id: number | undefined }>({
  open,
  onOpenChange,
  item,
  url,
  mutationKey,
  queryKey,
  itemName = "item",
  method = "delete",
}: DeleteDialogProps<T>) => {
  const { mutate, isSuccess, isPending } = useDeleteData(
    url,
    item?.id,
    mutationKey,
    queryKey,
    method
  );

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
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {method == "put"
            ? `Are you sure you want to cancel this ${itemName}`
            : `Are you sure you want to delete this ${itemName}`}
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {method == "put" ? "Cancel" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
