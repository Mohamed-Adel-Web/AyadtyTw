"use client";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import ReservationsCalendar from "@/components/Dashboard/visits/ReservationsConfirmCalendar";
import SelectDoctorReservation from "@/components/Dashboard/visits/SelectDoctorReservations";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function App() {
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const router = useRouter();
  const handleReservations = (doctorId: string) => {
    setDoctorId(doctorId);
  };
  const { role, isSuccess } = useUser();
  if (isSuccess && !hasPermission(role, "visits", "read")) {
    router.push("/unauthorized");
  }

  return (
    <>
      <div className="flex justify-between align-items-center flex-wrap">
        <Heading title="Reservations Confirm    " />

        {hasPermission(role, "visits", "create") && (
          <>
            <SelectDoctorReservation handleReservations={handleReservations} />
          </>
        )}
      </div>
      <ReservationsCalendar doctorId={doctorId} />
    </>
  );
}
