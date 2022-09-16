import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import WorkerError from "./errorWorkerSearch";
import InfWorker from "./InfWorker";
import {
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";

import jwtAxios from "@crema/services/auth/jwt-auth";

const Guardias = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resultSearch, setResultSearch] = useState();
  const [dataSearch, setDataSearch] = useState(null);

  const Search = async ({ search }) => {
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/bitacora/search", {
        search,
      });
      setDataSearch(data.worker);
      setResultSearch(true);

      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      setResultSearch(false);
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
        <Button
          onClick={() => navigate("/guardias/salida/scanQr")}
          color="primary"
          variant="outlined"
        >
          Scanear codigo Qr
        </Button>
        <Button
          onClick={() => navigate("/guardias/bitacora_trabajadores")}
          color="primary"
          variant="outlined"
        >
          Bitacora Trabajadores
        </Button>
        <Button
          onClick={() => navigate("/guardias/home")}
          color="primary"
          variant="outlined"
        >
          Home
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
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                Search({ search: data.search });
                setSubmitting(false);
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
          {resultSearch === false && <WorkerError />}
          {dataSearch !== null && (
            <>
              <InfWorker dataWorker={dataSearch} />
            </>
          )}
        </Box>
      </div>
    </>
  );
};

export default Guardias;
