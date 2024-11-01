import { createProfileAction } from "@/entities/user/_actions/create.profile";
import { useInvalidateProfile } from "@/entities/user/_queries/get.user.profile";
import { useMutation } from "@tanstack/react-query";

export const useCreateProfile = () => {

  const invalidateProfile = useInvalidateProfile()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProfileAction,
    onSuccess: (profile) => {
      console.log(profile)
      // await invalidateProfile(user.id)
    },
  });

  return {
    create: mutateAsync,
    isPending,
  };
};
