"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import { useState, useEffect } from "react";
import ReservationDetailsModal from "./ReservationDetailsModal";
import {
  reservationDetails,
} from "@/types/reservationTypes/reservation";
import listPlugin from "@fullcalendar/list";

import { EventInput } from "@fullcalendar/core/index.js";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { reservationUrl } from "@/backend/backend";

export default function ReservationsCalendar({
  doctorId,
}: {
  doctorId: string | null;
}) {
  const [events, setEvents] = useState<EventInput[]>();
  const { data, isSuccess } = useGetData(
    doctorId ? `${reservationUrl}/doctor/${doctorId}` : reservationUrl,
    "allReservations",
    [doctorId]
  );
  const reserVationData = data?.data.data;
  const [selectedReservation, setSelectedReservation] =
    useState<reservationDetails | null>(null);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);

  const handleEventClick = ({ event }: { event: any }) => {
    setSelectedReservation(event.extendedProps);
    setSelectedReservationId(event.id);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
    setSelectedReservationId(null);
  };

  useEffect(() => {
    if (isSuccess && reserVationData) {
      const transformedEvents = reserVationData.map(
        (reservation: reservationDetails) => {
          const now = new Date();
          const appointmentEnd = new Date(reservation.appointment.time_end);
          if (appointmentEnd < now) return {};
          if (reservation.appointment.time_end)
            if (reservation.status !== "canceled") {
              let backgroundColor;
              switch (reservation.status) {
                case "confirmed":
                  backgroundColor = "green";
                  break;
                case "reserved":
                  backgroundColor = "yellow";
                  break;
                default:
                  backgroundColor = "gray";
                  break;
              }
              return {
                id: reservation.id,
                cursor: "pointer  ",
                title: `${reservation.status}`,
                start: reservation.appointment.time_start,
                end: reservation.appointment.time_end,
                backgroundColor,
                patient: reservation.patient,
                examination_type: reservation.examination_type,
                appointment: reservation.appointment,
                doctor: reservation.doctor,
                status: reservation.status,
                created_at: reservation.created_at,
              };
            } else {
              return {};
            }
        }
      );
      setEvents(transformedEvents);
    }
  }, [isSuccess, reserVationData]);

  return (
    <div className="bg-white p-4 shadow-xl rounded-lg">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          momentPlugin,
          listPlugin,
        ]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }}
      />
      {selectedReservation && (
        <ReservationDetailsModal
          reservation={selectedReservation}
          onClose={handleCloseModal}
          reservation_id={selectedReservationId}
        />
      )}
    </div>
  );
}
