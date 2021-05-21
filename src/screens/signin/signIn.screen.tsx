import React, { createContext, useState } from "react";
import LoadingScreen from "../loading.screen";
import SignInForm from "./signin.form";

export const SignInContext = createContext({
  loading: false,
  setLoading: (val) => {},
});

const trySignIn = (username: string, password: string) => {};

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <SignInContext.Provider value={{ loading, setLoading }}>
        {loading ? <LoadingScreen /> : <SignInForm />}
      </SignInContext.Provider>
    </div>
  );
};

export default SignInScreen;
