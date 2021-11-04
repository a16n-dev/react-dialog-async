import { ComponentType } from "react";

export interface AsyncDialogProps<Request = void, Response = undefined> {
  open: boolean;
  handleClose: (data?: Response) => void;
  data: Request;
}

export type DialogComponent<D, R> = ComponentType<AsyncDialogProps<D, R>>;