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
import QrCode2Icon from "@mui/icons-material/QrCode2";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import AppInfoView from "@crema/core/AppInfoView";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import ViewQr from "./ViewQr";

const Trabajadores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [open, setOpen] = useState(false);
  const [Qrdata, setDataQr] = useState([]);

  const dataUpdate = useCallback((datas) => () => {
    const data = datas.row;
    console.log(data);
    localStorage.setItem("dataid", data.id);
    localStorage.setItem("dataname", data.name);
    localStorage.setItem("datalastname", data.lastname);
    localStorage.setItem("datacompany", data.company);
    localStorage.setItem("dataposition", data.position);
    localStorage.setItem("datawork", data.job);
    localStorage.setItem("datawork_id", data.job_id);
    localStorage.setItem("datamanager_id", data.manager);
    localStorage.setItem("datamanager", data.manager_name);
    navigate("/trabajadores/edit");
  });

  useEffect(() => {
    const getWorkers = async () => {
      dispatch({ type: FETCH_START });
      try {
        await jwtAxios.get("/workers").then((res) => {
          setrows(res.data.workers);
          console.log(res.data.workers);
          dispatch({ type: FETCH_SUCCESS });
        });
      } catch (error) {
        dispatch({
          type: FETCH_ERROR,
          payload: error?.response?.data?.error || "Error de Servidor",
        });
      }
    };
    getWorkers();
  }, []);

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
            .get("/workers/status/" + id + "/" + currentStatus)
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
  const deleteWorker = useCallback(
    (id) => () => {
      setTimeout(() => {
        setrows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const dataQr = useCallback(
    (data) => () => {
      setOpen(true);
      setDataQr(data);
      /* localStorage.setItem("dataQr", number);
      navigate("/trabajadores/ViewQr"); */
    },
    []
  );
  const addNewManager = () => {
    navigate("/trabajadores/register");
  };
  const handleClose = () => setOpen(false);

  const columns = useMemo(
    () => [
      { field: "fullname", headerName: "Nombre", width: 200 },
      { field: "job", headerName: "Obra", width: 150 },
      { field: "manager_name", headerName: "Manager", width: 200 },
      { field: "position", headerName: "Puesto", width: 100 },
      { field: "status", headerName: "Status", type: "string", width: 100 },
      {
        field: "qr_code",
        type: "actions",
        headerName: "IDE_QR",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<QrCode2Icon />}
            onClick={dataQr(params.row)}
            label="Delete"
          />,
        ],
      },
      {
        field: "actions",
        width: 150,
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
            onClick={deleteWorker(params.id)}
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
    [deleteWorker, dataUpdate, dataQr, statusWorker]
  );
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <ViewQr dataQr={Qrdata} />
          </Box>
        </Fade>
      </Modal>
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
          Registrar Trabajador
        </Button>
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
      <AppInfoView />
    </>
  );
};
export default Trabajadores;
