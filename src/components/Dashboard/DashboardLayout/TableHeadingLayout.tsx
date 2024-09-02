import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function TableHeadLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" ">
      <div className="relative  w-full  items-center overflow-hidden rounded-lg border bg-background md:shadow-xl flex justify-between align-items-center my-2 p-4">
        {children}
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
    </div>
  );
}
