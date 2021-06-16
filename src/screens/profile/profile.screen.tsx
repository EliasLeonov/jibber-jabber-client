import { useParams } from "react-router-dom";
import { useProfileSelector } from "../../storage/app.selectors";
import PrivateProfileScreen from "./private.profile.screen";
import PublicProfileScreen from "./public.profile.screen";

interface ParamTypes {
  id: string;
}

const ProfileScreen = ({ match }) => {
  const { id } = useParams<ParamTypes>();
  const profile = useProfileSelector((state) => state.profile);

  if (profile && profile.id == id) {
    return <PrivateProfileScreen />;
  }

  return <PublicProfileScreen />;
};

export default ProfileScreen;
