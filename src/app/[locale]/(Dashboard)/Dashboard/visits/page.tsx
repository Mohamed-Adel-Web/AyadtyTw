"use client";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import ReservationsCalendar from "@/components/Dashboard/visits/ReservationsConfirmCalendar";
import SelectDoctorReservation from "@/components/Dashboard/visits/SelectDoctorReservations";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import { useState } from "react";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useRouter } from "@/i18n/routing";

export default function App() {
  const t = useTranslations("Dashboard.visits"); // Initialize useTranslations hook
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
      <TableHeadLayout>
        <Heading title={t("title")} /> {/* Translated */}
        {hasPermission(role, "visits", "create") && (
          <>
            <SelectDoctorReservation handleReservations={handleReservations} />
          </>
        )}
      </TableHeadLayout>
      <ReservationsCalendar doctorId={doctorId} />
    </>
  );
}
