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
import AppInfoView from "@crema/core/AppInfoView";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomNoRows from "./components/CustomNoRows";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import ModalDelete from "./components/ModalDelete";

const Encargados = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [NotRows, setNotRows] = useState(true);
  const [open, setOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);

  const dataUpdate = useCallback((datas) => () => {
    const data = datas.row;
    localStorage.setItem("dataid", data.id);
    localStorage.setItem("datausername", data.username);
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
    const getManagers = () => {
      dispatch({ type: FETCH_START });
      jwtAxios
        .get("/managers")
        .then((res) => {
          setrows(res.data.managers);
          dispatch({ type: FETCH_SUCCESS });
        })
        .catch(() => {
          setNotRows(false);
          dispatch({ type: FETCH_SUCCESS });
        });
    };
    getManagers();
  }, []);

  const Modaldelete = useCallback(
    (data) => () => {
      setOpen(true);
      setDataDelete(data);
    },
    []
  );
  const deleteManager = async () => {
    const id_manager = dataDelete.id_manager;
    const id = dataDelete.id;
    dispatch({ type: FETCH_START });

    try {
      await jwtAxios.post("/managers/delete", {
        id_manager,
      });
      setTimeout(() => {
        setrows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
      setOpen(false);
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Eliminar",
      });
    }
  };
  const handleClose = () => setOpen(false);

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
  const columns = useMemo(
    () => [
      { field: "fullname", headerName: "Nombre", width: 200 },
      { field: "position", headerName: "Puesto", width: 120 },
      { field: "company", headerName: "Empresa", width: 180 },
      { field: "job", headerName: "Subcondominio", width: 150 },
      { field: "status", headerName: "Status", width: 180 },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 130,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.row.id}
            icon={<EditIcon />}
            onClick={dataUpdate(params)}
            label="Delete"
          />,
          <GridActionsCellItem
            key={params.row.id}
            icon={<DeleteIcon />}
            onClick={Modaldelete({
              id_manager: params.row.manager_id,
              name: params.row.name,
              id: params.id,
            })}
            label="Delete"
          />,
          <GridActionsCellItem
            key={params.row.id}
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
            onClick={statusWorker({
              id: params.row.id,
              currentStatus: params.row.status,
            })}
            label="status"
          />,
        ],
      },
    ],
    [Modaldelete, dataUpdate, statusWorker]
  );
  function CustomNoRowsOverlay() {
    return <>{NotRows === false && <CustomNoRows />}</>;
  }
  const file = async (ev) => {
    var file = ev.target.files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
      let data = event.target.result;
      const keys = data.slice(0, data.indexOf("\r\n")).split(",");
      const values = data.slice(data.indexOf("\n") + 1).split("\r\n");

      const createArray = values.map((keyValues) => {
        const newvalues = keyValues.split(",");
        if (newvalues[0].length > 1) {
          const storeKeyValue = keys.reduce((obj, keys, index) => {
            obj[keys] = newvalues[index];
            return obj;
          }, {});
          return storeKeyValue;
        }
      });

      console.log(createArray);
    };
    reader.readAsText(file);
  };
  return (
    <>
      <ModalDelete
        open={open}
        handleClose={handleClose}
        dataDelete={dataDelete}
        deleteManager={deleteManager}
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
          Registrar Encargado
        </Button>
        {/* <Button variant="contained" component="label">
          Importar Datos
          <input
            onChange={file}
            hidden
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            multiple
            type="file"
          />
        </Button> */}
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
      <AppInfoView />
    </>
  );
};
export default Encargados;
