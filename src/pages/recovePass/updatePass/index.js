import React from "react";
import UpdatePass from "./UpdatePass";
import { FETCH_SUCCESS } from "shared/constants/ActionTypes";
import { useDispatch } from "react-redux";
import jwtAxios from "../../../@crema/services/auth/jwt-auth/index";
import { useState } from "react";
import Error403 from "../../errorPages/Error403";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const url = window.location.search;
  const urlParametro = new URLSearchParams(url);
  const key = urlParametro.get("Key");

  const string_cookie = document.cookie.match(
    new RegExp("(^|)stringCookie=([^;]+)")
  )[2];
  const [authPage, ExpirePage] = useState(false);

  const verifiExpire = async (key) => {
    try {
      const { data } = await jwtAxios.get(
        "/getPageExpire/" + key + "/" + string_cookie
      );
      ExpirePage(data);
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      ExpirePage(false);
    }
  };
  verifiExpire(key);

  if (authPage === true) {
    return (
      <>
        <UpdatePass />
      </>
    );
  } else {
    return (
      <>
        <Error403 />
      </>
    );
  }
};

export default UpdatePassword;
