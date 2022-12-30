import React, { useEffect, useState, forwardRef } from "react";
import { Box } from "@mui/material";
import { PropTypes } from "prop-types";
import { API_URL } from "shared/constants/AppConst";

const Identification = forwardRef((props, ref) => {
  const [dataIde, setDataIde] = useState([]);

  useEffect(() => {
    setDataIde([props.Id]);
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
        {dataIde.map((data) => {
          return (
            <>
              <Box
                sx={{
                  width: "50%",
                  height: "300px",
                  alignItems: "center",
                  margin: "auto",
                  position: "relative",
                }}
              >
                <img
                  src={
                    API_URL + "public/uploads/" +
                    data.identification
                  }
                />
              </Box>
            </>
          );
        })}
      </div>
    </>
  );
});

Identification.propTypes = {
  Id: PropTypes.any,
};
Identification.displayName = 'Identification';

export default Identification;
