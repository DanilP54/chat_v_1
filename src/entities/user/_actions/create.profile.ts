import { createUserProfileUseCase } from "@/entities/user/_application/use-cases/create.user.profile";
import { User } from "@/entities/user/user";
import { ProfileFormDto } from "../_application/dto";

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
