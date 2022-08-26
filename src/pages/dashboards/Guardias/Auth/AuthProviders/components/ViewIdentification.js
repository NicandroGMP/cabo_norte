import React, { useEffect, useState, useRef } from "react";
import { Button, Box } from "@mui/material";
import IntlMessages from "@crema/utility/IntlMessages";
import ReactToPrint from "react-to-print";
import Identification from "./Identification";

const ViewIdentification = ({ props, dataIde = [] }) => {
  const componentRef = useRef();
  return (
    <>
      <div style={{ margin: "auto" }}>
        <Box>
          <div style={{ textAlign: "center" }}>
            <Identification Id={dataIde} ref={componentRef} />
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

export default ViewIdentification;
