import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, IconButton } from "@mui/material";
import { Form, Formik } from "formik";
import IntlMessages from "@crema/utility/IntlMessages";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
    .required(<IntlMessages id="validation.enterNewPassword" />),
  confirmPassword: yup
    .string()
    .required(<IntlMessages id="validation.reTypePassword" />),
});
const formEdit = () => {
  const navigate = useNavigate();
  const [TypePass, setTypePass] = useState("password");
  useEffect(() => {
    const id = localStorage.getItem("dataid");
    const username = localStorage.getItem("datausername");
    const id_guard = localStorage.getItem("dataid_guard");
    const name = localStorage.getItem("dataname");
    const lastname = localStorage.getItem("datalastname");
    const company = localStorage.getItem("datacompany");
    const position = localStorage.getItem("dataposition");
    setDataUpdate([
      {
        id: id,
        username: username,
        id_guard: id_guard,
        name: name,
        lastname: lastname,
        company: company,
        position: position,
      },
    ]);
  }, []);
  const dispatch = useDispatch();
  const [dataUpdate, setDataUpdate] = useState([]);
  const [work, setWork] = useState("");
  const [message, messageSuccess] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setWork(event.target.value);
    console.log(event.target.value);
  };
  console.log(work);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const updateGuard = async ({
    id,
    id_guard,
    name,
    lastname,
    company,
    position,
    username,
  }) => {
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post("/guards/update", {
        id,
        id_guard,
        name,
        lastname,
        company,
        position,
        username,
      });
      messageSuccess(data.message);
      setOpen(true);
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Editar Guardia",
      });
    }
  };
  const updatePass = async ({ id, newPassword }) => {
    try {
      const { data } = await jwtAxios.post("/guards/updatePass", {
        id,
        newPassword,
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
      {dataUpdate.map((dataEdit) => {
        return (
          <>
            <Box sx={{ mb: { xs: 5, xl: 8 }, width: "80%" }}>
              <h1>Actualizar Datos De Guardia {dataEdit.name}</h1>
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
                  updateGuard({
                    id: dataEdit.id,
                    id_guard: dataEdit.id_guard,
                    name: data.name,
                    lastname: data.lastname,
                    company: data.company,
                    position: data.position,
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
                        onClick={() => {
                          navigate("/guardias");
                        }}
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
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
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
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
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
