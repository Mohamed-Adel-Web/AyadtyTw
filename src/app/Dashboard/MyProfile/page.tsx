import ProfileSetting from "@/components/myProfile/ProfileSetting";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function profilePage() {
  return (
    <Tabs defaultValue="account" className="w-full mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        {" "}
        <TabsTrigger value="AccountSettings">My account</TabsTrigger>
        <TabsTrigger value="reservation">reservation</TabsTrigger>
        <TabsTrigger value="Invoices">Invoices</TabsTrigger>
      </TabsList>
      <TabsContent value="AccountSettings">
        <ProfileSetting />
      </TabsContent>
      <TabsContent value="Invoices"></TabsContent>
    </Tabs>
  );
}
