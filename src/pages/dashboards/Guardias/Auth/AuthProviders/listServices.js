import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import jwtAxios from "@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomNoRows from "./components/CustomNoRows";
import { useCurrentWork, useSelectMethod } from "./SelectWorkHook";
import { BsConeStriped } from "react-icons/bs";

const ListServices = () => {
  const { batch } = useCurrentWork();
  const { getProvider } = useSelectMethod();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [NotRows, setNotRows] = useState(true);

  useEffect(() => {
    const getBatch = async () => {
      dispatch({ type: FETCH_START });
      try {
        await jwtAxios.get("/providers/services/" + batch).then((res) => {
          console.log(res.data);
          setrows(res.data.services);
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

  const deleteManager = useCallback(
    (id) => () => {
      console.log(id);
    },
    []
  );

  /* const getCones = useCallback(
    (id) => () => {
      navigate("/guardias/entradas/cones");
    },
    []
  ); */
  const returned = () => {
    navigate("/guardias/entradas/lotes");
  };

  const columns = useMemo(
    () => [
      { field: "job", headerName: "Subcondominio", width: 120 },
      { field: "name", headerName: "Nombre", width: 200 },
      { field: "service", headerName: "Servicio", width: 200 },
      {
        field: "actions",
        type: "actions",
        headerName: "Asignar Cono",
        width: 200,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<BsConeStriped />}
            onClick={getProvider(params.id)}
            label="Delete"
          />,
        ],
      },
    ],
    [getProvider]
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
        <Button
          onClick={returned}
          color="primary"
          variant="contained"
          sx={{ ml: 1 }}
        >
          Regresar
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>
    </>
  );
};
export default ListServices;
