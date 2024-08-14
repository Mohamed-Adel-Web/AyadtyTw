"use client";
import { patientsUrl, assistantsUrl, doctorUrl } from "@/backend/backend";
import DoctorProfileReservation from "@/components/myProfile/DoctorProfile/DoctorProfileReservation ";
import PatientProfileReservation from "@/components/myProfile/PatientProfile/PatientProfileReservation";

import ProfileSetting from "@/components/myProfile/ProfileSetting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetData from "@/customHooks/crudHooks/useGetData";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function App() {
  const router = useRouter();
  const { user, role, isSuccess } = useUser();
  const [endpointUrl, setEndpointUrl] = useState<string | null>(null);

  useEffect(() => {
    if (role?.permissions?.profileType?.type) {
      switch (role.permissions.profileType.type) {
        case "doctor":
          setEndpointUrl(doctorUrl);
          break;
        case "assistant":
          setEndpointUrl(assistantsUrl);
          break;
        case "patient":
          setEndpointUrl(patientsUrl);
          break;
        default:
          setEndpointUrl(patientsUrl);
      }
    }
  }, [role]);

  const { data, isLoading, error } = useGetData(
    `${endpointUrl}/${user?.id}`,
    "profile",
    [user?.id],
    !!user?.id && !!endpointUrl
  );
  const profileData = data?.data.data;
  const reservationData = data?.data.reservations;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Tabs defaultValue="AccountSettings" className="w-full mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="AccountSettings">My account</TabsTrigger>
        <TabsTrigger value="reservation">Reservation</TabsTrigger>
      </TabsList>
      <TabsContent value="AccountSettings">
        {profileData && (
          <ProfileSetting profileData={profileData} role={role} />
        )}
      </TabsContent>
      <TabsContent value="reservation">
        {role?.permissions?.profileType?.type === "patient" && (
          <PatientProfileReservation reservations={profileData?.reservations} />
        )}
        {role?.permissions?.profileType?.type === "doctor" && (
          <DoctorProfileReservation reservations={reservationData} />
        )}
 
      </TabsContent>
    </Tabs>
  );
}
