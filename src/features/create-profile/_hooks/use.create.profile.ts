import { createProfileAction } from "@/entities/user/_actions/create.profile";
import { useInvalidateProfile } from "@/entities/user/_queries/get.user.profile";
import { useUserProfile } from "@/entities/user/_ui/profile.provider";
import { useMutation } from "@tanstack/react-query";

export const useCreateProfile = () => {

  const invalidateProfile = useInvalidateProfile()

  const {updateProfileStatus} = useUserProfile()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProfileAction,
    onSuccess: (_, {user}) => {
      invalidateProfile(user.id)
      updateProfileStatus('checking for a profile')
    },
  });

  return {
    create: mutateAsync,
    isPending,
  };
};
