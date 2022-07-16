import React, { useEffect, useState, forwardRef } from "react";
import { Button, Box } from "@mui/material";
import IntlMessages from "@crema/utility/IntlMessages";
import QRCode from "react-qr-code";

const QrCode = forwardRef((props, ref) => {
  const [dataQr, setDataQr] = useState("");
  useEffect(() => {
    const id = localStorage.getItem("dataid");
    console.log(id);
    setDataQr(id);
  }, []);
  return (
    <div
      ref={ref}
      style={{
        background: "white",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <QRCode value={dataQr} />
    </div>
  );
});

export default QrCode;
