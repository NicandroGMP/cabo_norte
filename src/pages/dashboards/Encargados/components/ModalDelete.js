import React, { useState, useEffect, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { Box, Button } from "@mui/material";

const ModalDelete = ({ open, handleClose, dataDelete, deleteManager }) => {
  console.log(dataDelete);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 200,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box sx={{ mb: 10, textAlign: "center" }}>
              <h1>Eliminar El Encargado {dataDelete.name} ?</h1>
            </Box>
            <Box sx={{ mt: 10, textAlign: "center" }}>
              <Button
                onClick={deleteManager}
                color="secondary"
                variant="contained"
                sx={{ ml: 1, margin: "auto" }}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalDelete;
