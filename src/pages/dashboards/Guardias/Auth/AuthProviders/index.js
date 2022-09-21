import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
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
import { useSelectMethod } from "./SelectWorkHook";

const ProvidersIndex = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setrows] = useState([]);
  const { selectedWork } = useSelectMethod();

  useEffect(() => {
    const getWorkers = async () => {
      dispatch({ type: FETCH_START });
      try {
        await jwtAxios.get("/works/filterWorks").then((res) => {
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
    navigate("/guardias/bitacora_proveedores");
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
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            margin: "auto",
            width: "100%",
          }}
          maxWidth="md"
        >
          <Grid
            container
            spacing={{ sm: 2, md: 2, xs: 2 }}
            columns={{ sm: 20, xs: 20, md: 50 }}
          >
            {rows.map((work) => {
              return (
                <Grid key={work.id} item xs={4} md={10} sm={4}>
                  <Item
                    sx={{
                      cursor: "pointer",
                      height: 100,
                      width: 100,
                      display: "flex",
                      alignContent: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      background: `${work.color}`,
                      color: "white",
                      fontWeight: "700",
                      fontSize: "1rem",
                      wordBreak: "break-all",
                    }}
                    onClick={selectedWork}
                  >
                    {work.job}
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ProvidersIndex;
