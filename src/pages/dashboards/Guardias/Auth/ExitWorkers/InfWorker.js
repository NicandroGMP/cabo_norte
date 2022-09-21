import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";

import Card from "@mui/material/Card";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import CardContent from "@mui/material/CardContent";
import jwtAxios from "@crema/services/auth/jwt-auth";
import { PropTypes } from "prop-types";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const InfWorker = (props) => {
  const [message, messageSuccess] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dataBitacora] = useState(props.dataWorker);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {}, []);

  const insertExitWorker = async () => {
    const [dataExit] = dataBitacora;
    const id = dataExit.id;
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post("/bitacora/update", {
        id,
      });
      messageSuccess(data.message);
      setOpen(true);
      dispatch({ type: FETCH_SUCCESS });
      navigate("/guardias/home");
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Registrar Salida",
      });
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Box>
        <Box sx={{ mb: { xs: 5, xl: 8 }, width: "100%" }}>
          <h3>Registrar Salida del Trabajador</h3>
        </Box>
        {/*  <Box>
          {dataBitacora.map((current_worker) => {
            return (
              <Formik
                key={current_worker.register_number}
                validateOnChange={true}
                initialValues={{
                  name: current_worker.name,
                  register_number: current_worker.register_number,
                  lastname: current_worker.lastname,
                  company: current_worker.company,
                  position: current_worker.position,
                }}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  addToBitacora({
                    name: data.name,
                    lastname: data.lastname,
                    company: data.company,
                    position: data.position,
                    work: current_worker.job,
                    register_number: data.register_number,
                    manager: current_worker.manager,
                  });
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: "flex", mb: 9 }}>
                          <AppTextField
                            name="name"
                            id="outlined-read-only-input"
                            label="Nombre"
                            variant="filled"
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <AppTextField
                            name="register_number"
                            id="outlined-read-only-input"
                            label="Numero de Registro"
                            variant="filled"
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <AppTextField
                            name="lastname"
                            id="outlined-read-only-input"
                            label="Apellidos"
                            variant="filled"
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <AppTextField
                            name="company"
                            id="outlined-read-only-input"
                            label="Empresa"
                            variant="filled"
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addToBitacora}
                      type="submit"
                      disabled={isSubmitting}
                      sx={{
                        minWidth: 100,
                        fontWeight: 500,
                        fontSize: 16,
                        textTransform: "capitalize",
                        padding: "4px 16px 8px",
                      }}
                    >
                      Registrar Entrada
                    </Button>
                  </Form>
                )}
              </Formik>
            );
          })}
        </Box> */}
        <Box sx={{ width: "100%", margin: "auto" }}>
          {dataBitacora.map((currentWorker) => {
            return (
              <CardContent
                key={currentWorker.register_number}
                sx={{
                  margin: "auto",
                  width: "600px",
                  height: "300px",
                }}
              >
                <Card
                  sx={{
                    margin: "auto",
                    background: "#77B7D5",
                    width: "100%",
                    height: "100%",
                    padding: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      mt: 9,
                      textAlign: "left",
                      color: "white",
                      fontSize: "1.7rem",
                      fontWeight: "700",
                    }}
                  >
                    {currentWorker.fullname.toUpperCase()}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      textAlign: "left",
                      color: "#0B5171",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    Puesto: {currentWorker.position}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      textAlign: "left",
                      color: "#0B5171",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    Subcondominio: {currentWorker.work}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      textAlign: "left",
                      color: "#0B5171",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    Empresa: {currentWorker.company}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      textAlign: "left",
                      color: "#0B5171",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    Encargado: {currentWorker.manager}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      textAlign: "right",
                      color: "#0B5171",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                    }}
                  >
                    Matricula: {currentWorker.register_number}
                  </Typography>
                </Card>
              </CardContent>
            );
          })}
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={insertExitWorker}
          type="submit"
          sx={{
            marginLeft: "5px",
            minWidth: 100,
            fontWeight: 500,
            fontSize: 16,
            textTransform: "capitalize",
            padding: "4px 16px 8px",
          }}
        >
          Registrar Salida
        </Button>
      </Box>
    </>
  );
};

InfWorker.propTypes = {
  dataWorker: PropTypes.array,
};

export default InfWorker;
