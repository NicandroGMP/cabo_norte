import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import jwtAxios from "../../../../../@crema/services/auth/jwt-auth/index";
import { Link } from "react-router-dom";
import IntlMessages from "@crema/utility/IntlMessages";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import moment from "moment";

const Bitacora = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [dontExit, setDontExit] = useState(null);
  const [completeRegister, setCompleteRegister] = useState(null);
  const [totalRegister, setTotalRegister] = useState(null);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    console.log(value);
    dispatch({ type: FETCH_START });
    try {
      jwtAxios
        .get("/bitacora/" + moment(value).format("Y-MM-DD"))
        .then((res) => {
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
  }, [value]);

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
        <Button
          onClick={() => navigate("/guardias/home")}
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
      </Box>
      <Box sx={{ mb: 8, mt: 5 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
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
