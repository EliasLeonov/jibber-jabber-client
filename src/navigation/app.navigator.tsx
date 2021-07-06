import { useProfileSelector } from "../storage/app.selectors";
import HomeNavigator from "./home.navigator";
import SignInNavigator from "./signin.navigator";

const AppNavigator = () => {
  const hasProfile = useProfileSelector((state) => state?.profile);

  return <div>{hasProfile ? <HomeNavigator /> : <SignInNavigator />}</div>;
};

export default AppNavigator;
