import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Form, Formik } from "formik";
import IntlMessages from "@crema/utility/IntlMessages";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import jwtAxios, {
  setAuthToken,
} from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id="validation.nameRequired" />),
  lastname: yup
    .string()
    .required(<IntlMessages id="Por favor ingrese los apellidos!" />),
  company: yup
    .string()
    .required(<IntlMessages id="Por favor ingrese la empresa!" />),
  position: yup
    .string()
    .required(<IntlMessages id="Por favor ingrese el puesto!" />),
  username: yup
    .string()
    .required(<IntlMessages id="Por favor ingrese la el nombre de usuario!" />),
  password: yup
    .string()
    .min(5, <IntlMessages id="minimo 5 caracteres" />)
    .max(12, <IntlMessages id="maximo 12 caracteres" />)
    .required(<IntlMessages id="validation.passwordRequired" />),
});

const FormRegister = () => {
  const dispatch = useDispatch();
  const [work, setWork] = useState("");
  const [required, setRequired] = useState(null);
  const [message, messageSuccess] = useState(null);
  const [works, setWorks] = useState([]);
  const [open, setOpen] = useState(false);
  const [TypePass, setTypePass] = useState("password");

  const handleChange = (event) => {
    setWork(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const registerManager = async ({
    name,
    lastname,
    company,
    position,
    work,
    typeUser,
    username,
    password,
  }) => {
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/managers/register", {
        name,
        lastname,
        company,
        position,
        work,
        typeUser,
        username,
        password,
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
    jwtAxios.get("/works").then((res) => {
      const workers = res.data.works;
      setWorks(workers);
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
        <h1>Registrar Encargado</h1>
      </Box>
      <Box>
        <Formik
          validateOnChange={true}
          initialValues={{
            name: "",
            lastname: "",
            company: "",
            position: "",
            work: "",
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            if (work == "") {
              setSubmitting(true);
              setRequired("El Campo Obra Es Requerido");
              setSubmitting(false);
            } else {
              setSubmitting(true);
              registerManager({
                name: data.name,
                lastname: data.lastname,
                company: data.company,
                position: data.position,
                work: work,
                typeUser: "encargado",
                username: data.username,
                password: data.password,
              });
              setSubmitting(false);
              resetForm();
            }
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
                      placeholder={"Apellidos"}
                      name="lastname"
                      label={<IntlMessages id="Apellidos" />}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                    <AppTextField
                      placeholder={"Empresa"}
                      name="company"
                      label={<IntlMessages id="Empresa" />}
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
                <Box
                  sx={{ mb: { xs: 5, xl: 8 }, width: "50%", padding: "10px" }}
                >
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                    <AppTextField
                      placeholder={"Puesto"}
                      name="position"
                      label={<IntlMessages id="Puesto" />}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: { xs: 5, xl: 8 }, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Obra</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={work}
                      label="Obras"
                      onChange={handleChange}
                      sx={{
                        width: "100%",
                      }}
                      name="work"
                    >
                      <MenuItem disabled value="">
                        <em>Obras</em>
                      </MenuItem>
                      {works.map((work) => {
                        return (
                          <MenuItem key={work.id} value={work.id}>
                            {work.job + " " + work.batch}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box>
                    {required && (
                      <p sx={{ color: "red", fontSize: "0.7em" }}>{required}</p>
                    )}
                  </Box>
                </Box>
              </div>
              <Box>
                <h1>Cuenta de Usuario</h1>
              </Box>
              <div style={{ width: "100%", display: "flex" }}>
                <Box
                  sx={{ mb: { xs: 5, xl: 8 }, width: "50%", padding: "10px " }}
                >
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                    <AppTextField
                      placeholder={"Usuario"}
                      name="username"
                      label={<IntlMessages id="Usuario" />}
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
                <Box
                  sx={{ mb: { xs: 5, xl: 8 }, width: "50%", padding: "10px" }}
                >
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                    <AppTextField
                      placeholder={"password"}
                      name="password"
                      label={<IntlMessages id="common.password" />}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                        },
                      }}
                      type={TypePass}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() =>
                              TypePass === "password"
                                ? setTypePass("text")
                                : setTypePass("password")
                            }
                          >
                            {TypePass === "password" ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </Box>
                </Box>
              </div>
              <div>
                <Link to="/encargados">
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
