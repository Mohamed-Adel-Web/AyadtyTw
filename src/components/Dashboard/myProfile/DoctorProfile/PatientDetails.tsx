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
import { Label } from "@/components/ui/label";
import { patientDetails } from "@/types/patientTypes/patient";

export default function PatientDetails({
  patientDetails,
  onClose,
}: {
  patientDetails: patientDetails;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!patientDetails} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogDescription>
            Review the patient&apos;s information below.
          </DialogDescription>
        </DialogHeader>
        {patientDetails && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">Name</Label>
                <p className="text-gray-700">{`${patientDetails.first_name} ${patientDetails.last_name}`}</p>
              </div>
              <div>
                <Label className="font-semibold">Email</Label>
                <p className="text-gray-700">{patientDetails.email}</p>
              </div>
              <div>
                <Label className="font-semibold">Phone</Label>
                <p className="text-gray-700">{patientDetails.phone}</p>
              </div>
              {/* Add more patient details as needed */}
            </div>
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
