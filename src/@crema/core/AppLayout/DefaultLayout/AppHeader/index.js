import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import { toggleNavCollapsed } from "redux/actions";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useAuthMethod, useAuthUser } from "@crema/utility/AuthHooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import { orange } from "@mui/material/colors";
import { Fonts } from "shared/constants/AppEnums";

const AppHeader = ({ color }) => {
  const dispatch = useDispatch();
  const { user } = useAuthUser();
  const { logout } = useAuthMethod();
  const navCollapsed = useSelector(({ settings }) => settings.navCollapsed);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [wardsLoading, setLoadingWards] = useState(false);
  useEffect(() => {
    if (user.role === "guardia") {
      setLoadingWards(true);
    }
  }, []);
  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };
  return (
    <>
      <AppBar
        position="relative"
        color="inherit"
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          boxShadow: "none",
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          backgroundColor: "background.paper",
          display: "flex",
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
        {wardsLoading === true && (
          <>
            <Hidden lgDown>
              <Box>
                <Box
                  onClick={handleClick}
                  sx={{
                    py: 3,
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "200px",
                  }}
                  className="user-info-view"
                >
                  <Box sx={{ py: 0.5 }}>
                    {user.photoURL ? (
                      <Avatar
                        sx={{
                          height: 40,
                          width: 40,
                          fontSize: 24,
                          backgroundColor: orange[500],
                        }}
                        src={user.photoURL}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          height: 40,
                          width: 40,
                          fontSize: 24,
                          backgroundColor: orange[500],
                        }}
                      >
                        {getUserAvatar()}
                      </Avatar>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: {
                        xs: "calc(100% - 62px)",
                        xl: "calc(100% - 72px)",
                      },
                      ml: 4,
                      color: color,
                    }}
                    className="user-info"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          mb: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: 16,
                          fontWeight: Fonts.MEDIUM,
                          color: "inherit",
                        }}
                        component="span"
                      >
                        {user.displayName ? user.displayName : "Administrador"}
                      </Box>
                      <Box
                        sx={{
                          ml: 3,
                          color: "inherit",
                          display: "flex",
                        }}
                      >
                        <ExpandMoreIcon />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mt: -0.5,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "inherit",
                      }}
                    ></Box>
                  </Box>
                </Box>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {/* <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/my-profile");
                    }}
                  >
                    Mi Cuenta
                  </MenuItem> */}
                  <MenuItem onClick={logout}>Salir</MenuItem>
                </Menu>
              </Box>
            </Hidden>
            <Drawer
              anchor={"left"}
              open={navCollapsed}
              onClose={() => handleToggleDrawer()}
              style={{ position: "absolute" }}
            >
              <Box>
                <Box
                  onClick={handleClick}
                  sx={{
                    py: 3,
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "200px",
                  }}
                  className="user-info-view"
                >
                  <Box sx={{ py: 0.5 }}>
                    {user.photoURL ? (
                      <Avatar
                        sx={{
                          height: 40,
                          width: 40,
                          fontSize: 24,
                          backgroundColor: orange[500],
                        }}
                        src={user.photoURL}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          height: 40,
                          width: 40,
                          fontSize: 24,
                          backgroundColor: orange[500],
                        }}
                      >
                        {getUserAvatar()}
                      </Avatar>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: {
                        xs: "calc(100% - 62px)",
                        xl: "calc(100% - 72px)",
                      },
                      ml: 4,
                      color: color,
                    }}
                    className="user-info"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          mb: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: 16,
                          fontWeight: Fonts.MEDIUM,
                          color: "inherit",
                        }}
                        component="span"
                      >
                        {user.displayName ? user.displayName : "Administrador"}
                      </Box>
                      <Box
                        sx={{
                          ml: 3,
                          color: "inherit",
                          display: "flex",
                        }}
                      >
                        <ExpandMoreIcon />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mt: -0.5,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "inherit",
                      }}
                    ></Box>
                  </Box>
                </Box>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {/* <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/my-profile");
                    }}
                  >
                    Mi Cuenta
                  </MenuItem> */}
                  <MenuItem onClick={logout}>Salir</MenuItem>
                </Menu>
              </Box>
            </Drawer>
          </>
        )}
      </AppBar>
    </>
  );
};
export default AppHeader;

AppHeader.defaultProps = {
  variant: "",
  position: "left",
};

AppHeader.propTypes = {
  position: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
};
