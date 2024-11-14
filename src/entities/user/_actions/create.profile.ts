import { createUserProfileUseCase } from "@/entities/user/_application/create.user.profile.use.case";
import { User } from "@/entities/user/user";

export type ProfileFormDto = {
  firstname: string;
  lastname: string;
  avatar: File | null;
};

type CreateProfileAction = {
  data: ProfileFormDto;
  user: User;
};

export const createProfileAction = async (props: CreateProfileAction) => {
  await createUserProfileUseCase.exec({
    data: props.data,
    user: props.user,
  });
};
