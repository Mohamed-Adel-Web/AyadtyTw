"use client";

import React, { useState, useMemo } from "react";
import { doctorUrl } from "@/backend/backend";
import useGetData from "@/customHooks/crudHooks/useGetData";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { EventInput } from "@fullcalendar/core/index.js";
import ReservationFilter from "@/components/Dashboard/reservations/reservationFilters/ReservationFilter";
import { AddDialog } from "@/components/Dashboard/reservations/AddReservationDialog";
import { appointment } from "@/types/appointmentTypes/appointments";

export default function DoctorAppointment({
  params,
}: {
  params: { id: string };
}) {
  const doctorId = params.id;
  const { data, isSuccess } = useGetData(
    `${doctorUrl}/${doctorId}`,
    "doctorAppointmentDetails",
    [doctorId],
    !!doctorId
  );
  const [events, setEvents] = useState<EventInput[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<number>(0);
  const appointmentsData = data?.data.data.appointments;
  const doctorData = data?.data.data;
  useMemo(() => {
    if (isSuccess) {
      const now = new Date();
      const filteredAppointments = appointmentsData?.filter(
        (appointment: appointment) => {
          const appointmentEnd = new Date(appointment.time_end);
          if (appointmentEnd < now) return false;
          if (filter === "available") return appointment.status == "available";
          if (filter === "notAvailable")
            return appointment.status == "not-available";
          return true;
        }
      );
      const appointments = filteredAppointments?.map((appointment: any) => ({
        id: appointment.id,
        title: appointment.status,
        start: appointment.time_start,
        end: appointment.time_end,
        backgroundColor: appointment.status == "available" ? "green" : "red",
        borderColor: appointment.status == "available" ? "green" : "red",
        textColor: "white",
        status: appointment.status,
        className:
          appointment.status == "available"
            ? "available-appointment cursor-pointer"
            : "unavailable-appointment cursor-not-allowed",
      }));
      setEvents(appointments);
    }
  }, [isSuccess, filter, setEvents, appointmentsData]);

  const handleEventClick = (info: any) => {
    setAppointmentId(info.event.id);
    info.event.extendedProps.status == "available"
      ? setOpen(true)
      : setOpen(false);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{`${doctorData?.first_name} ${doctorData?.last_name}'s Appointments`}</h1>
      <ReservationFilter
        handleFilterChange={handleFilterChange}
        filter={filter}
      />
      {appointmentsData && (
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
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
      )}

      <AddDialog
        open={open}
        onOpenChange={setOpen}
        doctorId={doctorId}
        appointmentId={appointmentId}
      />
    </div>
  );
}
