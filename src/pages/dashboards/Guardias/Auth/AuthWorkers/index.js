import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import WorkerError from "./errorWorkerSearch";
import InfWorker from "./InfWorker";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";

import jwtAxios from "@crema/services/auth/jwt-auth";

const Guardias = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resultSearch, setResultSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [statusWorker, setStatusWorker] = useState(false);
  const [buttonExit, setButtonExit] = useState(false);
  const [idWorker, setIdWorker] = useState("");
  const viewSacan = () => {
    navigate("/guardias/ScanQr");
  };
  const BitacoraWorkers = () => {
    navigate("/guardias/bitacora_trabajadores");
  };
  const BitacoraProviders = () => {
    navigate("/guardias/ScanQr");
  };
  const Search = async ({ search }) => {
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/workers/search", {
        search,
      });
      const [worker] = data.stateExit;
      setIdWorker(worker.id);
      console.log(data.stateExit);
      setResultSearch(false);
      setDataSearch(data.worker);
      if (!data.stateExit.length) {
        setButtonExit(false);
        setStatusWorker(true);
      } else {
        setButtonExit(true);
        setStatusWorker(false);
      }
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      setResultSearch(true);
      setDataSearch(null);
    }
  };
  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={viewSacan} color="primary" variant="outlined">
          Scanear codigo Qr
        </Button>
        <Button onClick={BitacoraWorkers} color="primary" variant="outlined">
          Bitacora Trabajadores
        </Button>
        <Button onClick={BitacoraProviders} color="primary" variant="outlined">
          Bitacora Proveedores
        </Button>
      </Box>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: " repeat(auto-fit, minmax(23rem, 1fr))",
        }}
      >
        <Box sx={{ mb: 5, mt: 5, textAlign: "center", width: "100%" }}>
          <h1>Buscar Trabajador</h1>
          <Box sx={{ mb: 5 }}>
            <Formik
              validateOnChange={true}
              initialValues={{
                search: "",
              }}
              onSubmit={(data, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                Search({ search: data.search });
                setSubmitting(false);
                //resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box
                    sx={{
                      mb: { xs: 5, xl: 8 },
                      width: "100%",
                      padding: "10px",
                      borderRight: 1,
                      borderColor: "divider",
                      p: 1,
                    }}
                  >
                    <Box
                      sx={{
                        mb: { xs: 5, xl: 8 },
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <AppTextField
                        placeholder={"Search"}
                        name="search"
                        label={"Search"}
                        variant="outlined"
                        sx={{
                          width: "80%",
                          "& .MuiInputBase-input": {
                            fontSize: 14,
                          },
                        }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
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
                        Buscar
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          {resultSearch && <WorkerError />}
          {dataSearch !== null && (
            <>
              <InfWorker
                idWorker={idWorker}
                statusWorker={statusWorker}
                dataWorker={dataSearch}
                setButton={buttonExit}
              />
            </>
          )}
        </Box>
      </div>
    </>
  );
};

export default Guardias;
