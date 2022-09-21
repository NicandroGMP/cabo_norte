import React from "react";
import { Button, IconButton, Box } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import AppInfoView from "@crema/core/AppInfoView";
import IntlMessages from "@crema/utility/IntlMessages";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import { useAuthMethod } from "@crema/utility/AuthHooks";
import { Fonts } from "shared/constants/AppEnums";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = yup.object({
  username: yup
    .string()
    .required(<IntlMessages id="el campo usuario es requerido" />),
  password: yup
    .string()
    .required(<IntlMessages id="validation.passwordRequired" />),
});

const SigninJwtAuth = () => {
  const [error] = useState(null);
  const [TypePass, setTypePass] = useState("password");
  const { signInUser } = useAuthMethod();
  /* const { user } = useAuthUser();
  const onGoToForgetPassword = () => {
    navigate("/forget-password", { tab: "jwtAuth" });
  }; */

  return (
    <>
      {error && (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              signInUser({
                username: data.username,
                password: data.password,
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    placeholder={"usuario"}
                    name="username"
                    label={<IntlMessages id="usuario" />}
                    variant="outlined"
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                  <AppTextField
                    placeholder={"contraseña"}
                    label={<IntlMessages id="contraseña" />}
                    name="password"
                    variant="outlined"
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        fontSize: 14,
                      },
                    }}
                    type={TypePass}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() =>
                            TypePass === "password"
                              ? setTypePass("text")
                              : setTypePass("password")
                          }
                        >
                          {TypePass === "password" ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  {/*  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox color="primary" sx={{ ml: -3 }} />
                    <Box
                      component="span"
                      sx={{
                        color: "grey.500",
                      }}
                    >
                      <IntlMessages id="common.rememberMe" />
                    </Box>
                  </Box> */}
                  {/* <Box
                    component="span"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: Fonts.MEDIUM,
                      cursor: "pointer",
                      display: "block",
                      textAlign: "right",
                    }}
                    onClick={onGoToForgetPassword}
                  >
                    <IntlMessages id="common.forgetPassword" />
                  </Box> */}
                </Box>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      minWidth: 160,
                      fontWeight: Fonts.REGULAR,
                      fontSize: 16,
                      textTransform: "capitalize",
                      padding: "4px 16px 8px",
                    }}
                  >
                    <IntlMessages id="common.login" />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
        <AppInfoView />
      </Box>
    </>
  );
};

export default SigninJwtAuth;
