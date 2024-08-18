"use client";

import {
  reservation,
  reservationDetails,
} from "@/types/reservationTypes/reservation";
import ReservationCard from "./ReservationCard";
import DeleteDialog from "../../generalDialog/DeleteDialog";
import { reservationCancelUrl } from "@/backend/backend";
import React from "react";

export default function PatientProfileReservation({
  reservations,
}: {
  reservations: reservation[];
}) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<reservation | null>(
    null
  );
  const handleOpenDeleteDialog = (data: reservation) => {
    setSelectedData(data);
    setOpenDelete(true);
  };
  if (reservations.length === 0) {
    return (
      <>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Reservations</h2>{" "}
        <p className="text-gray-500">No reservations for today.</p>
      </>
    );
  }
  return (
    <div className="mx-auto w-full max-w-3xl p-4 space-y-4">
      {reservations?.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
        />
      ))}
      <DeleteDialog<reservation>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={reservationCancelUrl}
        mutationKey="cancelReservation"
        queryKey="profile"
        itemName="reservation"
        method="put"
      />
    </div>
  );
}
