import React, { useEffect, useState, forwardRef } from "react";
import { Button, Box } from "@mui/material";
import IntlMessages from "@crema/utility/IntlMessages";
import QRCode from "react-qr-code";
import Logo from "./plantilla.png";

const QrCode = forwardRef((props, ref) => {
  const [dataQr, setDataQr] = useState("");
  const [dataWorker, setDataWorker] = useState([]);

  useEffect(() => {
    setDataWorker([props.Qr]);
  }, []);
  return (
    <>
      <div
        ref={ref}
        style={{
          background: "white",
          display: "block",
          textAlign: "center",
        }}
      >
        {dataWorker.map((data) => {
          console.log(data);
          return (
            <>
              <Box
                sx={{
                  width: "330px",
                  alignItems: "center",
                  margin: "auto",
                  position: "relative",
                  height: "100%",
                  marginTop: "25px",
                }}
              >
                <img src={Logo} alt="logo" />
                <Box
                  sx={{
                    width: "100%",
                    position: "absolute",
                    top: "180px",
                  }}
                >
                  {/*  <Box
                    sx={{
                      display: "flex",
                      mt: 8,
                      mb: 8,
                      justifyContent: "space-around",
                    }}
                  ></Box>
                  <Box sx={{ mb: 7 }}>
                    <h1
                      style={{
                        borderBottom: "2px solid blue",
                        width: "70%",
                        margin: "auto",
                      }}
                    >
                      Pase de Acceso
                    </h1>
                  </Box> */}
                  <QRCode value={data.register_number} size="170" />
                  <Box
                    style={{
                      marginTop: 7,
                      textAlign: "Left",
                      width: "100%",
                      marginLeft: "5px",
                    }}
                  >
                    <h4>
                      <strong>Nombre:</strong> {data.fullname}
                    </h4>
                    <h4>
                      <strong>Empresa:</strong> {data.company}
                    </h4>
                    <h4>
                      <strong>Subcondominio:</strong> {data.job} {data.batch}
                    </h4>
                    <h4>
                      <strong>Puesto:</strong> {data.position}
                    </h4>
                    <h4 style={{ marginLeft: "140px", color: "red" }}>
                      <strong>Matricula:</strong> {data.register_number}
                    </h4>
                  </Box>
                </Box>
                {/*  <Box
                  sx={{ background: "blue", width: "5%", height: "100%" }}
                ></Box> */}
              </Box>
            </>
          );
        })}
      </div>
    </>
  );
});

export default QrCode;
