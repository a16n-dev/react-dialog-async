import { useState } from "react";
import { Button, Container } from "react-bootstrap";
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
      <h1>react-dialog-async & react-bootstrap</h1>
      <Button variant="primary" onClick={handleClick}>
        Open Dialog
      </Button>
      {result && <p>Selected Yes</p>}
    </Container>
  );
};

export default App;
