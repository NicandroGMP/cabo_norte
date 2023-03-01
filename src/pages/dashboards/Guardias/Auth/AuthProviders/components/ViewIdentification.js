import React, { useRef } from "react";
import { Button, Box } from "@mui/material";
import ReactToPrint from "react-to-print";
import Identification from "./Identification";
import { PropTypes } from "prop-types";

const ViewIdentification = ({ dataIde = [] }) => {
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

ViewIdentification.propTypes = {
  dataIde: PropTypes.array,
};

export default ViewIdentification;
