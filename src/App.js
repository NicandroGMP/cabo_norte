import React from "react";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import AppContextProvider from "@crema/utility/AppContextProvider";
import AppThemeProvider from "@crema/utility/AppThemeProvider";
import AppStyleProvider from "@crema/utility/AppStyleProvider";
import AppLocaleProvider from "@crema/utility/AppLocaleProvider";
import AppLayout from "@crema/core/AppLayout";
import configureStore, { history } from "redux/store";
import JWTAuthProvider from "@crema/services/auth/jwt-auth/JWTAuthProvider";
//import FirebaseAuthProvider from "@crema/services/auth/firebase/FirebaseAuthProvider";
import { BrowserRouter } from "react-router-dom";
import SelectWorkProvider from "pages/dashboards/Guardias/Auth/AuthProviders/selectWorkProvider";

const store = configureStore();

const App = () => (
  <AppContextProvider>
    <Provider store={store}>
      <AppThemeProvider>
        <AppStyleProvider>
          <AppLocaleProvider>
            <BrowserRouter history={history}>
              <JWTAuthProvider>
                <SelectWorkProvider>
                  <CssBaseline />
                  <AppLayout />
                </SelectWorkProvider>
              </JWTAuthProvider>
            </BrowserRouter>
          </AppLocaleProvider>
        </AppStyleProvider>
      </AppThemeProvider>
    </Provider>
  </AppContextProvider>
);

export default App;
