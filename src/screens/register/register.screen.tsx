import React, { createContext, useState } from "react";
import LoadingScreen from "../loading.screen";
import RegisterForm from "./register.form";

export const RegisterContext = createContext({
  loading: false,
  setLoading: (val) => {},
});

const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <RegisterContext.Provider value={{ loading, setLoading }}>
        {loading ? <LoadingScreen /> : <RegisterForm />}
      </RegisterContext.Provider>
    </div>
  );
};

export default RegisterScreen;
