import React, { useEffect, useState, forwardRef } from "react";
import { Button, Box } from "@mui/material";
import QRCode from "react-qr-code";

const QrCode = forwardRef((props, ref) => {
  const [dataQr, setDataQr] = useState("");
  useEffect(() => {
    const number = localStorage.getItem("dataQr");
    setDataQr(number);
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
        <QRCode value={dataQr} />
        <Box style={{ textAlign: "center", width: "100%" }}>
          <h4>{dataQr}</h4>
        </Box>
      </div>
    </>
  );
});

export default QrCode;
