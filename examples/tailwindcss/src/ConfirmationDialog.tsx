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
    <>
      {open && (
        <div className={"absolute inset-0 flex items-start justify-center"}>
          <div
            className={"absolute w-full h-full bg-black bg-opacity-20"}
            onClick={() => handleClose()}
          ></div>
          <div
            className={
              "relative mx-auto shadow p-4 bg-white z-10 rounded mt-16"
            }
          >
            <h2 className={"text-lg font-semibold"}>{data.title}</h2>
            <p className={'my-4'}>{data.message}</p>
            <div className={"flex justify-end"}>
              <button
                className={
                  "border-purple-500 text-purple-500 hover:text-purple-100 hover:bg-purple-500 border rounded py-2 px-4 mr-2"
                }
                onClick={() => handleClose(false)}
              >
                No
              </button>
              <button
                className={
                  "bg-purple-500 hover:bg-purple-400 text-purple-100 py-2 px-4 rounded"
                }
                onClick={() => handleClose(true)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationDialog;
