import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { QrCode, FileText, Phone, Mail } from "lucide-react";
import { IPayment } from "@/types/paymentTypes/payment";
import { patient } from "@/types/patientTypes/patient";
import { Doctor } from "@/types/doctorsTypes/doctors";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { reservation, reservationDetails } from "@/types/reservationTypes/reservation";
import { examination } from "@/types/examinationTypes/examinationTypes";

interface PremiumPatientInvoiceProps {
  payment: IPayment;
  patient: patient;
  doctor: Doctor;
  reservation: reservationDetails;
  examination:examination
}

export default function PremiumPatientInvoice({
  payment,
  patient,
  doctor,
  reservation,
  examination
}: PremiumPatientInvoiceProps) {
    const handlePrint=()=>{
        window.print()
    }
  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-b from-white to-gray-50 text-gray-800 shadow-lg 	 ">
      <CardContent className="p-8 relative">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <FileText size={400} />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-700 mb-2">
              Ayadty Clinic System
            </h1>
            <p className="flex items-center mt-2">
              <Mail size={16} className="mr-2" />
              {doctor.email}
            </p>
            <p className="flex items-center mt-2">
              <Phone size={16} className="mr-2" />
              {doctor.phone}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-semibold mb-2 text-blue-700">
              INVOICE
            </h2>
            <p className="font-medium text-lg">
              Invoice #: {`EHI-${payment.id}`}
            </p>
            <p className="text-sm">
              Pay Date: {formatDateTime(payment.created_at)}
            </p>
            <p className="text-sm">
              Due Date: {formatDateTime(new Date(Date.now()))}
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Patient and Doctor Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              Patient Information
            </h3>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {`${patient.first_name} ${patient.last_name}`}
            </p>
            <p>
              <span className="font-medium">Patient ID:</span> {patient.id}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              Doctor Information
            </h3>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {`Dr. ${doctor.first_name} ${doctor.last_name}`}
            </p>
            <p>
              <span className="font-medium">Email:</span> {doctor.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {doctor.phone}
            </p>
          </div>
        </div>

        {/* Services Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold text-blue-700">
                Date of Service
              </TableHead>
              <TableHead className="font-semibold text-blue-700">
                Description
              </TableHead>
              <TableHead className="font-semibold text-blue-700">
                CPT Code
              </TableHead>
              <TableHead className="font-semibold text-blue-700 text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {new Date(
                  reservation.appointment.time_start
                ).toLocaleDateString()}
              </TableCell>
              <TableCell>{examination.name}</TableCell>
              <TableCell>{reservation.id}</TableCell>
              <TableCell className="text-right">${payment.amount}</TableCell>
            </TableRow>
            {/* Additional rows if needed */}
          </TableBody>
        </Table>

        {/* Totals and Payment */}
        <div className="mt-8 flex justify-between">
          <div className="w-1/2">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              Payment Details
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="mb-2">
                <span className="font-medium">Payment Method:</span>{" "}
                {payment.payment_method}
              </p>
              <p className="mb-2">
                <span className="font-medium">Transaction ID:</span>{" "}
                {payment.id}
              </p>
              <p className="mb-2">
                <span className="font-medium">Extra Amount:</span> $
                {payment.extra_amount}
              </p>
              <p className="mb-2">
                <span className="font-medium">Service Details:</span>{" "}
                {payment.comment}
              </p>
            </div>
          </div>
          <div className="w-1/3">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              Summary
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>
                  ${Number(payment.amount) + Number(payment.extra_amount)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount:</span>
                <span>-${payment.discount}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-lg text-blue-700">
                <span>Total Amount:</span>
                <span>${payment.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Thank you for choosing Ayadty Clinc System for your healthcare
            needs.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handlePrint}> print</Button>
      </CardFooter>
    </Card>
  );
}
