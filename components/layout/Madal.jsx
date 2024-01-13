import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function DialogDefault({
  isOpen,
  handleOpen,
  deleteAddress,
  id,
  values,
}) {
  return (
    <>
      <Dialog open={isOpen} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>Sure you want to delete this address?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={async () => {
              await deleteAddress(id);
              for (key in values) {
                values[key]("");
              }
              handleOpen();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
