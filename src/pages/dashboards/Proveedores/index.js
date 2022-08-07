import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Proveedores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setrows] = useState([]);

  const dataUpdate = useCallback((datas) => () => {
    const data = datas.row;
    console.log(data);
    localStorage.setItem("dataid", data.id);
    localStorage.setItem("dataname", data.name);
    localStorage.setItem("dataservice", data.service);
    navigate("/proveedores/edit");
  });

  useEffect(() => {
    dispatch({ type: FETCH_START });
    try {
      jwtAxios.get("/providers").then((res) => {
        setrows(res.data.providers);
        console.log(res.data.providers);
        dispatch({ type: FETCH_SUCCESS });
      });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Error de Servidor",
      });
    }
  }, []);

  const deleteWorker = useCallback(
    (id) => () => {
      console.log(id);
    },
    []
  );

  /*  const dataQr = useCallback(
    (number) => () => {
      localStorage.setItem("dataQr", number);
      navigate("/proveedores/ViewQr");
    },
    []
  ); */
  const addNewManager = () => {
    navigate("/proveedores/register");
  };

  const columns = useMemo(
    () => [
      { field: "name", headerName: "Nombre", width: 200 },
      { field: "service", headerName: "Servicio", width: 200 },

      /*   {
        field: "qr_code",
        type: "actions",
        headerName: "IDE_QR",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<QrCode2Icon />}
            onClick={dataQr(params.row.register_number)}
            label="Delete"
          />,
        ],
      }, */
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
            onClick={deleteWorker(params.id)}
            label="Delete"
          />,
        ],
      },
    ],
    [deleteWorker, dataUpdate /* dataQr */]
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
          Registrar Proveedor
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};
export default Proveedores;
