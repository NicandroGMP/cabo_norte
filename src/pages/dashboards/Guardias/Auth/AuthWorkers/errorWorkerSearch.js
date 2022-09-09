import React, { useState } from "react";
import { Box } from "@mui/material";
const WorkerError = () => {
  return (
    <>
      <Box
        sx={{ display: "inline-block", width: "100%", background: "#E9F6FF" }}
      >
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            display: "inline-block",
          }}
        >
          <img width={300} src={"/assets/images/block-user.png"} />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <h1>Trabajador no encontrado ingrese la matricula correcta</h1>
        </Box>
      </Box>
    </>
  );
};

export default WorkerError;
