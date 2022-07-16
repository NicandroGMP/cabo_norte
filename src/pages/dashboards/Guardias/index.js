import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppSearchBar from "@crema/core/AppSearchBar";
const Guardias = () => {
  const navigate = useNavigate();
  const viewSacan = () => {
    navigate("/guardias/ScanQr");
  };
  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 1,
        }}
      >
        <Button
          onClick={viewSacan}
          color="primary"
          variant="outlined"
          sx={{ ml: 1 }}
        >
          Scanear codigo Qr
        </Button>
      </Box>

      <Box sx={{ mb: 5 }}>Buscar Trabajador</Box>
      <Box sx={{ mb: 5 }}>
        <AppSearchBar
          iconPosition="right"
          placeholder="Search…"
          value={"hola"}
        />
      </Box>
    </>
  );
};

export default Guardias;
