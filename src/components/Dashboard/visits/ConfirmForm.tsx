import { useEffect,} from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import useAddData from "@/customHooks/crudHooks/useAddData";
import {
  confirmData,
  reservationDetails,
} from "@/types/reservationTypes/reservation";
import { reservationUrl } from "@/backend/backend";

export default function ConfirmForm({
  onCancel,
  reservation,
  reservation_id,
  handleFormClose,
}: {
  onCancel: () => void;
  reservation: reservationDetails;
  reservation_id: number | null;
  handleFormClose: () => void;
}) {
  const { register, handleSubmit } = useForm<confirmData>();
  const { mutate, isSuccess } = useAddData(
    `${reservationUrl}/confirm/${reservation_id}`,
    "confirmReservation",
    "allReservations"
  );
  useEffect(() => {
    if (isSuccess) {
      handleFormClose();
    }
  }, [isSuccess, handleFormClose]);
  const onSubmit = (data: confirmData) => {
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <div className="flex flex-col">
        <Label htmlFor="extraAmount" className="font-bold text-gray-700">
          Extra Amount
        </Label>
        <Input
          type="number"
          id="extraAmount"
          {...register("extra_amount")}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="discount" className="font-bold text-gray-700">
          discount
        </Label>
        <Input
          type="number"
          id="discount"
          {...register("discount")}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>{" "}
      <div className="flex flex-col">
        <Label htmlFor="comment" className="font-bold text-gray-700">
          Comment
        </Label>
        <Textarea
          id="comment"
          {...register("comment")}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <DialogFooter className="mt-6 flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </Button>
      </DialogFooter>
    </form>
  );
}
