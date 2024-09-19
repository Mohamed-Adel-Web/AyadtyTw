import { BadgePlus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Heading({ title }: { title: string }) {
  const t=useTranslations("Dashboard.layout")
  return (
    <h2 className="font-bold text-[#5A5FE1]  text-3xl flex items-center gap-3">
      <BadgePlus />
      {t("manage")} {title}
    </h2>
  );
}
