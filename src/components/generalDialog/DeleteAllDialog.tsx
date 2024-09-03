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
            ? `Are you sure you want to cancel all ${itemName}`
            : `Are you sure you want to delete all  ${itemName}`}
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

export default DeleteAllDialog;
