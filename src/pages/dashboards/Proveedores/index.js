import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import AppInfoView from "@crema/core/AppInfoView";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalDelete from "./components/ModalDelete";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import CustomNoRows from "./components/CustomNoRows";
import { useAuthUser } from "@crema/utility/AuthHooks";

const Proveedores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const [open, setOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);
  const [rows, setrows] = useState([]);
  const [NotRows, setNotRows] = useState(true);

  const dataUpdate = useCallback((datas) => () => {
    const data = datas.row;
    localStorage.setItem("dataid", data.id);
    localStorage.setItem("dataname", data.name);
    localStorage.setItem("dataservice", data.service);
    navigate("/proveedores/edit");
  });

  useEffect(() => {
    const getProviders = () => {
      dispatch({ type: FETCH_START });
      jwtAxios.get("/manager/" + user.user_inf).then((resManager) => {
        const manager = resManager?.data?.manager?.[0];

        if (manager) {
          jwtAxios
            .get("/providers/" + user.user_inf + "/" + manager.work_id)
            .then((res) => {
              setrows(res.data.providers);
              dispatch({ type: FETCH_SUCCESS });
            })
            .catch(() => {
              setNotRows(false);
              dispatch({ type: FETCH_SUCCESS });
            });
        } else {
          setNotRows(false);
          dispatch({ type: FETCH_SUCCESS });
        }
      });
    };
    getProviders();
  }, []);

  /* const deleteWorker = useCallback((id) => () => {}, []); */

  /*  const dataQr = useCallback(
    (number) => () => {
      localStorage.setItem("dataQr", number);
      navigate("/proveedores/ViewQr");
    },
    []
  ); */
  const addNewManager = () => {
    navigate("/proveedores/register");
  };
  const statusProvider = useCallback(
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
            .get("/providers/status/" + id + "/" + currentStatus)
            .then(() => {
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
  const Modaldelete = useCallback(
    (data) => () => {
      setOpen(true);
      setDataDelete(data);
    },
    []
  );

  const handleClose = () => setOpen(false);
  const deleteProvider = async () => {
    const id = dataDelete.id;
    dispatch({ type: FETCH_START });

    try {
      await jwtAxios.post("/providers/delete", {
        id,
      });
      setTimeout(() => {
        setrows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
      setOpen(false);
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload:
          error?.response?.data?.error || "Error al eliminar el proveedor",
      });
    }
  };
  const columns = useMemo(
    () => [
      { field: "name", headerName: "Nombre", width: 200 },
      { field: "service", headerName: "Servicio", width: 500 },
      { field: "status", headerName: "Estatus", width: 150 },

      /*   {
        field: "qr_code",
        type: "actions",
        headerName: "IDE_QR",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<QrCode2Icon />}
            onClick={dataQr(params.row.register_number)}
            label="Delete"
          />,
        ],
      }, */
      {
        field: "actions",
        type: "actions",
        width: 180,
        headerName: "Actions",
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<EditIcon />}
            onClick={dataUpdate(params)}
            label="Delete"
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<DeleteIcon />}
            onClick={Modaldelete({ id: params.id, name: params.row.name })}
            label="Delete"
          />,
          <GridActionsCellItem
            key={params.id}
            icon={
              params.row.status == "Habilitado" ? (
                <PersonIcon />
              ) : (
                <PersonOffIcon />
              )
            }
            sx={{
              background: `${params.row.status == "Habilitado" ? "#91E87C" : "#FFA0A0"
                }`,
              color: `${params.row.status == "Habilitado" ? "#1E9900" : "#FF0101"
                }`,
            }}
            onClick={statusProvider({
              id: params.id,
              currentStatus: params.row.status,
            })}
            label="status"
          />,
        ],
      },
    ],
    [Modaldelete, dataUpdate, statusProvider /* dataQr */]
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
        deleteProvider={deleteProvider}
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
          Registrar Proveedor
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
export default Proveedores;
