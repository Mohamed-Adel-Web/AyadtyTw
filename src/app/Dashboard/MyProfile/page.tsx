"use client";
import { patientsUrl } from "@/backend/backend";
import ProfileSetting from "@/components/myProfile/ProfileSetting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetData from "@/customHooks/crudHooks/useGetData";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();

  const { user, role, isSuccess } = useUser();
  if (isSuccess && !hasPermission(role, "profile", "read")) {
    router.push("/unauthorized");
  }
  const { data, isLoading, error } = useGetData(
    user?.id ? `${patientsUrl}/${user.id}` : null,
    "patient",
    [user?.id]
  );
  const patientData = data?.data.data;

  return (
    <Tabs defaultValue="AccountSettings" className="w-full mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="AccountSettings">My account</TabsTrigger>
        <TabsTrigger value="reservation">Reservation</TabsTrigger>
        <TabsTrigger value="Invoices">Invoices</TabsTrigger>
      </TabsList>
      <TabsContent value="AccountSettings">
        <ProfileSetting patient={patientData} />
      </TabsContent>
      <TabsContent value="Invoices"></TabsContent>
    </Tabs>
  );
}
