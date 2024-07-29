"use client";
import { useMemo, useState, useEffect } from "react";
import useGetData from "@/customHooks/crudHooks/useGetData";
import {
  doctorBySpecializationUrl,
  specializationUrl,
  doctorByNameUrl,
} from "@/backend/backend"; // Ensure you have this URL configured
import { Specialization } from "@/types/specializationsTypes/specialization";
import React from "react";
import DoctorReservationCard from "@/components/Dashboard/reservations/DoctoreReservationCard";
import { Doctor } from "@/types/doctorsTypes/doctors";
import ReservationSearch from "@/components/Dashboard/reservations/reservationFilters/ReservationSearch";
import SpecializationFilter from "@/components/Dashboard/reservations/reservationFilters/SpecializationFilter";

export default function SheetSide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialization>();
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const { data: specializationsData } = useGetData(
    specializationUrl,
    "allSpecialization"
  );
  const specializationList = specializationsData?.data.data;
  const url = searchTerm
    ? `${doctorByNameUrl}?name=${searchTerm}`
    : selectedSpecialty
    ? `${doctorBySpecializationUrl}/${selectedSpecialty.id}`
    : "";
  const { data: doctorsResData, isSuccess } = useGetData(
    url,
    "doctorBySearchOrSpecialization",
    [searchTerm, selectedSpecialty?.id]
  );
  const doctorsData = doctorsResData?.data.data;
  useMemo(() => {
    if (isSuccess) {
      setOpenSheet(false);
    }
  }, [isSuccess]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSelectedSpecialty(undefined);
  };
  const handleSpecialtySelect = (specialization: Specialization) => {
    setSearchTerm("");
    setSelectedSpecialty(specialization);
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="md:col-span-6 col-span-12">
          <ReservationSearch onSearch={handleSearch} />
        </div>
        <div className="md:col-span-6 col-span-12">
          <SpecializationFilter
            specializations={specializationList}
            selectedSpecialty={selectedSpecialty}
            onSpecialtySelect={handleSpecialtySelect}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 text-center md:text-start">
        {doctorsData?.map((doctor: Doctor) => (
          <DoctorReservationCard doctor={doctor} key={doctor.id} />
        ))}
      </div>
    </>
  );
}
