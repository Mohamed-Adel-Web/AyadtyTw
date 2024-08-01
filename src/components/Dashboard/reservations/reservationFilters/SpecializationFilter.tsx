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

  const handleGetDoctorBySpecial = (specialization: Specialization | null) => {
    onSpecialtySelect(specialization);
    setOpenSheet(false);
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          {selectedSpecialty?.name ? selectedSpecialty.name : "Choose Specialty"}
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Choose Specialty</SheetTitle>
          <SheetDescription>
            Select a specialty to filter doctors.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-12 gap-4 py-4">
          <Button
            variant={!selectedSpecialty ? "default" : "outline"}
            onClick={() => handleGetDoctorBySpecial(null)}
            className="col-span-3 text-md font-bold"
          >
            All Specializations
          </Button>
          {specializations?.map((specialty: Specialization) => (
            <Button
              key={specialty.id}
              variant={specialty.name === selectedSpecialty?.name ? "default" : "outline"}
              onClick={() => handleGetDoctorBySpecial(specialty)}
              className="col-span-3 text-md font-bold"
            >
              {specialty.name}
            </Button>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
