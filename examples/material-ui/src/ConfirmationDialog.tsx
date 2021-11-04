import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
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
    <Dialog open={open} onClose={() => handleClose(false)}>
      <DialogTitle>{data.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {data.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>No</Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
