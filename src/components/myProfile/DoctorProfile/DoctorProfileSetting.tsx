import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Doctor, IDoctorSetting } from "@/types/doctorsTypes/doctors";
import useAddData from "@/customHooks/crudHooks/useAddData";
import { doctorSettingUrl } from "@/backend/backend";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { useMemo } from "react";
export default function DoctorProfileSetting({ doctor }: { doctor: Doctor }) {
  const { data } = useGetData(
    `${doctorSettingUrl}/doctor/${doctor.id}`,
    "AllDoctorSettings",
    [doctor.id],
    !!doctor.id
  );
  const doctorSetting = data?.data.data;
  const { register, handleSubmit, reset } = useForm<IDoctorSetting>();
  const { mutate } = useAddData(
    doctorSettingUrl,
    "addDoctorSetting",
    "AllDoctorSettings"
  );
  const onSubmit = (data: IDoctorSetting) => {
    mutate({ ...data, doctor_id: doctor.id });
  };
  useMemo(() => {
    if (doctorSetting) {
      reset(doctorSetting);
    }
  }, [doctorSetting, reset]);
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and API key.
        </p>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>API Key</CardTitle>
          <CardDescription>
            Your API key is used to authenticate your requests to our platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="text"
                className="font-mono"
                {...register("api_key_myfatoorah")}
              />
            </div>
            <Button>Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
