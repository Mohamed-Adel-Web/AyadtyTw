"use client";
import { patientsUrl } from "@/backend/backend";
import PatientDetailsCard from "@/components/Dashboard/singlePatient/PatientDetailsCard";
import PatientReservation from "@/components/Dashboard/singlePatient/PatientReservation";
import PatientVitalHistory from "@/components/Dashboard/singlePatient/PatientVitalHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { patient } from "@/types/patientTypes/patient";

export default function App({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="grid grid-cols-12 gap-3">
        <div className="lg:col-span-3 col-span-12 shadow-2xl text-center p-7 rounded-lg bg-white">
          <PatientDetailsCard patientId={params.id} />
        </div>
        <div className="lg:col-span-8">
          <Tabs
            defaultValue="Reservations"
            className="w-full mx-auto bg-white   rounded-lg"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="Reservations">Reservations</TabsTrigger>
              <TabsTrigger value="VitalHistory">Vital History</TabsTrigger>
              <TabsTrigger value="Invoice">Invoice</TabsTrigger>
            </TabsList>
            <TabsContent value="Reservations">
              <PatientReservation patientId={params.id} />
            </TabsContent>
            <TabsContent value="VitalHistory">
              <PatientVitalHistory patientId={params.id} />
            </TabsContent>
            <TabsContent value="Invoice"></TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
