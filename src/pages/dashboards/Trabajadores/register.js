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

const FormRegister = () => {
  const dispatch = useDispatch();
  const [work, setWork] = useState("");
  const [works, setWorks] = useState([]);
  const [required, setRequired] = useState(null);
  const [message, messageSuccess] = useState(null);
  const [manager, setManager] = useState("");
  const [managers, setManagers] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuthUser();

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

  const registerWorker = async ({
    name,
    lastname,
    company,
    position,
    work,
    manager,
  }) => {
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/workers/register", {
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

    jwtAxios.get("/manager/" + user.user_inf).then((res) => {
      const manager = res.data.manager;

      manager.map((current_manager) => {
        setWork(current_manager.work_id);
        setManager(current_manager.manager_id);
      });
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
        <h1>Registrar Trabajador</h1>
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
            manager: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            if (work == "" || manager == "") {
              setSubmitting(true);
              setRequired("El Campo Obra Es Requerido");
              setSubmitting(false);
            } else {
              setSubmitting(true);
              registerWorker({
                name: data.name,
                lastname: data.lastname,
                company: data.company,
                position: data.position,
                work: work,
                manager: manager,
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
                      disabled
                      name="work"
                    >
                      <MenuItem disabled value="">
                        <em>Obras</em>
                      </MenuItem>
                      {works.map((work) => {
                        return (
                          <MenuItem disabled key={work.id} value={work.id}>
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
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={manager}
                      label="Encargados"
                      onChange={selectManager}
                      sx={{
                        width: "100%",
                      }}
                      name="manager"
                    >
                      <MenuItem disabled value="">
                        <em>Encargados</em>
                      </MenuItem>
                      {managers.map((manager) => {
                        return (
                          <MenuItem
                            disabled
                            key={manager.manager_id}
                            value={manager.manager_id}
                          >
                            {manager.fullname}
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
              <div>
                <Link to="/trabajadores">
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
