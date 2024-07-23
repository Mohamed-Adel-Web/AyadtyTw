import { doctorUrl } from "@/backend/backend";
import { Label } from "@/components/ui/label";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { Doctor } from "@/types/doctorsTypes/doctors";

export default function SelectDoctorAppointment({
  handleAppointment,
}: {
  handleAppointment: (doctor_id: string) => void;
}) {
  const { data } = useGetData(doctorUrl, "allDoctor");
  const doctorsData = data?.data.data;

  return (
    <div className="space-y-4 my-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="doctor" className="text-start font-medium text-gray-700">
          Select Doctor to View Appointments
        </Label>
        <select
          id="doctor"
          onChange={(event) => {
            handleAppointment(event.target.value);
          }}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a doctor</option>
          <option value="">Show ALL Doctors</option>
          {doctorsData?.map((doctor: Doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.full_name}
            </option>
          ))}
        </select>
      </div>
      <div className="text-sm text-gray-500">
        Please select a doctor from the dropdown above to view their appointments.
      </div>
    </div>
  );
}
