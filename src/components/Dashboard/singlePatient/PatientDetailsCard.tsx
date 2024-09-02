import { patientsUrl } from "@/backend/backend";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { patient } from "@/types/patientTypes/patient";

export default function PatientDetailsCard({
  patientId,
}: {
  patientId: string;
}) {
  const { data } = useGetData(
    `${patientsUrl}/${patientId}`,
    "patientProfile",
    [patientId],
    !!patientId
  );
  const patientData: patient = data?.data?.data;
  return (
    <>
      <h2 className="uppercase text-[#5A5FE0]  bg-[#ECEDFF] inline-block  text-6xl  p-4 rounded-lg ring-2 ring-[#5A5FE0]">
        {patientData?.first_name.slice(0, 1) +
          patientData?.last_name.slice(0, 1)}
      </h2>
      <h3 className="capitalize my-3 ">
        {patientData?.first_name + " " + patientData?.last_name}
      </h3>
      <span className="inline-block text-[#FECF68] bg-[#FFF6E5] px-2 py-1 rounded-md">
        patient
      </span>
      <div className="  space-y-3 text-left">
        <h3 className=" border-b-2	 border-[#5A5FE0] font-bold">Details :</h3>
        <div>
          <span className="font-bold">Email </span>: {patientData?.email}
        </div>
        <div>
          {" "}
          <span className="font-bold">Phone </span> :{patientData?.phone}
        </div>
      </div>
    </>
  );
}
