"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { SearchIcon, PhoneIcon, MailIcon, BadgeDollarSign } from "lucide-react";
import useGetData from "@/customHooks/crudHooks/useGetData";
import {
  doctorBySpecializationUrl,
  specializationUrl,
} from "@/backend/backend";
import { Specialization } from "@/types/specializationsTypes/specialization";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function SheetSide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialization>();
  const { data } = useGetData(specializationUrl, "allSpecialization");
  const specializationsData = data?.data.data;
  const { data: doctorData } = useGetData(
    `${doctorBySpecializationUrl}/${selectedSpecialty?.id}`,
    "doctorBySpecialization",
    [selectedSpecialty?.id]
  );

  const handleGetDoctorBySpecial = (specialization: Specialization) => {
    setSelectedSpecialty(specialization);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const dummyAppointments = [
    { time: "10:00 AM - 11:00 AM", available: true },
    { time: "11:00 AM - 12:00 PM", available: false },
    { time: "12:00 PM - 01:00 PM", available: true },
    { time: "01:00 PM - 02:00 PM", available: true },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        <form
          className="flex items-center gap-2 md:col-span-6 col-span-12 "
          onSubmit={handleSearch}
        >
          <Input
            type="search"
            placeholder="Search by doctor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <SearchIcon className="w-5 h-5" />
            <span className="sr-only">Submit</span>
          </Button>
        </form>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:col-span-6 col-span-12">
              {selectedSpecialty?.name
                ? selectedSpecialty.name
                : "Choose Specialty"}
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
              {specializationsData?.map((specialty: Specialization) => (
                <Button
                  key={specialty.id}
                  variant={
                    specialty.name === selectedSpecialty?.name
                      ? "default"
                      : "outline"
                  }
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
      </div>
    
      <div className="grid grid-cols-12 gap-4 border rounded-lg p-4 bg-white shadow-lg text-center md:text-start">
        <div className="col-span-12 md:col-span-1">
          <Image
            src={"/avatar.jpg"}
            width={100}
            height={100}
            alt="Doctor's avatar"
            className="rounded-full mx-auto"
          />
        </div>
        <div className="col-span-12 md:col-span-5">
          <h3 className="text-xl font-semibold text-gray-800">
            Dr. Mohamed Mahmoud
          </h3>
          <p className="text-gray-600">Cardiologist</p>
          <div className="mt-2">
            <div className="flex items-center text-gray-500">
              <PhoneIcon className="w-4 h-4 mr-2" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center text-gray-500 mt-1">
              <MailIcon className="w-4 h-4 mr-2" />
              <span>mohamed.mahmoud@example.com</span>
            </div>
            <div className="flex items-center text-gray-500 mt-1">
              <BadgeDollarSign className="w-4 h-4 mr-2" />
              Fees :<span className="ml-1">100 USD</span>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 relative">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {dummyAppointments.map((appointment, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <span className="text-md font-semibold">
                          {appointment.time}
                        </span>
                        <Button
                          disabled={!appointment.available}
                          className={`mt-2 ${
                            appointment.available
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {appointment.available ? "Book Now" : "Unavailable"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="  absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2  bg-black text-white" />
          </Carousel>
        </div>
      </div>
    </>
  );
}
