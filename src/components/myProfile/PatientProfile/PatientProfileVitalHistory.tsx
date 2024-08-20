import { profileVitalHistoryUrl } from "@/backend/backend";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";
import VitalHistoryRow from "./VitalHistoryRow";
import ReportSheetComponent from "@/components/Dashboard/vitalHistory/ReportDialog";
import { useState } from "react";
import { patient } from "@/types/patientTypes/patient";

export default function PatientProfileVitalHistory({
  patient,
}: {
  patient: patient;
}) {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<IVitalHistory | null>(null);
  const tableHeadData: string[] = [
    " Date",
    "Pressure",
    "weight",
    "Blood Sugar",
    "Action",
  ];
  const { data, isLoading, isError } = useGetData(
    `${profileVitalHistoryUrl}/${patient?.id}`,
    "patientVitalHistory",
    [patient?.id],
    !!patient?.id
  );

  if (isLoading) return <div className="text-gray-500">Loading...</div>;
  if (isError) return <div className="text-red-500">Error loading data</div>;
  const vitalHistories = data?.data?.data.vital_histories || [];
  const handleShowReport = (history: IVitalHistory) => {
    setSelectedData({...history,patient: patient});
    setOpenSheet(true)
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Patient Vital History</h2>
      {vitalHistories.length === 0 ? (
        <p className="text-gray-700">No vital history records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeadData.map((data) => (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {data}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vitalHistories.map((history: IVitalHistory) => (
                <VitalHistoryRow
                  history={history}
                  key={history.id}
                  handleShowReport={handleShowReport}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ReportSheetComponent
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        vitalHistory={selectedData}
      />
    </div>
  );
}
