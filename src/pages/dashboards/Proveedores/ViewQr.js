import React, { useRef } from "react";
import { Button, Box } from "@mui/material";
import IntlMessages from "@crema/utility/IntlMessages";
import ReactToPrint from "react-to-print";
import QrCode from "./QrCode";

const ViewQr = () => {
  const componentRef = useRef();
  return (
    <>
      <Box>View QR </Box>
      <div>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{
              minWidth: 160,
              fontWeight: 500,
              fontSize: 16,
              textTransform: "capitalize",
              padding: "4px 16px 8px",
            }}
          >
            <IntlMessages id="Regresar" />
          </Button>
          <div>
            <ReactToPrint
              trigger={() => <button>Print this out!</button>}
              content={() => componentRef.current}
            />
            <QrCode ref={componentRef} />
          </div>
        </Box>
      </div>
    </>
  );
};

export default ViewQr;
