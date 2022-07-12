import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import { toggleNavCollapsed } from "redux/actions";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { useJWTAuth } from "@crema/services/auth/jwt-auth/JWTAuthProvider";
import AppLogo from "../../components/AppLogo";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { user } = useJWTAuth();
  const [wardsLoading, setLoadingWards] = useState(false);
  useEffect(() => {
    if (user.type_user === "guardia") {
      setLoadingWards(true);
    }
  }, []);
  return (
    <AppBar
      position="relative"
      color="inherit"
      sx={{
        boxShadow: "none",
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        backgroundColor: "background.paper",
        width: {
          xs: `${wardsLoading === true && "100%!important"}`,
        },
      }}
      className="app-bar"
    >
      <Toolbar
        sx={{
          boxSizing: "border-box",
          minHeight: { xs: 56, sm: 70 },
          paddingLeft: { xs: 5 },
          paddingRight: { xs: 5, md: 7.5, xl: 12.5 },
        }}
      >
        <Hidden lgUp>
          <IconButton
            sx={{ color: "text.secondary" }}
            edge="start"
            className="menu-btn"
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(toggleNavCollapsed())}
            size="large"
          >
            <MenuIcon
              sx={{
                width: 35,
                height: 35,
              }}
            />
          </IconButton>
        </Hidden>
        <h1>CONTROL DE ACCESOS DE OBRAS CABO NORTE</h1>
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
