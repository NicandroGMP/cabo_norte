import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { useJWTAuth } from "@crema/services/auth/jwt-auth/JWTAuthProvider";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useJWTAuth();
  const [wardsLoading, setLoadingWards] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.type_user === "guardia") {
      navigate("/guardias");
    } else {
      navigate("/home");
    }
  }, []);
};

export default Home;
