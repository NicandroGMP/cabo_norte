import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppInfoView from "@crema/core/AppInfoView";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalDelete from "./components/ModalDelete";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import CustomNoRows from "./components/CustomNoRows";

const Obras = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);
  const [NotRows, setNotRows] = useState(true);

  const dataUpdate = useCallback((datas) => () => {
    const data = datas.row;
    localStorage.setItem("dataid", data.id);
    localStorage.setItem("datajob", data.job);
    localStorage.setItem("databatch", data.batch);
    localStorage.setItem("datastatus", data.status);
    localStorage.setItem("datacolor", data.color);
    navigate("/obras/edit");
  });
  useEffect(() => {
    const getWorks = () => {
      dispatch({ type: FETCH_START });
      jwtAxios
        .get("/works")
        .then((res) => {
          setrows(res.data.works);
          dispatch({ type: FETCH_SUCCESS });
        })
        .catch(() => {
          setNotRows(false);
          dispatch({ type: FETCH_SUCCESS });
        });
    };
    getWorks();
  }, []);

  const Modaldelete = useCallback(
    (data) => () => {
      setOpen(true);
      setDataDelete(data);
    },
    []
  );
  const deleteWork = async () => {
    const id = dataDelete.id;
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/works/delete", {
        id,
      });
      setTimeout(() => {
        setrows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
      setOpen(false);
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_ERROR,
        payload:
          error?.response?.data?.error ||
          "Error al eliminar Subcondominio: Asegurese que un encargado no este registrado con este subcondominio",
      });
    }
  };
  const handleClose = () => setOpen(false);

  const addNewManager = () => {
    navigate("/obras/register");
  };
  const statusWorks = useCallback(
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
            .get("/works/status/" + id + "/" + currentStatus)
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
      { field: "job", headerName: "Subcondominio", width: 300 },
      { field: "batch", headerName: "Lote", width: 300 },
      { field: "status", headerName: "Estatus", width: 200 },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 180,
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
            onClick={Modaldelete({ id: params.id, name: params.row.job })}
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
            onClick={statusWorks({
              id: params.id,
              currentStatus: params.row.status,
            })}
            label="status"
          />,
        ],
      },
    ],
    [Modaldelete, dataUpdate, statusWorks]
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
        deleteManager={deleteWork}
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
          Registrar Obra
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
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          rowsPerPageOptions={[5]}
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
export default Obras;
