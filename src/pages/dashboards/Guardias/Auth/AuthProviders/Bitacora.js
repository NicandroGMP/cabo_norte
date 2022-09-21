import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import jwtAxios from "../../../../../@crema/services/auth/jwt-auth/index";
import IntlMessages from "@crema/utility/IntlMessages";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import {
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import moment from "moment";
import BadgeIcon from "@mui/icons-material/Badge";
import ViewIdentification from "./components/ViewIdentification";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import CustomNoRows from "./components/CustomNoRows";
import { useAuthUser } from "@crema/utility/AuthHooks";

const Bitacora = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [dontExit, setDontExit] = useState(null);
  const [completeRegister, setCompleteRegister] = useState(null);
  const [totalRegister, setTotalRegister] = useState(null);
  const [value, setValue] = useState(new Date());
  const [NotRows, setNotRows] = useState(true);
  const [open, setOpen] = useState(false);
  const [dataIde, setDataIde] = useState([]);
  const { user } = useAuthUser();
  useEffect(() => {
    getBitacora();

    const interval = setInterval(() => {
      getBitacora();
    }, 30000);

    return () => clearInterval(interval);
  }, [value]);

  const getBitacora = () => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .get("/bitacoraProviders/" + moment(value).format("Y-MM-DD"))
      .then((res) => {
        setrows(res.data.bitacora);
        setCompleteRegister(res.data.success_entry);
        setTotalRegister(res.data.total_provider);
        setDontExit(res.data.dontExit.dontExit);
        dispatch({ type: FETCH_SUCCESS });
      })
      .catch(() => {
        setNotRows(false);
        dispatch({ type: FETCH_SUCCESS });
      });
  };

  const dataIdentification = useCallback(
    (data) => () => {
      setOpen(true);
      setDataIde(data);
      /* localStorage.setItem("dataQr", number);
      navigate("/trabajadores/ViewQr"); */
    },
    []
  );
  const handleClose = () => setOpen(false);
  const columns = useMemo(
    () => [
      { field: "name", headerName: "Nombre", width: 200 },
      { field: "work", headerName: "Subcondominio", width: 150 },
      { field: "service", headerName: "Servicio", width: 150 },
      { field: "num_cone", headerName: "Cono Asignado", width: 150 },
      { field: "entry_provider", headerName: "Entrada", width: 100 },
      { field: "exit_provider", headerName: "Salida", width: 200 },
      {
        field: "identification",
        type: "actions",
        headerName: "Identification",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<BadgeIcon />}
            onClick={dataIdentification(params.row)}
            label="Delete"
          />,
        ],
      },
    ],
    [dataIdentification]
  );
  function CustomNoRowsOverlay() {
    return <>{NotRows === false && <CustomNoRows />}</>;
  }
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
            <ViewIdentification dataIde={dataIde} />
          </Box>
        </Fade>
      </Modal>
      <Box sx={{ mb: 9, mt: 5 }}>
        {user.role === "guardia" && (
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
        )}
      </Box>
      <Box sx={{ mb: 10, mt: 5, display: "flex", alignItems: "center" }}>
        <Box sx={{ mr: 5, fontSize: "1rem" }}>Filtrar Bitacora por fecha:</Box>
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
    </>
  );
};
export default Bitacora;
