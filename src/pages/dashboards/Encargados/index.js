import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
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
import CustomNoRows from "./components/CustomNoRows";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";

const Encargados = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [NotRows, setNotRows] = useState(true);

  const dataUpdate = useCallback((datas) => () => {
    const data = datas.row;
    console.log(data);
    localStorage.setItem("dataid", data.id);
    localStorage.setItem("dataid_manager", data.manager_id);
    localStorage.setItem("dataname", data.name);
    localStorage.setItem("datalastname", data.lastname);
    localStorage.setItem("datacompany", data.company);
    localStorage.setItem("dataposition", data.position);
    localStorage.setItem("datawork", data.job);
    localStorage.setItem("datawork_id", data.work_id);
    navigate("/encargados/edit");
  });
  useEffect(() => {
    dispatch({ type: FETCH_START });
    try {
      jwtAxios
        .get("/managers")
        .then((res) => {
          setrows(res.data.managers);
          console.log(res.data.managers);
          dispatch({ type: FETCH_SUCCESS });
        })
        .catch(() => setNotRows(false));
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Registrar",
      });
    }
  }, []);

  const deleteManager = useCallback(
    (id) => () => {
      console.log(id);
    },
    []
  );

  const addNewManager = () => {
    navigate("/encargados/register");
  };
  const statusWorker = useCallback(
    ({ id, currentStatus }) =>
      () => {
        dispatch({ type: FETCH_START });
        if (currentStatus === "Deshabilitado") {
          setrows((prevRows) =>
            prevRows.map((row) =>
              row.id === id ? { ...row, status: "Habilitado" } : row
            )
          );
        } else {
          setrows((prevRows) =>
            prevRows.map((row) =>
              row.id === id ? { ...row, status: "Deshabilitado" } : row
            )
          );
        }

        try {
          jwtAxios
            .get("/managers/status/" + id + "/" + currentStatus)
            .then((res) => {
              dispatch({
                type: FETCH_SUCCESS,
              });
            });
        } catch (error) {
          dispatch({
            type: FETCH_ERROR,
            payload: error?.response?.data?.error || "Error en el servidor",
          });
        }
      },
    []
  );
  const columns = useMemo(
    () => [
      { field: "fullname", headerName: "Nombre", width: 200 },
      { field: "position", headerName: "Puesto", width: 100 },
      { field: "company", headerName: "Empresa", width: 200 },
      { field: "job", headerName: "Subcondominio", width: 200 },
      { field: "status", headerName: "Habilitado", width: 180 },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={dataUpdate(params)}
            label="Delete"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={deleteManager(params.id)}
            label="Delete"
          />,
          <GridActionsCellItem
            icon={<PersonAddDisabledIcon />}
            onClick={statusWorker({
              id: params.id,
              currentStatus: params.row.status,
            })}
            label="status"
          />,
        ],
      },
    ],
    [deleteManager, dataUpdate, statusWorker]
  );
  function CustomNoRowsOverlay() {
    return <>{NotRows === false && <CustomNoRows />}</>;
  }
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
          onClick={addNewManager}
          color="primary"
          variant="outlined"
          sx={{ ml: 1 }}
        >
          Registrar Encargado
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>
    </>
  );
};
export default Encargados;
