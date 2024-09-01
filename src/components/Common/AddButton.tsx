import { Button } from "../ui/button";

export default function AddButton({
  handleAddDialog,
}: {
  handleAddDialog: () => void;
}) {
  const fireHandleAddDialog = () => {
    handleAddDialog();
  };
  return (
    <Button
      className="bg-[#666CFF] hover:bg-[#666CFF]"
      onClick={fireHandleAddDialog}
    >
      Add New
    </Button>
  );
}
