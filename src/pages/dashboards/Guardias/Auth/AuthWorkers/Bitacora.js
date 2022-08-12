import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import jwtAxios from "../../../../../@crema/services/auth/jwt-auth/index";
import { Link } from "react-router-dom";
import IntlMessages from "@crema/utility/IntlMessages";

import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Bitacora = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [dontExit, setDontExit] = useState(null);
  const [completeRegister, setCompleteRegister] = useState(null);
  const [totalRegister, setTotalRegister] = useState(null);

  useEffect(() => {
    dispatch({ type: FETCH_START });
    try {
      jwtAxios.get("/bitacora").then((res) => {
        setrows(res.data.bitacora);
        console.log(res.data);
        setCompleteRegister(res.data.success_entry);
        setTotalRegister(res.data.total_worker);
        setDontExit(res.data.dontExit.dontExit);
        dispatch({ type: FETCH_SUCCESS });
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error de Servidor",
      });
    }
  }, []);

  const deleteWorker = useCallback(
    (id) => () => {
      console.log(id);
    },
    []
  );

  const columns = useMemo(
    () => [
      { field: "fullname", headerName: "Nombre", width: 200 },
      { field: "company", headerName: "Empresa", width: 150 },
      { field: "position", headerName: "Puesto", width: 150 },
      { field: "work", headerName: "Obra", width: 150 },
      { field: "manager", headerName: "Encargado", width: 100 },
      { field: "entry_worker", headerName: "Hora Entrada", width: 200 },
      { field: "exit_worker", headerName: "Hora Salida", width: 200 },
    ],
    []
  );
  return (
    <>
      <Box sx={{ mb: 9, mt: 5 }}>
        <Link to="/guardias/auth">
          <Button
            variant="contained"
            color="secondary"
            type="button"
            sx={{
              mx: 5,
              minWidth: 160,
              fontWeight: 500,
              fontSize: 16,
              textTransform: "capitalize",
              padding: "4px 16px 8px",
            }}
          >
            <IntlMessages id="Regresar" />
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 1,
        }}
      >
        <Stack direction="row" spacing={4}>
          <h5 style={{ mt: 5 }}>Registros de entrada</h5>
          <Chip sx={{ color: "#fff" }} label={totalRegister} color="primary" />
          <h5 style={{ mt: 5 }}>Sin registros de salida</h5>
          <Chip label={dontExit} color="secondary" />
          <h5 style={{ mt: 5 }}>Registros completados</h5>
          <Chip
            sx={{ color: "#fff" }}
            label={completeRegister}
            color="success"
          />
        </Stack>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};
export default Bitacora;
