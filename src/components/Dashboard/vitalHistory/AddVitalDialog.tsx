import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import useAddData from "@/customHooks/crudHooks/useAddData";
import { AsyncSelectComponent } from "@/components/Common/AsyncSelect";
import DialogLayout from "@/components/generalDialog/DialogLayout";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";
import { patientsUrl, doctorUrl, vitalHistoryUrl } from "@/backend/backend";
import { fields } from "./fields";

export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, formState, handleSubmit, control, reset } =
    useForm<IVitalHistory>({
      defaultValues: {
        patient_show: false,
      },
    });
  const { mutate, isSuccess, isPending } = useAddData<IVitalHistory>(
    vitalHistoryUrl,
    "addVitalHistory",
    "allVitalHistory"
  );
  const { errors } = formState;

  const onSubmit = (data: IVitalHistory) => {
    mutate(data);
  };

  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
      reset();
    }
  }, [isSuccess, onOpenChange, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full">
        <DialogHeader>
          <DialogTitle>Add New Vital History</DialogTitle>
          <DialogDescription>
            Enter the details of the new Vital History. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {fields
          .filter((field) => field.showInAdd)
          .map((field) => (
            <div className="space-y-2 my-3" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                className="col-span-3"
                {...register(
                  field.name,
                  field.validate ? { required: field.required } : {}
                )}
              />
              {errors[field.name] && (
                <div className="text-red-500 w-full">
                  {errors[field.name]?.message}
                </div>
              )}
            </div>
          ))}
        <div className="space-y-2 my-3">
          <Label htmlFor={"Report"} className="text-right">
            Report
          </Label>
          <Textarea
            id={"report"}
            className="col-span-3"
            {...register("report")}
          />
          {errors.report && (
            <div className="text-red-500 w-full">{errors.report?.message}</div>
          )}
        </div>
        <div className="space-y-2 my-3">
          <AsyncSelectComponent
            control={control}
            name="patient_id"
            label="Patient Name"
            url={patientsUrl}
            placeholder="Select patient..."
            isRequired={true}
          />
        </div>{" "}
        <div className="flex items-center  space-x-1">
          <div className="inline-flex items-center">
            <label
              className="relative flex items-center p-2 rounded-full cursor-pointer"
              htmlFor={`show_patient`}
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id={`show_patient`}
                {...register(`patient_show`)}
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
          <label
            htmlFor={`show_patient`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
          >
            show in patient profile
          </label>
        </div>
        <div className="space-y-2 my-3">
          <AsyncSelectComponent
            control={control}
            name="doctor_id"
            label="Doctor Name"
            url={doctorUrl}
            placeholder="Select doctor..."
            isRequired={true}
          />
        </div>
        {/* Checkbox for showing in patient profile */}

        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
