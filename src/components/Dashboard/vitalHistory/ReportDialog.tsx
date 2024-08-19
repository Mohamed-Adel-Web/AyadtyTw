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
}: {
  openSheet: boolean;
  setOpenSheet: (openSheet: boolean) => void;
  vitalHistory: IVitalHistory;
}) {
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <header className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <img
                    src="/placeholder.svg"
                    alt="Clinic Logo"
                    width={50}
                    height={50}
                    className="mr-4"
                    style={{ aspectRatio: "50/50", objectFit: "cover" }}
                  />
                  <h1 className="text-2xl font-bold">Acme Medical Clinic</h1>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    Date: {new Date().toLocaleDateString()}
                  </p>
                  <p className="font-medium">Report #: 12345</p>
                </div>
              </header>
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-2">Patient Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Name:</p>
                    <p>John Doe</p>
                  </div>
                  <div>
                    <p className="font-medium">Date of Birth:</p>
                    <p>01/01/1980</p>
                  </div>
                  <div>
                    <p className="font-medium">Gender:</p>
                    <p>Male</p>
                  </div>
                  <div>
                    <p className="font-medium">Contact:</p>
                    <p>555-1234567</p>
                  </div>
                </div>
              </section>
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-2">Medical Examination</h2>
                <p>
                  The patient presented with complaints of headache, fatigue,
                  and muscle aches. A thorough physical examination was
                  conducted, and the following findings were noted:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Blood pressure: 120/80 mmHg</li>
                  <li>Heart rate: 72 bpm</li>
                  <li>Temperature: 98.6°F</li>
                  <li>Respiratory rate: 14 breaths per minute</li>
                </ul>
              </section>
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-2">Diagnosis</h2>
                <p>
                  Based on the examination and the patient's reported symptoms,
                  the following diagnosis was made:
                </p>
                <p className="font-medium mt-2">Influenza (Flu)</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-2">
                  Treatment Recommendations
                </h2>
                <p>
                  The following treatment plan was recommended to the patient:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Rest and stay hydrated</li>
                  <li>Take over-the-counter pain medication as needed</li>
                  <li>
                    Prescription of Tamiflu (oseltamivir) to be taken for 5 days
                  </li>
                  <li>Follow up in 7 days or if symptoms worsen</li>
                </ul>
              </section>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
