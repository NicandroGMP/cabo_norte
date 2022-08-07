import React, { useEffect, useState, forwardRef } from "react";
import { Button, Box } from "@mui/material";
import IntlMessages from "@crema/utility/IntlMessages";
import QRCode from "react-qr-code";

const QrCode = forwardRef((props, ref) => {
  const [dataQr, setDataQr] = useState("");
  const [dataWorker, setDataWorker] = useState([]);

  useEffect(() => {
    console.log(props.Qr);
    setDataWorker([props.Qr]);
  }, []);
  return (
    <>
      <div
        ref={ref}
        style={{
          background: "white",
          padding: "16px",
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
                  width: "100%",
                  height: "300px",
                  background: "#77B7D5",
                  padding: "10px",
                }}
              >
                <QRCode value={data.register_number} />
                <Box style={{ textAlign: "center", width: "100%" }}>
                  <h4>{data.register_number}</h4>
                </Box>
              </Box>
            </>
          );
        })}
      </div>
    </>
  );
});

export default QrCode;
