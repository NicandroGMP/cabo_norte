import React, { useState, useEffect } from "react";
import clsx from "clsx";
import AppContentView from "@crema/core/AppContentView";
import AppFixedFooter from "./AppFixedFooter";
import AppHeader from "./AppHeader";
import { useLayoutContext } from "../../../utility/AppContextProvider/LayoutContextProvider";
import DefaultLayoutWrapper from "./DefaultLayoutWrapper";
import MainContent from "./MainContent";
import { LayoutType } from "shared/constants/AppEnums";
import AppSidebar from "./AppSidebar";
import DefaultLayoutContainer from "./DefaultLayoutContainer";
import { useJWTAuth } from "@crema/services/auth/jwt-auth/JWTAuthProvider";
const DefaultLayout = () => {
  const { footer, layoutType, headerType, footerType } = useLayoutContext();
  const { user } = useJWTAuth();
  const [wardsLoading, setLoadingWards] = useState(false);

  useEffect(() => {
    if (user.type_user === "guardia") {
      setLoadingWards(true);
    }
  }, []);

  return (
    <DefaultLayoutContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <DefaultLayoutWrapper
        className={clsx("defaultLayoutWrapper", {
          appMainFooter: footer && footerType === "fluid",
          appMainFixedFooter: footer && footerType === "fixed",
          appMainFixedHeader: headerType === "fixed",
        })}
      >
        {wardsLoading === true && (
          <>
            <AppHeader />
            <AppContentView />
            <AppFixedFooter />
          </>
        )}
        {wardsLoading === false && (
          <>
            <AppSidebar />
            <MainContent>
              <AppHeader />
              <AppContentView />
              <AppFixedFooter />
            </MainContent>
          </>
        )}
      </DefaultLayoutWrapper>
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
