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

const formEdit = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("dataid");
    const name = localStorage.getItem("dataname");
    const lastname = localStorage.getItem("datalastname");
    const company = localStorage.getItem("datacompany");
    const position = localStorage.getItem("dataposition");
    const work = localStorage.getItem("datawork");
    const work_id = localStorage.getItem("datawork_id");
    const manager_id = localStorage.getItem("datamanager_id");
    const manager = localStorage.getItem("datamanager");

    setDataUpdate([
      {
        id: id,
        name: name,
        lastname: lastname,
        company: company,
        position: position,
        work: work,
        manager: manager,
      },
    ]);
    setWork(work_id);
    setManager(manager_id);
  }, []);
  const dispatch = useDispatch();
  const [dataUpdate, setDataUpdate] = useState([]);
  const [work, setWork] = useState("");
  const [manager, setManager] = useState("");
  const [message, messageSuccess] = useState(null);
  const [works, setWorks] = useState([]);
  const [managers, setManagers] = useState([]);

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setWork(event.target.value);
  };

  const selectManager = (event) => {
    setManager(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const updateManager = async ({
    id,
    name,
    lastname,
    company,
    position,
    work,
    manager,
  }) => {
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post("/workers/update", {
        id,
        name,
        lastname,
        company,
        position,
        work,
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

  useEffect(() => {
    jwtAxios.get("/works").then((res) => {
      const workers = res.data.works;
      setWorks(workers);
    });
    jwtAxios.get("/managers").then((res) => {
      const managers = res.data.managers;
      setManagers(managers);
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
            <Box sx={{ mb: { xs: 5, xl: 8 }, width: "100%" }}>
              <h1>Actualizar Datos De Trabajador {dataEdit.name}</h1>
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
                    manager: manager,
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
                            disabled
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
                        <Box sx={{ mb: { xs: 5, xl: 8 }, minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-label">
                            Encargado
                          </InputLabel>
                          <Select
                            disabled
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            displayEmpty
                            value={manager}
                            defaultValue={1}
                            label="Obras"
                            onChange={selectManager}
                            sx={{
                              width: "100%",
                            }}
                          >
                            <MenuItem disabled value="">
                              <em>{dataEdit.manager}</em>
                            </MenuItem>
                            {managers.map((manager) => {
                              return (
                                <MenuItem
                                  key={manager.manager_id}
                                  value={manager.manager_id}
                                >
                                  {manager.fullname}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Box>
                        <Box></Box>
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
                        onClick={() => {
                          navigate("/trabajadores");
                        }}
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
