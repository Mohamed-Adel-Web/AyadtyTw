"use client";
import React, { useEffect, useState } from "react";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { specializationUrl, doctorUrl } from "@/backend/backend";
import { Specialization } from "@/types/specializationsTypes/specialization";
import { Doctor } from "@/types/doctorsTypes/doctors";
import ReservationSearch from "@/components/Dashboard/reservations/reservationFilters/ReservationSearch";
import SpecializationFilter from "@/components/Dashboard/reservations/reservationFilters/SpecializationFilter";
import {  hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import DoctorReservationCard from "@/components/Dashboard/reservations/DoctorReservationCard";
import { useDebounce } from "@/customHooks/useDebounce";
import LoadingSpinner from "@/components/Dashboard/Common/LoadingSpinner";
import NoDataMessage from "@/components/Dashboard/Common/NoDataMessage";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useRouter } from "@/i18n/routing";

const App: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("Dashboard.Reservation"); // Initialize useTranslations hook
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<Specialization | null>(null);
  const { data: specializationsData, isLoading: specializationsLoading } =
    useGetData(specializationUrl, "allSpecialization");
  const { user, role, isSuccess: roleSuccess } = useUser();
  const specializationList = specializationsData?.data.data;
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: doctorsResData,
    isLoading: doctorsLoading,
    error,
  } = useGetData(
    `${doctorUrl}?name=${searchTerm}&spec=${
      selectedSpecialty?.id || ""
    }`,
    "doctorBySearchOrSpecialization",
    [debouncedSearchTerm, selectedSpecialty?.id],
    !!debouncedSearchTerm || selectedSpecialty !== null
  );
  const doctorsData = doctorsResData?.data.data;

  useEffect(() => {
    if (roleSuccess && !hasPermission(role, "reservation", "read")) {
      router.push("/unauthorized");
    }
  }, [roleSuccess, role, router]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleSpecialtySelect = (specialization: Specialization | null) => {
    setSelectedSpecialty(specialization);
  };

  return (
    <>
      <div className="p-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
          {t("doctorReservations")} {/* Translated */}
        </h1>
        <p className="text-center mb-6 text-gray-600">
          {t("searchDoctor")} {/* Translated */}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ReservationSearch onSearch={handleSearch} />
          <SpecializationFilter
            specializations={specializationList}
            selectedSpecialty={selectedSpecialty}
            onSpecialtySelect={handleSpecialtySelect}
          />
        </div>
      </div>
      <div className="grid grid-cols-12">
        {doctorsLoading && <LoadingSpinner />}
        {!doctorsLoading && doctorsData?.length === 0 && (
          <NoDataMessage message={t("noDoctorsFound")} />
        )}
        {doctorsData?.map((doctor: Doctor) => (
          <DoctorReservationCard doctor={doctor} key={doctor.id} />
        ))}
      </div>
    </>
  );
};

export default App;
