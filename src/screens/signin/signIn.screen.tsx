import React from "react";
import { useProfileSelector } from "../../storage/app.selectors";
import LoadingScreen from "../loading.screen";
import SignInForm from "./signin.form";

const SignInScreen = () => {
  const { loginRequestStatus, fetchProfileRequestStatus } = useProfileSelector(
    (state) => state
  );

  return (
    <div>
      {loginRequestStatus.loading || fetchProfileRequestStatus.loading ? (
        <LoadingScreen />
      ) : (
        <SignInForm />
      )}
    </div>
  );
};

export default SignInScreen;
