import React, { useEffect, useState, forwardRef } from "react";
import { Button, Box } from "@mui/material";

const Identification = forwardRef((props, ref) => {
  const [dataIde, setDataIde] = useState([]);

  useEffect(() => {
    console.log(props.Id);
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
          console.log(data);
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
                    "http://localhost/cabo_norte_api_rest/public/uploads/" +
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

export default Identification;