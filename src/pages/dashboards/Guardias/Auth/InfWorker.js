import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import { Form, Formik } from "formik";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";

import { Link } from "react-router-dom";
import IntlMessages from "@crema/utility/IntlMessages";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";

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

  const addToBitacora = async ({
    name,
    lastname,
    company,
    position,
    work,
    register_number,
    manager,
  }) => {
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
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Registrar",
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
        <Box sx={{ mb: { xs: 5, xl: 8 }, width: "80%" }}>
          <h3>Registrar entrada del Trabajador</h3>
        </Box>
        <Box>
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
        </Box>
      </Box>
    </>
  );
};

export default InfWorker;
