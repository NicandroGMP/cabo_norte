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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
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
});
const validationSchemaPass = yup.object({
  newPassword: yup
    .string()
    .min(5, <IntlMessages id="minimo 5 caracteres" />)
    .max(12, <IntlMessages id="maximo 12 caracteres" />)
    .required(<IntlMessages id="validation.enterNewPassword" />),
  confirmPassword: yup
    .string()
    .min(5, <IntlMessages id="minimo 5 caracteres" />)
    .max(12, <IntlMessages id="maximo 12 caracteres" />)
    .required(<IntlMessages id="validation.reTypePassword" />),
});

const formEdit = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("dataid");
    const username = localStorage.getItem("datausername");
    const id_manager = localStorage.getItem("dataid_manager");
    const name = localStorage.getItem("dataname");
    const lastname = localStorage.getItem("datalastname");
    const company = localStorage.getItem("datacompany");
    const position = localStorage.getItem("dataposition");
    const work = localStorage.getItem("datawork");
    const work_id = localStorage.getItem("datawork_id");

    setDataUpdate([
      {
        id: id,
        username: username,
        id_manager: id_manager,
        name: name,
        lastname: lastname,
        company: company,
        position: position,
        work: work,
        work_id: work_id,
      },
    ]);
    setWork(work_id);
  }, []);
  const dispatch = useDispatch();
  const [dataUpdate, setDataUpdate] = useState([]);
  const [work, setWork] = useState("");
  const [required] = useState(null);
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
  const updatePass = async ({ id, newPassword }) => {
    try {
      const { data } = await jwtAxios.post("/managers/updatePass", {
        id,
        newPassword,
      });
      console.log(data);
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
  const updateManager = async ({
    id,
    id_manager,
    name,
    lastname,
    company,
    position,
    work,
    email,
    username,
  }) => {
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post("/managers/update", {
        id,
        id_manager,
        name,
        lastname,
        company,
        position,
        work,
        email,
        username,
      });
      console.log(data);
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
      {dataUpdate.map((dataEdit) => {
        return (
          <>
            <Box sx={{ mb: { xs: 5, xl: 8 }, width: "80%" }}>
              <h1>Actualizar datos de encargado {dataEdit.name}</h1>
            </Box>
            <Box>
              <Formik
                validateOnChange={true}
                initialValues={{
                  name: dataEdit.name,
                  lastname: dataEdit.lastname,
                  company: dataEdit.company,
                  position: dataEdit.position,
                  username: dataEdit.username,
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                  setSubmitting(true);
                  updateManager({
                    id: dataEdit.id,
                    id_manager: dataEdit.id_manager,
                    name: data.name,
                    lastname: data.lastname,
                    company: data.company,
                    position: data.position,
                    work: work,
                    username: data.username,
                  });
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form
                    style={{ textAlign: "left" }}
                    noValidate
                    autoComplete="off"
                  >
                    <div style={{ width: "100%", display: "flex" }}>
                      <Box
                        sx={{
                          mb: { xs: 5, xl: 8 },
                          width: "50%",
                          padding: "10px",
                        }}
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
                        sx={{
                          mb: { xs: 5, xl: 8 },
                          width: "50%",
                          padding: "10px",
                        }}
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
                          <InputLabel id="demo-simple-select-label">
                            Obra
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            displayEmpty
                            value={work}
                            defaultValue={1}
                            label="Obras"
                            onChange={handleChange}
                            sx={{
                              width: "100%",
                            }}
                          >
                            <MenuItem disabled value="">
                              <em>{dataEdit.work}</em>
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
                            <p sx={{ color: "red", fontSize: "0.7em" }}>
                              {required}
                            </p>
                          )}
                        </Box>
                        <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                          <AppTextField
                            placeholder={"Nombre de Usuario"}
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
                    </div>
                    {/*  <Box>
                <h1>Cuenta de Usuario</h1>
              </Box>
              <div style={{ width: "100%", display: "flex" }}>
                <Box
                  sx={{ mb: { xs: 5, xl: 8 }, width: "50%", padding: "10px " }}
                >
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                    <AppTextField
                      placeholder={"email"}
                      name="email"
                      label={<IntlMessages id="common.email" />}
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
                    />
                  </Box>
                </Box>
                <Box
                  sx={{ mb: { xs: 5, xl: 8 }, width: "50%", padding: "10px" }}
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
              </div> */}
                    <div>
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
                        onClick={() => navigate("/encargados")}
                      >
                        <IntlMessages id="Regresar" />
                      </Button>
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
                        <IntlMessages id="Actualizar" />
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Box>
          </>
        );
      })}

      <div>
        {dataUpdate.map((dataEdit) => {
          return (
            <>
              <Box sx={{ mt: 10, mb: { xs: 5, xl: 8 }, width: "80%" }}>
                <h1>Cambiar contraseña</h1>
              </Box>
              <Box>
                <Formik
                  validateOnChange={true}
                  initialValues={{
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  validationSchema={validationSchemaPass}
                  onSubmit={(data, { setSubmitting, setErrors, resetForm }) => {
                    if (data.newPassword !== data.confirmPassword) {
                      setErrors({
                        confirmPassword: (
                          <IntlMessages id="validation.passwordMisMatch" />
                        ),
                      });
                      setSubmitting(false);
                    } else {
                      setSubmitting(true);
                      updatePass({
                        id: dataEdit.id,
                        newPassword: data.newPassword,
                      });
                      resetForm();
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form
                      style={{ textAlign: "left" }}
                      noValidate
                      autoComplete="off"
                    >
                      <div style={{ width: "100%" }}>
                        <Box
                          sx={{
                            mb: { xs: 5, xl: 8 },
                            width: "100%",
                            padding: "10px",
                            display: "flex",
                          }}
                        >
                          <Box
                            sx={{
                              mb: { xs: 4, lg: 6 },
                              width: "40%",
                            }}
                          >
                            <AppTextField
                              name="newPassword"
                              label={<IntlMessages id="common.newPassword" />}
                              sx={{
                                width: "100%",
                              }}
                              variant="outlined"
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

                          <Box
                            sx={{
                              width: "40%",
                              mb: { xs: 4, lg: 6 },
                              ml: 5,
                            }}
                          >
                            <AppTextField
                              name="confirmPassword"
                              label={
                                <IntlMessages id="common.retypePassword" />
                              }
                              sx={{
                                width: "100%",
                              }}
                              variant="outlined"
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
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                            sx={{
                              ml: 4,
                              minWidth: 80,
                              fontWeight: 500,
                              fontSize: 16,
                              height: 50,
                              textTransform: "capitalize",
                              padding: "4px 16px 8px",
                            }}
                          >
                            <IntlMessages id="Actualizar" />
                          </Button>
                        </Box>
                      </div>
                      {/*  <Box>
                <h1>Cuenta de Usuario</h1>
              </Box>
              <div style={{ width: "100%", display: "flex" }}>
                <Box
                  sx={{ mb: { xs: 5, xl: 8 }, width: "50%", padding: "10px " }}
                >
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                    <AppTextField
                      placeholder={"email"}
                      name="email"
                      label={<IntlMessages id="common.email" />}
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
                    />
                  </Box>
                </Box>
                <Box
                  sx={{ mb: { xs: 5, xl: 8 }, width: "50%", padding: "10px" }}
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
              </div> */}
                    </Form>
                  )}
                </Formik>
              </Box>
            </>
          );
        })}
      </div>
    </>
  );
};
export default formEdit;
