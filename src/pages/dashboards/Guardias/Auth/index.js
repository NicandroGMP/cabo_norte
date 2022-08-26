import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import AppInfoView from "@crema/core/AppInfoView";

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
              color="primary"
              onClick={workersLink}
              variant="contained"
              sx={{ height: "100px", width: "320px", fontSize: "1.5rem" }}
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
              color="primary"
              onClick={() => navigate("/guardias/salidas/trabajadores")}
              variant="contained"
              sx={{ height: "100px", width: "320px", fontSize: "1.5rem" }}
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
        </Box>
      </SelectWorkProvider>
    </>
  );
};

export default GuardHome;
