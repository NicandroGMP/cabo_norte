import { QrReader } from "react-qr-reader";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { useDispatch } from "react-redux";
import WorkerError from "./errorWorkerSearch";
import InfWorker from "./InfWorker";
import { FETCH_START, FETCH_SUCCESS } from "shared/constants/ActionTypes";
import IntlMessages from "@crema/utility/IntlMessages";
import jwtAxios from "@crema/services/auth/jwt-auth";

const ScanQr = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataSearch, setDataSearch] = useState(null);
  const [entryWorkerExist, setEntryWorkerExist] = useState(false);
  const [resultSearch, setResultSearch] = useState();
  return (
    <>
      <Box>
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
              if (result) {
                setData(result?.text);
                dispatch({ type: FETCH_START });
                jwtAxios
                  .get("/workers/scanQr/" + result?.text)
                  .then((res) => {
                    if (res.data.stateExit.length > 0) {
                      setEntryWorkerExist(true);
                    }
                    setDataSearch(res.data.worker);
                    setResultSearch(true);
                    dispatch({ type: FETCH_SUCCESS });
                  })
                  .catch(() => {
                    setResultSearch(false);
                    setDataSearch(null);
                    dispatch({ type: FETCH_SUCCESS });
                  });
              }

              if (error) {
                console.info(error);
              }
            }}
            style={{ width: "50%" }}
            constraints={{ facingMode: "enviroment" }}
            autoFocus={true}
          />
        )}
        {resultSearch === false && <WorkerError />}
        {dataSearch !== null && (
          <>
            <InfWorker
              dataWorker={dataSearch}
              workerRegister={entryWorkerExist}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default ScanQr;
