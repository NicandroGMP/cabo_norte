import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Obras = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);

  const dataUpdate = useCallback((datas) => () => {
    const data = datas.row;
    localStorage.setItem("dataid", data.id);
    localStorage.setItem("datajob", data.job);
    localStorage.setItem("databatch", data.batch);
    localStorage.setItem("datastatus", data.status);
    navigate("/obras/edit");
  });
  useEffect(() => {
    dispatch({ type: FETCH_START });
    try {
      jwtAxios.get("/works").then((res) => {
        setrows(res.data.works);
        dispatch({ type: FETCH_SUCCESS });
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error de Servidor",
      });
    }
  }, []);

  const deleteManager = useCallback(
    (id) => () => {
      console.log(id);
    },
    []
  );

  const addNewManager = () => {
    navigate("/obras/register");
  };

  const columns = useMemo(
    () => [
      { field: "job", headerName: "Obra", width: 300 },
      { field: "batch", headerName: "Lote", width: 300 },
      { field: "status", headerName: "Estatus", width: 300 },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={dataUpdate(params)}
            label="Delete"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={deleteManager(params.id)}
            label="Delete"
          />,
        ],
      },
    ],
    [deleteManager, dataUpdate]
  );
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
          onClick={addNewManager}
          color="primary"
          variant="outlined"
          sx={{ ml: 1 }}
        >
          Registrar Obra
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};
export default Obras;
