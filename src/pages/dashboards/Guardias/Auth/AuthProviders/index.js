import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";

import jwtAxios from "@crema/services/auth/jwt-auth";

const ProvidersIndex = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resultSearch, setResultSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [rows, setrows] = useState([]);

  useEffect(() => {
    const getWorkers = async () => {
      dispatch({ type: FETCH_START });
      try {
        await jwtAxios.get("/works/filterWorks").then((res) => {
          console.log(res.data.works);
          setrows(res.data.works);
          dispatch({ type: FETCH_SUCCESS });
        });
      } catch (error) {
        dispatch({
          type: FETCH_ERROR,
          payload: error?.response?.data?.error || "Error de Servidor",
        });
      }
    };
    getWorkers();
  }, []);
  const BitacoraProviders = () => {
    navigate("/guardias/ScanQr");
  };
  const selectWork = async () => {
    console.log("enviar aarmura");
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: "40px",
    color: theme.palette.text.secondary,
  }));

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
        <Button onClick={BitacoraProviders} color="primary" variant="outlined">
          Bitacora Proveedores
        </Button>
      </Box>

      <div
        style={{
          marginTop: "20px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: " repeat(auto-fit, minmax(23rem, 1fr))",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              {rows.map((work) => {
                return (
                  <Grid item xs={2}>
                    <Item sx={{ cursor: "pointer" }} onClick={selectWork}>
                      {work.job}
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ProvidersIndex;
