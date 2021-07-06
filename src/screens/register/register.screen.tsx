import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  useAppDispatch,
  useRegisterSelector,
} from "../../storage/app.selectors";
import { reset } from "../../storage/register.reducer";
import LoadingScreen from "../loading.screen";
import RegisterForm from "./register.form";

const RegisterScreen = () => {
  const { loading, success } = useRegisterSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  if (success) {
    console.log("here");
    return <Redirect to="/signin" />;
  }

  return <div>{loading ? <LoadingScreen /> : <RegisterForm />}</div>;
};

export default RegisterScreen;
