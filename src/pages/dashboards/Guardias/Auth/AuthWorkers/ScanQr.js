import { QrReader } from "react-qr-reader";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Snackbar } from "@mui/material";

import { useDispatch } from "react-redux";
import WorkerError from "./errorWorkerSearch";
import InfWorker from "./InfWorker";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { Link } from "react-router-dom";
import IntlMessages from "@crema/utility/IntlMessages";
import jwtAxios from "@crema/services/auth/jwt-auth";
const ScanQr = (props) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataSearch, setDataSearch] = useState(null);
  const [resultSearch, setResultSearch] = useState(false);
  const [statusWorker, setStatusWorker] = useState(false);
  const [buttonExit, setButtonExit] = useState(false);
  const [idWorker, setIdWorker] = useState("");
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <>
      <Box sx={{ mb: 9 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/guardias/entradas/trabajadores")}
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
          <IntlMessages id="Cancelar" />
        </Button>
      </Box>
      {data === null && (
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              dispatch({ type: FETCH_START });
              try {
                jwtAxios.get("/workers/scanQr/" + result?.text).then((res) => {
                  setDataSearch(res.data.worker);
                  dispatch({ type: FETCH_SUCCESS });
                });
              } catch (error) {
                dispatch({
                  type: FETCH_ERROR,
                  payload: error?.response?.data?.error || "Error al Registrar",
                });
              }
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "50%" }}
          constraints={{ facingMode: "enviroment" }}
          autoFocus={true}
        />
      )}

      {dataSearch !== null && (
        <>
          <InfWorker
            dataWorker={dataSearch}
            idWorker={idWorker}
            statusWorker={statusWorker}
            setButton={buttonExit}
          />
        </>
      )}
    </>
  );
};

export default ScanQr;
