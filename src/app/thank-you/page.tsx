"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CircleCheckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Component() {
  const paymentParams = useSearchParams();
  const handleClosePage = () => {
    window.close();
  };
  const paramsArray = Array.from(paymentParams.entries());

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <CircleCheckIcon className="text-green-500 size-12" />
          <h1 className="text-2xl font-bold">Payment Successful</h1>
          <p className="text-muted-foreground">
            Your payment was processed successfully.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="grid gap-2 text-sm">
          {paramsArray.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-muted-foreground capitalize">
                {key.replace(/_/g, " ")} :
              </span>
              <span>{value || "N/A"}</span>
            </div>
          ))}
        </div>
        <Separator className="my-6" />
        <Button className="w-full" onClick={handleClosePage}>
          Close
        </Button>
      </Card>
    </div>
  );
}
