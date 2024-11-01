import ProfileForm from "./_ui/profile.form.tsx";
import { useAppSession } from "@/entities/session/_ui/session.provider.tsx";

export default function CreateProfileForm() {
  const { getUser } = useAppSession();

  return <ProfileForm  user={getUser()} />;
}
