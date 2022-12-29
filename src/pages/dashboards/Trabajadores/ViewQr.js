import React, { useRef } from "react";
import { Button, Box } from "@mui/material";
import ReactToPrint from "react-to-print";
import QrCode from "./QrCode";

const ViewQr = ({ dataQr = [] }) => {
  const componentRef = useRef();
  return (
    <>
      <div style={{ margin: "auto", height: "100%" }}>
        <Box sx={{ height: "100%" }}>
          <div style={{ textAlign: "center", height: "100%" }}>
            <QrCode Qr={dataQr} ref={componentRef} />
            <ReactToPrint
              trigger={() => (
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  sx={{
                    minWidth: 160,
                    fontWeight: 500,
                    fontSize: 16,
                    textTransform: "capitalize",
                    padding: "4px 16px 8px",
                    margin: "auto",
                  }}
                >
                  Imprimir
                </Button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </Box>
      </div>
    </>
  );
};

export default ViewQr;
