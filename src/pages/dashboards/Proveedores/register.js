import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import IntlMessages from "@crema/utility/IntlMessages";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useAuthUser } from "@crema/utility/AuthHooks";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id="validation.nameRequired" />),
  service: yup
    .string()
    .required(<IntlMessages id="Por favor ingrese el servicio!" />),
});

const FormRegister = () => {
  const dispatch = useDispatch();
  const [work, setWork] = useState("");
  const [message, messageSuccess] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuthUser();

  /*  const handleChange = (event) => {
    setWork(event.target.value);
  };
  const selectManager = (event) => {
    setManager(event.target.value);
  }; */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const registerWorker = async ({ name, service, work_id }) => {
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/providers/register", {
        name,
        service,
        work_id,
        manager_id: user.user_inf,
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
  useEffect(() => {
    /* jwtAxios.get("/works").then((res) => {
      const workers = res.data.works;

      setWorks(workers);
    });
    jwtAxios.get("/managers").then((res) => {
      const managers = res.data.managers;
      setManagers(managers);
    }); */

    jwtAxios.get("/manager/" + user.user_inf).then((res) => {
      const [manager] = res.data.manager;
      setWork(manager.work_id);
    });
  }, []);

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Box sx={{ mb: { xs: 5, xl: 8 }, width: "40%" }}>
        <h1>Registrar Proveedor</h1>
      </Box>
      <Box>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: "",
            service: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            registerWorker({
              name: data.name,
              service: data.service,
              work_id: work,
            });
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
              <div style={{ width: "100%", display: "flex" }}>
                <Box
                  sx={{ mb: { xs: 5, xl: 8 }, width: "50%", padding: "10px" }}
                >
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                    <AppTextField
                      placeholder={"Nombre"}
                      name="name"
                      label={<IntlMessages id="Nombre" />}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                    <AppTextField
                      placeholder={"Service"}
                      name="service"
                      label={<IntlMessages id="Service" />}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </div>
              <div>
                <Link to="/proveedores">
                  <Button
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
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: 500,
                    fontSize: 16,
                    textTransform: "capitalize",
                    padding: "4px 16px 8px",
                  }}
                >
                  <IntlMessages id="Guardar" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default FormRegister;
