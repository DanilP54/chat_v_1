import { createProfileAction } from "@/entities/user/_actions/create.profile";
import { useInvalidateProfile } from "@/entities/user/_queries/get.user.profile";
import { useUserProfile } from "@/entities/user/_ui/profile.provider";
import { useMutation } from "@tanstack/react-query";

type HookComponent = {
  onFailure: (error: Error) => void
}

export const useCreateProfile = ({
  onFailure,
}: HookComponent) => {
  
  const invalidateProfile = useInvalidateProfile();

  const { updateProfileStatus } = useUserProfile();

  const { mutate, isPending } = useMutation({
    mutationFn: createProfileAction,
    onSuccess: (_, { user }) => {
      invalidateProfile(user.id);
      updateProfileStatus("checking for a profile");
    },
    onError: (error: Error) => {
      onFailure(error);
    }
  });

  return {
    createProfile: mutate,
    isPending,
  };
};
