import { Doctor } from "@/types/doctorsTypes/doctors";
import { BadgeDollarSign, MailIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DoctorReservationCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="lg:col-span-3 md:col-span-6 col-span-12 shadow-lg border  rounded-lg m-2 p-4">
      <div className="col-span-12 md:col-span-1">
        <Image
          src={`${"/"}`}
          width={100}
          height={100}
          alt="Doctor's avatar"
          className="rounded-full mx-auto"
        />
      </div>
      <div className="col-span-12 md:col-span-5">
        <h3 className="text-xl font-semibold text-gray-800">
          {doctor.first_name + " " + doctor.last_name}
        </h3>
        <p className="text-gray-600">Cardiologist</p>
        <div className="mt-2 text-center md:text-start">
          <div className="flex items-center md:justify-start justify-center text-gray-500">
            <PhoneIcon className="w-4 h-4 mr-2" />
            <span>{doctor.phone}</span>
          </div>
          <div className="flex items-center md:justify-start justify-center text-gray-500 mt-1">
            <MailIcon className="w-4 h-4 mr-2" />
            <span>{doctor.email}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center md:justify-start space-x-2">
          <Link
            href={`/doctor/${doctor.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            View Details
          </Link>
          <Link
            href={`/Dashboard/reservations/doctor/${doctor.id}`}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
