import React, { useState, useEffect, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { Box, Button } from "@mui/material";

const ModalDelete = ({ open, handleClose, dataDelete, deleteProvider }) => {
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
              width: 500,
              height: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 8,
            }}
          >
            <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
              <img width={150} src={"/assets/images/marca-x.png"} />
            </Box>
            <Box sx={{ mb: 10, textAlign: "center" }}>
              <h1>Estas Seguro?</h1>
              <h4 style={{ marginTop: "10px" }}>
                ¿Realmente desea eliminar {dataDelete.name}? Este proceso no se
                puede deshacer
              </h4>
            </Box>
            <Box sx={{ mt: 10, textAlign: "center" }}>
              <Button
                onClick={deleteProvider}
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