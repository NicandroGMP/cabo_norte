import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Bitacora = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);

  useEffect(() => {
    dispatch({ type: FETCH_START });
    try {
      jwtAxios.get("/workers").then((res) => {
        console.log(res);
        setrows(res.data.workers);
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
      { field: "job", headerName: "Obra", width: 200 },
      { field: "manager_name", headerName: "Manager", width: 200 },
      { field: "position", headerName: "Puesto", width: 200 },
      { field: "qr", headerName: "IDE_QR", width: 100 },
      { field: "hora_entrada", headerName: "Hora Entrada", width: 100 },
      { field: "hora_salida", headerName: "Hora Salida", width: 100 },
    ],
    []
  );
  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 1,
        }}
      ></Box>
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
