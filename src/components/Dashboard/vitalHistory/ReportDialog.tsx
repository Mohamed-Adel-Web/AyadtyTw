import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";

export default function ReportSheetComponent({
  openSheet,
  setOpenSheet,
  vitalHistory,
}: {
  openSheet: boolean;
  setOpenSheet: (openSheet: boolean) => void;
  vitalHistory: IVitalHistory | null;
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent side={"top"} className="w-[400px] sm:w-full">
        <SheetHeader>
          <SheetTitle>Vital History Report</SheetTitle>
          <SheetDescription>
            <div className="bg-white p-8 shadow-lg rounded-lg print:p-0 print:shadow-none print:bg-transparent">
              <header className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {vitalHistory?.doctor.first_name}{" "}
                    {vitalHistory?.doctor.last_name}
                  </h1>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-600">
                    Date:{" "}
                    {vitalHistory
                      ? new Date(vitalHistory.date).toLocaleDateString()
                      : ""}
                  </p>
                  <p className="font-medium text-gray-600">Report #: {vitalHistory?.id}</p>
                </div>
              </header>
              
              {/* Patient Information Table */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Patient Information</h2>
                <table className="table-auto w-full text-left text-gray-800">
                  <tbody>
                    <tr className="border-t">
                      <th className="py-2 px-4 font-medium text-gray-600">Name:</th>
                      <td className="py-2 px-4">
                        {vitalHistory?.patient.first_name}{" "}
                        {vitalHistory?.patient.last_name}
                      </td>
                    </tr>
                    <tr className="border-t">
                      <th className="py-2 px-4 font-medium text-gray-600">Email:</th>
                      <td className="py-2 px-4">{vitalHistory?.patient.email}</td>
                    </tr>
                    <tr className="border-t">
                      <th className="py-2 px-4 font-medium text-gray-600">Phone:</th>
                      <td className="py-2 px-4">{vitalHistory?.patient.phone}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Medical Examination Table */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Medical Examination</h2>
                <table className="table-auto w-full text-left text-gray-800">
                  <tbody>
                    <tr className="border-t">
                      <th className="py-2 px-4 font-medium text-gray-600">Blood Pressure:</th>
                      <td className="py-2 px-4">{vitalHistory?.pressure} mmHg</td>
                    </tr>
                    <tr className="border-t">
                      <th className="py-2 px-4 font-medium text-gray-600">Weight:</th>
                      <td className="py-2 px-4">{vitalHistory?.weight} kg</td>
                    </tr>
                    <tr className="border-t">
                      <th className="py-2 px-4 font-medium text-gray-600">Blood Sugar:</th>
                      <td className="py-2 px-4">{vitalHistory?.blood_sugar} mg/dL</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Doctor's Report */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Doctor&apos;s Report</h2>
                <p className="text-gray-800">{vitalHistory?.report}</p>
              </section>

              {/* Doctor Information Table */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Doctor Information</h2>
                <table className="table-auto w-full text-left text-gray-800">
                  <tbody>
                    <tr className="border-t">
                      <th className="py-2 px-4 font-medium text-gray-600">Attending Doctor:</th>
                      <td className="py-2 px-4">
                        Dr. {vitalHistory?.doctor.first_name}{" "}
                        {vitalHistory?.doctor.last_name}
                      </td>
                    </tr>
                    <tr className="border-t">
                      <th className="py-2 px-4 font-medium text-gray-600">Contact:</th>
                      <td className="py-2 px-4">{vitalHistory?.doctor.phone}</td>
                    </tr>
                    <tr className="border-t">
                      <th className="py-2 px-4 font-medium text-gray-600">Email:</th>
                      <td className="py-2 px-4">{vitalHistory?.doctor.email}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 print:hidden"
              >
                Print Report
              </button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
