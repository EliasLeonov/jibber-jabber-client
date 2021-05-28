import React from "react";
import { Redirect } from "react-router-dom";
import { useRegisterSelector } from "../../storage/app.selectors";
import LoadingScreen from "../loading.screen";
import RegisterForm from "./register.form";

const RegisterScreen = () => {
  const { loading, succes } = useRegisterSelector((state) => state);

  if (succes) {
    return <Redirect to="/signin" />;
  }

  return <div>{loading ? <LoadingScreen /> : <RegisterForm />}</div>;
};

export default RegisterScreen;
