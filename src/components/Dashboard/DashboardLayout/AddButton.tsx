import { CoolMode } from "@/components/magicui/cool-mode";
import { Button } from "@/components/ui/button";

export default function AddButton({
  handleAddDialog,
}: {
  handleAddDialog: () => void;
}) {
  const fireHandleAddDialog = () => {
    handleAddDialog();
  };
  return (
    <div className="relative justify-center">
      <CoolMode>
        <Button className="bg-[#666CFF] hover:bg-[#666CFF]" onClick={fireHandleAddDialog}>Add New</Button>
      </CoolMode>
    </div>
  );
}
