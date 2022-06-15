import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Encargados = () => {
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);

  const deleteManager = (data_id) => {
    console.log(data_id);
  };

  const addNewManager = () => {
    navigate("/dashboards/register_managers");
  };

  useEffect(() => {
    jwtAxios.get("/managers").then((res) => {
      console.log(res.data.managers);
      setrows(res.data.managers);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "company", headerName: "company", width: 90 },
    { field: "position", headerName: "position", width: 160 },
    { field: "username", headerName: "username", width: 160 },
    { field: "worker", headerName: "trabajo", width: 160 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={deleteManager(params.id)}
          label="Delete"
        />,
      ],
    },
  ];
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
          Registrar Encargado
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
export default Encargados;
