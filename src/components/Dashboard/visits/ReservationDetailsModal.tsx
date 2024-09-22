"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTime } from "@/lib/utils";
import { reservationDetails } from "@/types/reservationTypes/reservation";
import ConfirmForm from "./ConfirmForm";
import DialogLayout from "../generalDialog/DialogLayout";
import { useTranslations } from "next-intl"; // Import useTranslations

export default function ReservationDetailsModal({
  reservation,
  onClose,
  reservation_id,
}: {
  reservation: reservationDetails;
  onClose: () => void;
  reservation_id: number | null;
}) {
  const t = useTranslations("Dashboard.visits"); // Initialize useTranslations hook
  const [showForm, setShowForm] = useState(false);

  const handleConfirmClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <DialogLayout open={!!reservation} onOpenChange={onClose}>
      <DialogHeader className="border-b pb-4">
        <DialogTitle className="text-xl font-semibold text-gray-800">
          {t("reservationDetails")} {/* Translated */}
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          {t("detailsDescription")} {/* Translated */}
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-4">
        <div className="flex items-center">
          <span className="font-bold text-gray-700">{t("doctorName")}: </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">
            {reservation.doctor.first_name + " " + reservation.doctor.last_name}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">{t("patientName")}: </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">
            {reservation.patient.first_name +
              " " +
              reservation.patient.last_name}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">{t("email")}: </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">
            {reservation.patient.email}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">{t("phone")}: </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">
            {reservation.patient.phone}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">{t("examination")}: </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">
            {reservation.examination_type.name}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">
            {t("examinationAmount")}:{" "}
          </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">
            {reservation.examination_type.amount}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">
            {t("examinationColor")}:{" "}
          </span>{" "}
          {/* Translated */}
          <span
            className="ml-2 inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: reservation.examination_type.color }}
          ></span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">
            {t("reservationStatus")}:{" "}
          </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">{reservation.status}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">
            {t("appointmentStart")}:{" "}
          </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">
            {formatDateTime(reservation.appointment.time_start)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">
            {t("appointmentEnd")}:{" "}
          </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">
            {formatDateTime(reservation.appointment.time_end)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-700">{t("reservedOn")}: </span>{" "}
          {/* Translated */}
          <span className="ml-2 text-gray-900">
            {formatDateTime(reservation.created_at)}
          </span>
        </div>
      </div>
      {showForm ? (
        <ConfirmForm
          onCancel={handleCancel}
          reservation={reservation}
          reservation_id={reservation_id}
          handleFormClose={onClose}
        />
      ) : (
        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            {t("close")} {/* Translated */}
          </Button>
          {reservation.status === "reserved" && (
            <Button
              onClick={handleConfirmClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {t("confirmReservation")} {/* Translated */}
            </Button>
          )}
        </DialogFooter>
      )}
    </DialogLayout>
  );
}
