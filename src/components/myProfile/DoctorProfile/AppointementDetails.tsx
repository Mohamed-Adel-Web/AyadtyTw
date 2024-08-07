import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { appointmentDetails } from "@/types/appointmentTypes/appointments";
import { formatDateTime } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

export default function AppointmentDetails({
  appointmentDetails,
  onClose,
}: {
  appointmentDetails: appointmentDetails;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!appointmentDetails} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            Review the appointment information below.
          </DialogDescription>
        </DialogHeader>
        {appointmentDetails && (
          <div className="grid gap-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <Label className="font-semibold">Date :</Label>
              <span className="text-gray-700">
                {formatDateTime(appointmentDetails.time_start)}
              </span>
            </div>
            {/* Add more appointment details as needed */}
          </div>
        )}
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
