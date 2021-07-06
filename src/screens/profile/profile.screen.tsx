import { useParams } from "react-router-dom";
import { useProfileSelector } from "../../storage/app.selectors";
import PrivateProfileScreen from "./private.profile.screen";
import PublicProfileScreen from "./public.profile.screen";

interface ParamTypes {
  username: string;
}

const ProfileScreen = () => {
  const { username } = useParams<ParamTypes>();
  const profile = useProfileSelector((state) => state.profile);

  if (profile && (profile.username == username || !username)) {
    return <PrivateProfileScreen />;
  }

  return <PublicProfileScreen />;
};

export default ProfileScreen;
