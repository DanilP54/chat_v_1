import { useUserProfile } from "@/entities/user/_ui/profile.provider.tsx";
import ProfileForm from "./_ui/profile.form.tsx";
import { useAppSession } from "@/entities/session/_ui/session.provider.tsx";

export default function CreateProfileForm() {
  const { getUser } = useAppSession();
  const { updateProfileStatus } = useUserProfile();

  const handleOnSuccess = () => {
    updateProfileStatus("checking for a profile");
  };

  return <ProfileForm onSuccess={handleOnSuccess} user={getUser()} />;
}
