import React from "react";
import { Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";

import { useNavigate } from "react-router-dom";

import SelectWorkProvider from "./AuthProviders/selectWorkProvider";

const GuardHome = () => {
  const navigate = useNavigate();
  const workersLink = () => {
    navigate("/guardias/entradas/trabajadores");
  };
  const providersLink = () => {
    navigate("/guardias/entradas/proveedores");
  };
  return (
    <>
      <SelectWorkProvider>
        <Box sx={{ width: "100%", display: "block", mt: 30 }}>
          <Box
            sx={{
              width: "50%",
              margin: "auto",
              textAlign: "center",
              height: "150px",
            }}
          >
            <Button
              onClick={workersLink}
              variant="contained"
              sx={{
                height: "100px",
                width: "320px",
                fontSize: "1.5rem",
                background: "#ab47bc",
              }}
            >
              Entradas Trabajadores
            </Button>
          </Box>
          <Box
            sx={{
              width: "50%",
              margin: "auto",
              textAlign: "center",
              height: "150px",
            }}
          >
            <Button
              color="secondary"
              onClick={() => navigate("/guardias/salidas/trabajadores")}
              variant="contained"
              sx={{
                height: "100px",
                width: "320px",
                fontSize: "1.5rem",
                background: "#ab47bc",
              }}
            >
              Salidas Trabajadores
            </Button>
          </Box>
          <Box
            sx={{
              width: "50%",
              margin: "auto",
              textAlign: "center",
              height: "150px",
            }}
          >
            <Button
              onClick={() => {
                navigate("/guardias/bitacora_trabajadores");
              }}
              variant="contained"
              sx={{
                height: "100px",
                width: "320px",
                fontSize: "1.5rem",
                background: "#ab47bc",
              }}
            >
              Bitacora Trabajadores
            </Button>
          </Box>
          <Divider />
          <Box
            sx={{
              mt: 10,
              textAlign: "center",
              height: "150px",
            }}
          >
            <Button
              color="primary"
              onClick={providersLink}
              variant="contained"
              sx={{ height: "100px", width: "320px", fontSize: "1.5rem" }}
            >
              Entradas Proveedores
            </Button>
          </Box>
          <Box
            sx={{
              width: "50%",
              margin: "auto",
              textAlign: "center",
              height: "150px",
            }}
          >
            <Button
              color="primary"
              onClick={() => navigate("/guardias/entradas/cones")}
              variant="contained"
              sx={{ height: "100px", width: "320px", fontSize: "1.5rem" }}
            >
              Salida Proveedores
            </Button>
          </Box>
          <Box
            sx={{
              width: "50%",
              margin: "auto",
              textAlign: "center",
              height: "150px",
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                navigate("/guardias/bitacora_proveedores");
              }}
              variant="contained"
              sx={{
                height: "100px",
                width: "320px",
                fontSize: "1.5rem",
              }}
            >
              Bitacora Proveedores
            </Button>
          </Box>
        </Box>
      </SelectWorkProvider>
    </>
  );
};

export default GuardHome;
