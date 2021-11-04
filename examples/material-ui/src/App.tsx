import { Button, Container, Typography } from "@mui/material";
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
    <Container>
      <Typography variant="h2">react-dialog-async</Typography>
      <Button variant="contained" onClick={handleClick}>
        Open Dialog
      </Button>
      {result && <Typography>Selected Yes</Typography>}
    </Container>
  );
};

export default App;
