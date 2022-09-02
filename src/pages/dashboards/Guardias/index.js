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
import AppInfoView from "@crema/core/AppInfoView";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import CustomNoRows from "./components/CustomNoRows";
import ModalDelete from "./components/ModalDelete";

const Guardias = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);
  const [NotRows, setNotRows] = useState(true);

  const dataUpdate = useCallback((datas) => () => {
    const data = datas.row;
    console.log(data);
    localStorage.setItem("dataid", data.id);
    localStorage.setItem("dataid_guard", data.manager_id);
    localStorage.setItem("dataname", data.name);
    localStorage.setItem("datalastname", data.lastname);
    localStorage.setItem("datacompany", data.company);
    localStorage.setItem("dataposition", data.position);
    navigate("/guardias/edit");
  });
  useEffect(() => {
    const getGuards = () => {
      dispatch({ type: FETCH_START });
      jwtAxios
        .get("/guards")
        .then((res) => {
          setrows(res.data.guards);
          dispatch({ type: FETCH_SUCCESS });
        })
        .catch(() => {
          setNotRows(false);
          dispatch({ type: FETCH_SUCCESS });
        });
    };
    getGuards();
  }, []);

  const Modaldelete = useCallback(
    (data) => () => {
      setOpen(true);
      setDataDelete(data);
    },
    []
  );
  const deleteGuard = async () => {
    const id_guards = dataDelete.id_guards;
    const id = dataDelete.id;
    console.log(id);
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/guards/delete", {
        id_guards,
      });
      setTimeout(() => {
        setrows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
      setOpen(false);
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Eliminar Guardia",
      });
    }
  };
  const handleClose = () => setOpen(false);

  const addNewManager = () => {
    navigate("/guardias/register");
  };
  const statusGuards = useCallback(
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
            .get("/guards/status/" + id + "/" + currentStatus)
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
      { field: "position", headerName: "Puesto", width: 200 },
      { field: "company", headerName: "Empresa", width: 200 },
      { field: "status", headerName: "Estatus", width: 200 },
      {
        field: "actions",
        type: "actions",
        width: 180,
        headerName: "Actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Editar" placement="top-start">
                <EditIcon />
              </Tooltip>
            }
            onClick={dataUpdate(params)}
            label="Delete"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={Modaldelete({
              id_guards: params.row.guards_id,
              name: params.row.name,
              id: params.id,
            })}
            label="Delete"
          />,
          <GridActionsCellItem
            icon={
              params.row.status == "Habilitado" ? (
                <PersonIcon />
              ) : (
                <PersonOffIcon />
              )
            }
            sx={{
              background: `${
                params.row.status == "Habilitado" ? "#91E87C" : "#FFA0A0"
              }`,
              color: `${
                params.row.status == "Habilitado" ? "#1E9900" : "#FF0101"
              }`,
            }}
            onClick={statusGuards({
              id: params.id,
              currentStatus: params.row.status,
            })}
            label="status"
          />,
        ],
      },
    ],
    [Modaldelete, dataUpdate, statusGuards]
  );
  function CustomNoRowsOverlay() {
    return <>{NotRows === false && <CustomNoRows />}</>;
  }
  return (
    <>
      <ModalDelete
        open={open}
        handleClose={handleClose}
        dataDelete={dataDelete}
        deleteManager={deleteGuard}
      />
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
          Registrar Guardia
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>
      <AppInfoView />
    </>
  );
};
export default Guardias;
