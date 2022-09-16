import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import jwtAxios from "@crema/services/auth/jwt-auth";
import { useCurrentWork } from "./SelectWorkHook";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { API_URL } from "shared/constants/AppConst";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Cones = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setrows] = useState([]);
  const [currentprovider, setProvider] = useState([]);
  const [providerModal, setProviderModal] = useState([]);
  const [currentCone, setCone] = useState(null);
  const [file, setFileName] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const { provider } = useCurrentWork();
  const [message] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openContentImg, setContentImage] = useState(false);

  useEffect(() => {
    const getCones = async () => {
      dispatch({ type: FETCH_START });
      try {
        await jwtAxios.get("/cones").then((res) => {
          console.log(res.data.cones);
          setrows(res.data.cones);
          dispatch({ type: FETCH_SUCCESS });
        });
      } catch (error) {
        dispatch({
          type: FETCH_ERROR,
          payload: error?.response?.data?.error || "Error de Servidor",
        });
      }
    };
    getCones();
    const getProvider = async () => {
      dispatch({ type: FETCH_START });
      try {
        await jwtAxios.get("/provider/" + provider).then((res) => {
          console.log(res.data.provider);
          setProvider(res.data.provider);
          dispatch({ type: FETCH_SUCCESS });
        });
      } catch (error) {
        dispatch({
          type: FETCH_ERROR,
          payload: error?.response?.data?.error || "Error de Servidor",
        });
      }
    };
    getProvider();
  }, [imageUrl, provider]);

  const BitacoraProviders = () => {
    navigate("/guardias/bitacora_proveedores");
  };

  const selectCone = async (ev) => {
    setOpen(true);
    setCone(ev.target.innerText);
    const register_num = ev.target.attributes.provider.value;
    console.log(register_num);
    if (register_num === "null") {
      setContentImage(true);
      console.log("imgcTrue");
    } else {
      await jwtAxios.post("/cones/search", { register_num }).then((res) => {
        setProviderModal(res.data.conesData);
        console.log(res.data.conesData);
        setContentImage(false);
      });
    }
  };
  const inputimage = async (ev) => {
    const [fileName] = ev.target.files;
    setFileName(ev.target.files[0]);
    setImageUrl(URL.createObjectURL(fileName));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: "40px",
    color: theme.palette.text.secondary,
  }));

  const handleClose = () => setOpen(false);
  const handleCloseAlert = () => {
    /* if (reason === "clickaway") {
      return;
    } */
    setOpenAlert(false);
  };

  const addToBitacora = async () => {
    const fechaGmt = +new Date();

    const [dataInsert] = currentprovider;
    const name = dataInsert.name;
    const work = dataInsert.job;
    const service = dataInsert.service;
    const register_num = dataInsert.register_number;
    const num_cone = currentCone;
    const identification = fechaGmt + file.name;
    dispatch({ type: FETCH_START });
    try {
      await jwtAxios.post("/bitacoraProviders/register", {
        name,
        work,
        service,
        num_cone,
        identification,
        register_num,
      });
      await jwtAxios.post("/cones/register", {
        currentCone,
        provider,
        register_num,
      });
      const dataArray = new FormData();
      dataArray.append("filename", fechaGmt + file.name);
      dataArray.append("uploadFile", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { upload } = await jwtAxios.post(
        "/bitacoraProviders/upload",
        dataArray,
        config
      );
      console.log(upload);
      navigate("/guardias/bitacora_proveedores");
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Registrar",
      });
    }
  };
  const addExitToBitacora = async () => {
    const id_cone = currentCone;
    const [dataBitacora] = providerModal;
    console.log(dataBitacora.id);
    const id_bitacora = dataBitacora.id;

    dispatch({ type: FETCH_START });
    try {
      await jwtAxios.post("/bitacoraProviders/update", {
        id_cone,
        id_bitacora,
      });
      navigate("/guardias/bitacora_proveedores");
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Actualizar",
      });
    }
  };
  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
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
              height: 350,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Box>
              <h1>Agregar identificacion</h1>
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ width: "100%", height: "100%" }}
            >
              <Box sx={{ width: "50%" }}>
                {openContentImg === true && <img src={imageUrl} />}
                {providerModal.map((provider_inf) => {
                  return (
                    <>
                      {openContentImg === false && (
                        <img
                          src={
                            API_URL +
                            "/public/uploads/" +
                            provider_inf.identification
                          }
                        />
                      )}
                    </>
                  );
                })}
              </Box>
              <Box sx={{ display: "block", width: "50%", textAlign: "center" }}>
                {openContentImg === true && (
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      background: "#33B20F",
                      margin: "auto",
                    }}
                  >
                    Subir Imagen
                    <input
                      name="image"
                      onChange={inputimage}
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                    />
                  </Button>
                )}
                {openContentImg === true && (
                  <Button
                    sx={{ mt: 10 }}
                    variant="contained"
                    color="primary"
                    onClick={addToBitacora}
                  >
                    Registrar Entrada de Proveedor
                  </Button>
                )}
                {openContentImg === false && (
                  <Button
                    sx={{ mt: 10 }}
                    variant="contained"
                    color="secondary"
                    onClick={addExitToBitacora}
                  >
                    Registrar Salida de Proveedor
                  </Button>
                )}
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={BitacoraProviders} color="primary" variant="outlined">
          Bitacora Proveedores
        </Button>
        <Button
          onClick={() => navigate("/guardias/home")}
          color="primary"
          variant="outlined"
        >
          Home
        </Button>
      </Box>

      <div
        style={{
          marginTop: "20px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            margin: "auto",
            width: "70%",
          }}
          maxWidth="sm"
        >
          <Grid
            container
            spacing={{ sm: 2, md: 2, xs: 2 }}
            columns={{ sm: 20, xs: 20, md: 50 }}
          >
            {rows.map((cones) => {
              return (
                <Grid key={cones.id} item xs={4} md={10} sm={4}>
                  <Item
                    sx={{
                      height: 80,
                      width: 80,
                      cursor: "pointer",
                      background: `${cones.status == 1 ? "#3D9E22" : "#EC2506"
                        }`,
                      color: "white",
                      display: "flex",
                      alignContent: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                    onClick={selectCone}
                    provider={
                      cones.register_number ? cones.register_number : "null"
                    }
                  >
                    {cones.num_cone}
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Cones;
