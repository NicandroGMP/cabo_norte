import React from "react";
import { Box } from "@mui/material";
import { baseURL } from "shared/constants/AppConst";

const CustomNoRows = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "block",
          zIndex: "10",
          position: "relative",
          mt: 8,
        }}
      >
        <Box
          sx={{
            mt: 8,
            width: "40%",
            height: "40%",
            color: "withe",
            margin: "auto",
          }}
        >
          <Box
            sx={{
              mb: 5,
              fontSize: "1.2rem",
              fontWeight: "800",
              textAlign: "center",
              color: "#626262",
            }}
          >
            Su sesion a expirado
          </Box>
          <Box
            sx={{
              mb: 7,
              fontSize: "0.8rem",
              textAlign: "center",
              color: "#626262",
            }}
          >
            Por vuelva a iniciar sesion.
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <a variant="contained" href={baseURL + "/signin"}>
              Iniciar Sesion
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CustomNoRows;
