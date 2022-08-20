import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import IntlMessages from "@crema/utility/IntlMessages";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import Signin from "pages/auth/Signin";
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
              color: "gray",
              fontSize: "0.8rem",
              textAlign: "center",
              color: "#626262",
            }}
          >
            Por vuelva a iniciar sesion.
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
            >
              Iniciar Sesion
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CustomNoRows;
