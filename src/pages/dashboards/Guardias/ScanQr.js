import { QrReader } from "react-qr-reader";
import React, { useState } from "react";
const ScanQr = (props) => {
  const [data, setData] = useState("No result");
  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "50%" }}
      />
      <p>{data}</p>
    </>
  );
};

export default ScanQr;
