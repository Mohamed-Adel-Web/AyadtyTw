import { ReactNode } from "react";

export default function TableHeadLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between align-items-center my-2">{children}</div>
  );
}
