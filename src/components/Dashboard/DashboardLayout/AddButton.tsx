import { CoolMode } from "@/components/magicui/cool-mode";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function AddButton({
  handleAddDialog,
}: {
  handleAddDialog: () => void;
}) {
  const fireHandleAddDialog = () => {
    handleAddDialog();
  };
  const t=useTranslations("Dashboard.layout")
  return (
    <div className="relative justify-center">
      <CoolMode>
        <Button className="bg-[#666CFF] hover:bg-[#666CFF]" onClick={fireHandleAddDialog}>{t("addNew")}</Button>
      </CoolMode>
    </div>
  );
}
