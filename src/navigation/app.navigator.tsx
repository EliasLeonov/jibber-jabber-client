import { useSignInSelector } from "../storage/app.selectors";
import HomeNavigator from "./home.navigator";
import SignInNavigator from "./signin.navigator";

const AppNavigator = () => {
  const hasToken = useSignInSelector((state) => state.token.length > 0);

  return <div>{hasToken ? <HomeNavigator /> : <SignInNavigator />}</div>;
};

export default AppNavigator;
