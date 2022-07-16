import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import IntlMessages from "@crema/utility/IntlMessages";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
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

const formEdit = () => {
  useEffect(() => {
    const id = localStorage.getItem("dataid");
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
  const [required, setRequired] = useState(null);
  const [message, messageSuccess] = useState(null);
  const [works, setWorks] = useState([]);
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
              <h1>Actualizar Datos De Encargado {dataEdit.name}</h1>
            </Box>
            <Box>
              <Formik
                validateOnChange={true}
                initialValues={{
                  name: dataEdit.name,
                  lastname: dataEdit.lastname,
                  company: dataEdit.company,
                  position: dataEdit.position,
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
                    username: "dasda",
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
    </>
  );
};
export default formEdit;
