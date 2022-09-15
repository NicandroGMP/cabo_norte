import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import CardContent from "@mui/material/CardContent";
import jwtAxios from "@crema/services/auth/jwt-auth";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const InfWorker = (props) => {
  const [message, messageSuccess] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dataBitacora, setDataBitacora] = useState(props.dataWorker);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const addToBitacora = async () => {
    const [dataInsert] = dataBitacora;
    const name = dataInsert.name;
    const lastname = dataInsert.lastname;
    const company = dataInsert.company;
    const position = dataInsert.position;
    const work = dataInsert.job;
    const register_number = dataInsert.register_number;
    const manager = dataInsert.manager;
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post("/bitacora/register", {
        name,
        lastname,
        company,
        position,
        work,
        register_number,
        manager,
      });
      messageSuccess(data.message);
      setOpen(true);
      dispatch({ type: FETCH_SUCCESS });
      navigate("/guardias/home");
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Registrar",
      });
    }
  };
  /*  const insertExitWorker = async () => {
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post("/bitacora/update", {
        idWorker,
      });
      messageSuccess(data.message);
      setOpen(true);
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Registrar",
      });
    }
  };
 */
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Box>
        <Box sx={{ mb: { xs: 5, xl: 8 }, width: "100%", textAlign: "center" }}>
          <h3>Registrar entrada del Trabajador</h3>
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
                    {currentWorker.name.toUpperCase() +
                      " " +
                      currentWorker.lastname.toUpperCase()}
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
                    Subcondominio: {currentWorker.job}
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
          color="primary"
          onClick={addToBitacora}
          type="submit"
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
      </Box>
    </>
  );
};

export default InfWorker;
