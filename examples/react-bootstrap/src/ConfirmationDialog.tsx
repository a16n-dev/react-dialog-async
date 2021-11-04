import React from "react";
import { Button, Modal } from "react-bootstrap";
import { AsyncDialogProps } from "react-dialog-async";

interface ConfirmationDialogData {
  title: string;
  message: string;
}

/**
 * This is an example confirmation dialog. It can be passed a title and message to display,
 * and will return a boolean representing if the user accepted the dialog or not.
 */
const ConfirmationDialog: React.FC<
  AsyncDialogProps<ConfirmationDialogData, boolean>
> = ({ open, handleClose, data }) => {
  return (
    <Modal show={open} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{data.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          No
        </Button>
        <Button variant="primary" onClick={() => handleClose(true)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;
