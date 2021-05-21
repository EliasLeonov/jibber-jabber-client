import React from "react";
import { useRegisterSelector } from "../../storage/app.selectors";
import LoadingScreen from "../loading.screen";
import RegisterForm from "./register.form";

const RegisterScreen = () => {
  const loading = useRegisterSelector((state) => state.loading);

  return <div>{loading ? <LoadingScreen /> : <RegisterForm />}</div>;
};

export default RegisterScreen;
