import React from "react";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import AppInfoView from "@crema/core/AppInfoView";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IntlMessages from "@crema/utility/IntlMessages";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import { Fonts } from "shared/constants/AppEnums";
import AuthWrapper from "../../auth/AuthWrapper";
import AppLogo from "@crema/core/AppLayout/components/AppLogo";
import { useDispatch } from "react-redux";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";

const UpdatePass = () => {
  const validationSchema = yup.object({
    password: yup
      .string()
      .required(<IntlMessages id="validation.enterNewPassword" />),
    cpassword: yup
      .string()
      .required(<IntlMessages id="validation.reTypePassword" />),
  });
  const dispatch = useDispatch();

  const updatePassword = async ({ password, cookie }) => {
    dispatch({ type: FETCH_START });

    try {
      const { data } = await jwtAxios.post("/updatePassword", {
        password,
        cookie,
      });
      document.cookie = "stringCookie=; expires=0";
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload:
          error?.response?.data?.error || "error al actulizar el password",
      });
    }
  };

  return (
    <>
      <AuthWrapper>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AppLogo />
          </Box>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 1.5,
              color: (theme) => theme.palette.text.primary,
              fontWeight: Fonts.SEMI_BOLD,
              fontSize: { xs: 14, xl: 16 },
            }}
          >
            <IntlMessages id="common.resetPassword" />
          </Typography>

          <Formik
            validateOnChange={true}
            initialValues={{
              password: "",
              cpassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setErrors, resetForm, setSubmitting }) => {
              if (data.password !== data.cpassword) {
                setErrors({
                  cpassword: <IntlMessages id="validation.passwordMisMatch" />,
                });
              } else {
                const string_cookie = document.cookie.match(
                  new RegExp("(^|)stringCookie=([^;]+)")
                )[2];
                setSubmitting(true);
                resetForm();
                updatePassword({
                  password: data.password,
                  cookie: string_cookie,
                });
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form noValidate autoComplete="off">
                <Box
                  sx={{
                    mb: 6,
                    fontSize: { xs: 16, sm: 18 },
                  }}
                >
                  <Typography>
                    <IntlMessages id="common.verificationMessage" />
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mb: { xs: 4, lg: 6 },
                  }}
                >
                  <AppTextField
                    name="password"
                    label={<IntlMessages id="common.newPassword" />}
                    sx={{
                      width: "100%",
                    }}
                    variant="outlined"
                    type="password"
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 4, lg: 6 },
                  }}
                >
                  <AppTextField
                    name="cpassword"
                    label={<IntlMessages id="common.retypePassword" />}
                    sx={{
                      width: "100%",
                    }}
                    variant="outlined"
                    type="password"
                  />
                </Box>

                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  color="primary"
                  type="submit"
                  sx={{
                    fontWeight: Fonts.REGULAR,
                    textTransform: "capitalize",
                    fontSize: 16,
                    minWidth: 160,
                  }}
                >
                  <IntlMessages id="common.resetMyPassword" />
                </Button>
              </Form>
            )}
          </Formik>
          <AppInfoView />
        </Box>
      </AuthWrapper>
    </>
  );
};

export default UpdatePass;
