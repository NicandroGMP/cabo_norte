import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import IntlMessages from "@crema/utility/IntlMessages";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import AppInfoView from "@crema/core/AppInfoView";
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
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const validationSchema = yup.object({
  work: yup.string().required(<IntlMessages id="Por favor ingrese la Obra!" />),
  batch: yup
    .string()
    .required(<IntlMessages id="Por favor ingrese el Lote!" />),
});

const FormRegister = () => {
  useEffect(() => {
    const id = localStorage.getItem("dataid");
    const job = localStorage.getItem("datajob");
    const batch = localStorage.getItem("databatch");
    const status = localStorage.getItem("datastatus");
    const color = localStorage.getItem("datacolor");

    setDataUpdate([
      {
        id: id,
        job: job,
        batch: batch,
        status: status,
        color: color,
      },
    ]);
    setStatus(status);
  }, []);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [dataUpdate, setDataUpdate] = useState([]);
  const [work, setWork] = useState("");
  const [required, setRequired] = useState(null);
  const [message, messageSuccess] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const registerWork = async ({ work, batch, status, id, color }) => {
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/works/update", {
        id,
        work,
        batch,
        status,
        color,
      });
      messageSuccess(data.message);
      setOpen(true);
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error al Editar",
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
            <Box sx={{ mb: { xs: 5, xl: 8 }, width: "40%" }}>
              <h1>Editar Obra</h1>
            </Box>
            <Box>
              <Formik
                validateOnChange={true}
                initialValues={{
                  work: dataEdit.job,
                  batch: dataEdit.batch,
                  color: dataEdit.color,
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  registerWork({
                    id: dataEdit.id,
                    work: data.work,
                    batch: data.batch,
                    status: status,
                    color: data.color,
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
                            placeholder={"Obra"}
                            name="work"
                            label={<IntlMessages id="Obra" />}
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
                            placeholder={"Lote"}
                            name="batch"
                            label={<IntlMessages id="Lote" />}
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
                            placeholder={"Color"}
                            name="color"
                            label={<IntlMessages id="Color" />}
                            variant="outlined"
                            type="color"
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
                      <Link to="/obras">
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
              <AppInfoView />
            </Box>
          </>
        );
      })}
    </>
  );
};

export default FormRegister;
