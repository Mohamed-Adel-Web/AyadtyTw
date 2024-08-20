import { ReactNode } from "react";
import { Dialog, DialogContent } from "../ui/dialog";

export default function DialogLayout({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent  className="sm:max-w-[780px] max-h-[90vh] overflow-auto">
        {children}
      </DialogContent>
    </Dialog>
  );
}
