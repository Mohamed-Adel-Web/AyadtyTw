"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Specialization } from "@/types/specializationsTypes/specialization";
import { useTranslations } from "next-intl";

interface SpecializationFilterProps {
  specializations: Specialization[];
  selectedSpecialty: Specialization | null;
  onSpecialtySelect: (specialization: Specialization | null) => void; // Adjusted to accept null
}

export default function SpecializationFilter({
  specializations,
  selectedSpecialty,
  onSpecialtySelect,
}: SpecializationFilterProps) {
  const [openSheet, setOpenSheet] = useState(false);
  const t = useTranslations("Dashboard.Reservation.SpecializationFilter");
  const handleGetDoctorBySpecial = (specialization: Specialization | null) => {
    onSpecialtySelect(specialization);
    setOpenSheet(false);
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          {selectedSpecialty?.name
            ? selectedSpecialty.name
            : t("chooseSpecialty")}
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>{t("chooseSpecialty")}</SheetTitle>
          <SheetDescription>
          {t("selectSpecialty")}
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-12 gap-4 py-4">
          <Button
            variant={!selectedSpecialty ? "default" : "outline"}
            onClick={() => handleGetDoctorBySpecial(null)}
            className="col-span-3 text-md font-bold"
          >
            {t("allSpecializations")}
          </Button>
          {specializations?.map((specialty: Specialization) => (
            <Button
              key={specialty.id}
              variant={
                specialty.name === selectedSpecialty?.name
                  ? "default"
                  : "outline"
              }
              onClick={() => handleGetDoctorBySpecial(specialty)}
              className="col-span-3 text-md font-bold bg-[]"
            >
              {specialty.name}
            </Button>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">{t("close")}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
