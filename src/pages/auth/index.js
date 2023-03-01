import React from "react";

import Signin from "./Signin";
import Signup from "./Signin";

const ForgotPassword = React.lazy(() => import("./ForgetPassword"));
const ConfirmSignupAwsCognito = React.lazy(() =>
  import("./ConfirmSignupAwsCognito")
);
const ResetPasswordAwsCognito = React.lazy(() =>
  import("./ResetPasswordAwsCognito")
);
export const authRouteConfig = [
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/confirm-signup",
    element: <ConfirmSignupAwsCognito />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordAwsCognito />,
  },
];
