import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
} from "react";
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
import AppInfoView from "@crema/core/AppInfoView";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import ViewQr from "./ViewQr";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import ModalDelete from "./components/ModalDelete";
import CustomNoRows from "./components/CustomNoRows";

const Trabajadores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [open, setOpen] = useState(false);
  const [Qrdata, setDataQr] = useState([]);
  const [openMD, setOpenMD] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);
  const [NotRows, setNotRows] = useState(true);

  const dataUpdate = useCallback((datas) => () => {
    const data = datas.row;
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
      jwtAxios
        .get("/workers")
        .then((res) => {
          setrows(res.data.workers);
          dispatch({ type: FETCH_SUCCESS });
        })
        .catch(() => {
          setNotRows(false);
          dispatch({ type: FETCH_SUCCESS });
        });
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
  const Modaldelete = useCallback(
    (data) => () => {
      setOpenMD(true);
      setDataDelete(data);
    },
    []
  );
  const handleCloseMD = () => setOpenMD(false);

  const deleteWorker = async () => {
    const id = dataDelete.id;
    console.log(id);
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/workers/delete", {
        id,
      });
      setTimeout(() => {
        setrows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
      setOpenMD(false);
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_ERROR,
        payload:
          error?.response?.data?.error || "Error al eliminar el proveedor",
      });
    }
  };
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
            onClick={Modaldelete({ id: params.id, name: params.row.fullname })}
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
            onClick={statusWorker({
              id: params.id,
              currentStatus: params.row.status,
            })}
            label="status"
          />,
        ],
      },
    ],
    [Modaldelete, dataUpdate, dataQr, statusWorker]
  );
  function CustomNoRowsOverlay() {
    return <>{NotRows === false && <CustomNoRows />}</>;
  }
  return (
    <>
      <ModalDelete
        open={openMD}
        handleClose={handleCloseMD}
        dataDelete={dataDelete}
        deleteWorker={deleteWorker}
      />
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
              height: "620px",
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
export default Trabajadores;
