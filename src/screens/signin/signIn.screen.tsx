import React from "react";
import { useProfileSelector } from "../../storage/app.selectors";
import LoadingScreen from "../loading.screen";
import SignInForm from "./signin.form";

const SignInScreen = () => {
  const { loading } = useProfileSelector((state) => state.loginRequestStatus);

  return <div>{loading ? <LoadingScreen /> : <SignInForm />}</div>;
};

export default SignInScreen;
