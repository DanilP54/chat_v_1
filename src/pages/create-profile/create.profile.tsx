import UserProfileProvider from "@/entities/user/_ui/profile.provider";
import { CreateProfileForm } from "@/features/create-profile";

export default function CreateProfilePage() {
  return (
    <UserProfileProvider>
      <CreateProfileForm />
    </UserProfileProvider>
  );
}
