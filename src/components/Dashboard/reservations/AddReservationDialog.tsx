import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useAddData from "@/customHooks/crudHooks/useAddData";
import {
  examinationTypeUrl,
  patientsUrl,
  reservationUrl,
} from "@/backend/backend";
import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { reservation } from "@/types/reservationTypes/reservation";
import { patient } from "@/types/patientTypes/patient";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { examinationDetails } from "@/types/examinationTypes/examinationTypes";
import Select from "react-select";

export function AddDialog({
  open,
  onOpenChange,
  appointmentId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: number;
}) {
  const { register, formState, handleSubmit, reset, setValue } =
    useForm<reservation>();
  const [examinationPrice, setExaminationPrice] = useState<number>();
  const { mutate, isSuccess, isPending } = useAddData<reservation>(
    reservationUrl,
    "addReservation",
    "doctorAppointmentDetails"
  );
  const { data: patientResponse } = useGetData(patientsUrl, "allPatient");
  const { data: examinationResponse } = useGetData(
    examinationTypeUrl,
    "allExaminationType"
  );
  const patientsData = patientResponse?.data.data;
  const examinationTypeData = examinationResponse?.data.data;
  const { errors } = formState;

  const onSubmit = (data: reservation) => {
    mutate({ ...data, appointment_id: appointmentId });
  };

  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
      reset();
    }
  }, [isSuccess, onOpenChange, reset]);

  useEffect(() => {
    if (!open) {
      setExaminationPrice(undefined);
    }
  }, [open]);

  const handlePatientChange = (selectedOption: any) => {
    setValue("patient_id", selectedOption ? selectedOption.value : "");
  };

  const handleExaminationChange = (selectedOption: any) => {
    setValue("examination_id", selectedOption ? selectedOption.value : "");
    setExaminationPrice(selectedOption.amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Enter the details of the new reservation. Click Book when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 my-3">
            <Label htmlFor="patient" className="text-right">
              Patient Name
            </Label>
            <Select
              id="patient"
              options={patientsData?.map((patient: patient) => ({
                value: patient.id,
                label: `${patient.first_name} ${patient.last_name}`,
              }))}
              onChange={handlePatientChange}
              className="block w-full mt-3"
            />
            {errors.patient_id && (
              <div className="text-red-500 w-full">
                {errors.patient_id?.message}
              </div>
            )}
          </div>
          <div className="space-y-2 my-3">
            <Label htmlFor="examination" className="text-right">
              Examination Type
            </Label>
            <Select
              id="examination"
              options={examinationTypeData?.map(
                (examination: examinationDetails) => ({
                  value: examination.id,
                  label: examination.name,
                  color: examination.color,
                  amount: examination.amount,
                })
              )}
              onChange={handleExaminationChange}
              className="block w-full mt-3 bg-slate-300"
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  color: state.data.color,
                }),
              }}
            />
            {errors.examination_id && (
              <div className="text-red-500 w-full">
                {errors.examination_id?.message}
              </div>
            )}
          </div>
          {examinationPrice && (
            <div className="mt-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-gray-700">Examination Price:</div>
                <div className="text-2xl font-bold text-blue-600">
                  {examinationPrice} EGP
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isPending}>
              Book
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
