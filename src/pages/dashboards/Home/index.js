import React, { useEffect } from "react";
import { Box } from "@mui/material";

import { useJWTAuth } from "@crema/services/auth/jwt-auth/JWTAuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useJWTAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.type_user === "guardia") {
      navigate("/guardias/home");
    } else {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "70%",
            background: "#E9F6FF",
            height: "700px",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "1px 1px 100px 10px #C7E8FF",
          }}
        >
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <h1 style={{ fontSize: "2rem" }}>
              Bienvenido {user.username} al panel del {user.type_user}
            </h1>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box sx={{ width: "50%" }}>
                <img src="/assets/images/inf.jpg" alt="" />
              </Box>
              <Box sx={{ width: "50%" }}>
                <img src="/assets/images/manOfici.png" alt="" />
              </Box>
            </Box>
            <Box sx={{ mt: 10 }}>
              <h3>Control de accesso de obras cabo norte</h3>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
