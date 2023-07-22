import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";

export default function ModalLayout({
  children,
  modalTitle,
  open,
  setOpen,
  width,
}) {
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: width || 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "4px",
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {modalTitle}
          </Typography>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
