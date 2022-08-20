import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useCurrentWork, useSelectMethod } from "./SelectWorkHook";
import { Box, Button, Icon } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import jwtAxios from "@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomNoRows from "./components/CustomNoRows";

const ListBatch = () => {
  const { work } = useCurrentWork();
  const { getServices } = useSelectMethod();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [NotRows, setNotRows] = useState(true);

  useEffect(() => {
    const getBatch = async () => {
      dispatch({ type: FETCH_START });
      try {
        await jwtAxios.get("/works/search/" + work).then((res) => {
          console.log(res.data);
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
    getBatch();
  }, []);

  const returned = async () => {
    navigate("/guardias/entradas/proveedores");
  };

  const columns = useMemo(
    () => [
      { field: "job", headerName: "Subcondominio", width: 400 },
      { field: "batch", headerName: "Lote", width: 800 },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<KeyboardDoubleArrowRightIcon />}
            onClick={getServices(params.id)}
            label="Lote"
          />,
        ],
      },
    ],
    [getServices]
  );
  function CustomNoRowsOverlay() {
    return <>{NotRows === false && <CustomNoRows />}</>;
  }
  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 1,
        }}
      >
        <Button onClick={returned} color="secondary" variant="contained">
          Regresar
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default ListBatch;
