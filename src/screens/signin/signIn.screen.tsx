import React from "react";
import { useSignInSelector } from "../../storage/app.selectors";
import LoadingScreen from "../loading.screen";
import SignInForm from "./signin.form";

const trySignIn = (username: string, password: string) => {};

const SignInScreen = () => {
  const { loading } = useSignInSelector((state) => state);

  return <div>{loading ? <LoadingScreen /> : <SignInForm />}</div>;
};

export default SignInScreen;
