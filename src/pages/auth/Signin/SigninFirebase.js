import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import AppInfoView from "@crema/core/AppInfoView";
import { Fonts } from "shared/constants/AppEnums";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { API_URL } from "shared/constants/AppConst";

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id="validation.emailFormat" />)
    .required(<IntlMessages id="validation.emailRequired" />),
  password: yup
    .string()
    .required(<IntlMessages id="validation.passwordRequired" />),
});

const Signin = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const enviarDatos = async (url, data) => {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      haders: { "Content-type": "application/json" },
    })
      .then((response) => {
        const status = response.status;
        return response.json();
      })
      .then((data) => {
        const JWT = data.access_token;
        localStorage.setItem("JWT", JWT);
        setError(data.password);
      })
      .catch((error) => {
        console.log("ocurrio un error en la peticion", error);
      });
  };
  /* 
  const setErrors = (error) => {
    console.log(error);
    const message = setError(error);
    return message;
  }; */
  const onGoToForgetPassword = () => {
    navigate("/forget-password", { tab: "firebase" });
  };

  const url_login = API_URL + "auth/login";

  const { messages } = useIntl();

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
              email: "gama98s11@gmail.com",
              password: "12345789",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              //consulta a la api//
              enviarDatos(url_login, data);
              //final de consulta a la api//
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    placeholder={messages["common.email"]}
                    name="email"
                    label={<IntlMessages id="common.email" />}
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
                    type="password"
                    placeholder={messages["common.password"]}
                    label={<IntlMessages id="common.password" />}
                    name="password"
                    variant="outlined"
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox sx={{ ml: -3 }} />
                    <Box
                      component="span"
                      sx={{
                        color: "grey.500",
                      }}
                    >
                      <IntlMessages id="common.rememberMe" />
                    </Box>
                  </Box>
                  <Box
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
                  </Box>
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

        <Box
          sx={{
            color: "grey.500",
            mb: { xs: 5, md: 7 },
          }}
        >
          <span style={{ marginRight: 4 }}>
            <IntlMessages id="common.dontHaveAccount" />
          </span>
          <Box
            component="span"
            sx={{
              fontWeight: Fonts.MEDIUM,
              "& a": {
                color: (theme) => theme.palette.primary.main,
                textDecoration: "none",
              },
            }}
          >
            <Link to="/signup">
              <IntlMessages id="common.signup" />
            </Link>
          </Box>
        </Box>

        <AppInfoView />
      </Box>
    </>
  );
};

export default Signin;
