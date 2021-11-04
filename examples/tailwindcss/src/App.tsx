import { useState } from "react";
import { useDialog } from "react-dialog-async";
import ConfirmationDialog from "./ConfirmationDialog";

const App = () => {
  const [result, setResult] = useState<boolean>();
  const confirmationDialog = useDialog(ConfirmationDialog);

  const handleClick = async () => {
    const response = await confirmationDialog.show({
      title: "Do you want to continue?",
      message:
        "This is an example of how data can be passed into the dialog component",
    });

    setResult(response);
  };

  return (
    <div className={'container mx-auto'}>
      <h1 className={'my-4 text-4xl font-semibold'}>react-dialog-async</h1>
      <button className={'bg-purple-500 hover:bg-purple-400 text-purple-100 py-2 px-4 rounded'} onClick={handleClick}>
        Open Dialog
      </button>
      {result && <p>Selected Yes</p>}
    </div>
  );
};

export default App;
