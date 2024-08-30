"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
// import AuthProvider from "./AuthProvider";
import { persistor, store } from "@/redux/store";
import SubProvider from "./Subprovider";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  ////----important(TO PREVENT HYDRATION ERROR)
  const [isRendering, setIsRendering] = useState<boolean>(false);
  useEffect(() => {
    setIsRendering(true);
  }, []);
  if (!isRendering) {
    return "";
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-center" richColors={true} />
        {/* <AuthProvider>{children}</AuthProvider> */}
        <SubProvider>{children}</SubProvider>
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
