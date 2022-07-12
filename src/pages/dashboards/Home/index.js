import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AdminHome from "./AdminHomeLayout";
import GuardHome from "./GuardHomeLayout";
import { useJWTAuth } from "@crema/services/auth/jwt-auth/JWTAuthProvider";

const Home = () => {
  const { user } = useJWTAuth();
  const [wardsLoading, setLoadingWards] = useState(false);

  useEffect(() => {
    if (user.type_user === "guardia") {
      setLoadingWards(true);
    }
  }, []);
  console.log(wardsLoading);
  return (
    <>
      {wardsLoading === true && <GuardHome />}
      {wardsLoading === false && <AdminHome />}
    </>
  );
};

export default Home;
