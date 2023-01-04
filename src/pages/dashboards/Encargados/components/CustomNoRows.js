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
            Porfavor vuelva a iniciar sesion.
          </Box>
          <Box
            sx={{
              textAlign: "center",
              background: "#00B6FF",
              color: "white",
              borderRadius: "10px 10px 10px 10px",
              width: "100px",
              margin: "auto",
              heigth: "40px",
              padding: "10px",
            }}
            variant="contained"
          >
            <a
              style={{
                color: "white",
                outline: "none",
                listStyle: "none",
                textDecoration: "none",
              }}
              href={"https://" + baseURL}
            >
              Iniciar Sesion
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CustomNoRows;
