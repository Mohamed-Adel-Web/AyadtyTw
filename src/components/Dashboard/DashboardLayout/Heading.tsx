import { BadgePlus } from "lucide-react";

export default function Heading({ title }: { title: string }) {
  return (
    <h2 className="font-bold text-[#5A5FE1]  text-3xl flex items-center gap-3">
      <BadgePlus />
      Manage {title}
    </h2>
  );
}
