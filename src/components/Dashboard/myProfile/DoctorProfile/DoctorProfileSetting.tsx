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
import useEditData from "@/customHooks/crudHooks/useEditData";
import { useTranslations } from "next-intl"; // Import useTranslations

export default function DoctorProfileSetting({ doctor }: { doctor: Doctor }) {
  const t = useTranslations("Dashboard.profile.DoctorProfileSetting"); // Initialize useTranslations hook
  const { data } = useGetData(
    `${doctorSettingUrl}/doctor/${doctor.id}`,
    "AllDoctorSettings",
    [doctor.id],
    !!doctor.id
  );
  const doctorSetting = data?.data.data;
  const { register, handleSubmit, reset } = useForm<IDoctorSetting>();
  const { mutate: addMutate, isPending: addLoading } = useAddData(
    doctorSettingUrl,
    "addDoctorSetting",
    "AllDoctorSettings"
  );
  const {
    mutate: mutateEdit,
    isSuccess,
    isPending: updateLoading,
  } = useEditData<IDoctorSetting>(
    doctorSettingUrl,
    doctorSetting?.id,
    "editDoctorSetting",
    "AllDoctorSettings",
    "put"
  );

  const onSubmit = (submitData: IDoctorSetting) => {
    if (doctorSetting?.api_key_myfatoorah) {
      mutateEdit(submitData);
    } else {
      addMutate({ ...submitData, doctor_id: doctor.id });
    }
  };

  useMemo(() => {
    if (doctorSetting) {
      reset(doctorSetting);
    }
  }, [doctorSetting, reset]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 shadow-2xl bg-white my-5 rounded-lg">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{t("profileSettings")}</h1>{" "}
        {/* Translated */}
        <p className="text-muted-foreground">
          {t("profileSettingsDescription")}
        </p>{" "}
        {/* Translated */}
      </div>
      <Card className="mt-8 border-4 border-[#5A5FE0] border-solid">
        <CardHeader>
          <CardTitle>{t("apiKeyTitle")}</CardTitle> {/* Translated */}
          <CardDescription>{t("apiKeyDescription")}</CardDescription>{" "}
          {/* Translated */}
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="apiKey">{t("apiKeyLabel")}</Label>{" "}
              {/* Translated */}
              <Input
                id="apiKey"
                type="text"
                className="font-mono"
                {...register("api_key_myfatoorah")}
              />
            </div>
            <Button type="submit" disabled={addLoading || updateLoading}>
              {doctorSetting?.api_key_myfatoorah
                ? t("updateApiKey") // Translated
                : t("addApiKey")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
