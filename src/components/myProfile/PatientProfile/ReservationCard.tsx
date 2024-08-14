"use client";
import {
  reservation,
  reservationDetails,
} from "@/types/reservationTypes/reservation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { appointmentUrl } from "@/backend/backend";
import { formatDateTime, getBadgeClass } from "@/lib/utils";
import {
  BadgeDollarSign,
  CalendarIcon,
  ClockIcon,
  Contact,
} from "lucide-react";

export default function ReservationCard({
  reservation,
  handleOpenDeleteDialog,
}: {
  reservation: reservation;
  handleOpenDeleteDialog: (data: reservation) => void;
}) {
  const { data, isLoading, isError } = useGetData(
    `${appointmentUrl}/${reservation.appointment_id}`,
    "appointment",
    [reservation.appointment_id],
    !!reservation.appointment_id
  );

  const appointmentDetails = data?.data.data;
  return (
    <Card
      key={reservation.id}
      className="shadow-lg border border-gray-300 rounded-xl p-4 sm:p-6 bg-white"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-gray-800 mr-2">
            Reservation #{reservation.id}
          </CardTitle>
          <Badge
            className={`text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full ${getBadgeClass(
              reservation.status
            )}`}
          >
            {reservation.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6 text-gray-700">
        <div className="col-span-1 sm:col-span-2 flex items-center text-sm sm:text-base">
          <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2" />
          <span className="font-semibold">Reservation Time : </span>{" "}
          {formatDateTime(reservation.created_at)}
        </div>{" "}
        <div className="col-span-1 sm:col-span-2 flex items-center text-sm sm:text-base">
          <BadgeDollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2" />
          <span className="font-semibold">Reservation Amount : </span>{" "}
          {reservation.examination_type.amount}
        </div>{" "}
        <div className="col-span-1 sm:col-span-2 flex items-center text-sm sm:text-base">
          <Contact className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2" />
          <span className="font-semibold">Doctor Name : </span>{" "}
          {reservation.examination_type.doctor.first_name +
            " " +
            reservation.examination_type.doctor.last_name}
        </div>
        {isLoading && (
          <div className="col-span-1 sm:col-span-2 text-center text-sm sm:text-base text-gray-500">
            Loading appointment details...
          </div>
        )}
        {isError && (
          <div className="col-span-1 sm:col-span-2 text-center text-sm sm:text-base text-red-500">
            Error loading appointment details
          </div>
        )}
        {appointmentDetails && (
          <>
            <div className="flex items-center text-sm sm:text-base">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 te" />
              <span className="font-semibold ">Start Time:</span>{" "}
              {formatDateTime(appointmentDetails.time_start)}
            </div>
            <div className="flex items-center text-sm sm:text-base">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2" />
              <span className="font-semibold">End Time:</span>{" "}
              {formatDateTime(appointmentDetails.time_end)}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-end mt-4 sm:mt-6">
        {reservation.status == "reserved" ? (
          <Button
            variant="destructive"
            className="text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded-lg"
            onClick={() => {
              handleOpenDeleteDialog(reservation);
            }}
          >
            Cancel Reservation
          </Button>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
}
