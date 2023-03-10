import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "shared/constants/ActionTypes";
import jwtAxios, { setAuthToken } from "./index";

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();
const JWTAuthAlgo = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);
export const useJWTAlgo = () => useContext(JWTAuthAlgo);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({ children }) => {
  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [algo, setJWTAlgo] = useState({ algo: "ssdada" });
  const dispatch = useDispatch();

  useEffect(() => {
    setJWTAlgo({ algo: "sadsad" });
    const getAuthUser = () => {
      const token = localStorage.getItem("token");
      const id_user = localStorage.getItem("id_user");

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);

      jwtAxios
        .get("/user/" + id_user)
        .then(({ data }) =>
          setJWTAuthData({
            user: data.user,
            isLoading: false,
            isAuthenticated: true,
          })
        )

        .catch(
          () => localStorage.removeItem("token"),
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          })
        );
      /*  setJWTAuthData({
        user: dataUser,
        isLoading: false,
        isAuthenticated: true,
      }); */
    };

    getAuthUser();
  }, []);

  const signInUser = async ({ username, password }) => {
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post("/login", { username, password });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id_user", data.user.id);
      setAuthToken(data.access_token);
      setJWTAuthData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Something went wrong",
      });
    }
  };

  const signUpUser = async ({ name, email, password }) => {
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post("users", { name, email, password });
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get("/auth");
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      console.log("error:", error.response.data.error);
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || "Something went wrong",
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthAlgo.Provider value={{ ...algo }}>
        <JWTAuthActionsContext.Provider
          value={{
            signUpUser,
            signInUser,
            logout,
          }}
        >
          {children}
        </JWTAuthActionsContext.Provider>
      </JWTAuthAlgo.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
