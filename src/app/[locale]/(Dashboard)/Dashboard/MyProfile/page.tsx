"use client";
import { patientsUrl, assistantsUrl, doctorUrl } from "@/backend/backend";
import LoadingSpinner from "@/components/Dashboard/Common/LoadingSpinner";
import DoctorProfileSetting from "@/components/Dashboard/myProfile/DoctorProfile/DoctorProfileSetting";
import PatientProfileReservation from "@/components/Dashboard/myProfile/PatientProfile/PatientProfileReservation";
import PatientProfileVitalHistory from "@/components/Dashboard/myProfile/PatientProfile/PatientProfileVitalHistory";
import ProfileSetting from "@/components/Dashboard/myProfile/ProfileSetting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetData from "@/customHooks/crudHooks/useGetData";
import useUser from "@/customHooks/loginHooks/useUser";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import DoctorProfileReservation from "@/components/Dashboard/myProfile/DoctorProfile/DoctorProfileReservation ";

export default function App() {
  const t = useTranslations("Dashboard.profile");
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
  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Tabs defaultValue="AccountSettings" className="w-full mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="AccountSettings">{t("account")}</TabsTrigger>
        <TabsTrigger value="reservation">{t("reservation")}</TabsTrigger>
        {role?.permissions?.profileType?.type === "doctor" && (
          <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
        )}
        {role?.permissions?.profileType?.type === "patient" && (
          <TabsTrigger value="vitalHistory">{t("vitalHistory")}</TabsTrigger>
        )}
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
          <DoctorProfileReservation doctorId={data?.data.data.id} />
        )}
      </TabsContent>
      {role?.permissions?.profileType?.type === "patient" && (
        <TabsContent value="vitalHistory">
          <PatientProfileVitalHistory patient={profileData} />
        </TabsContent>
      )}
      {role?.permissions?.profileType?.type === "doctor" && (
        <TabsContent value="settings">
          <DoctorProfileSetting doctor={profileData} />
        </TabsContent>
      )}
    </Tabs>
  );
}
