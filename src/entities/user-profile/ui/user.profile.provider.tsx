import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserProfile } from "../profile.model";
import { useCreateSessionUseCase } from "../application/create.session";
import { useAuthContext } from "@/app/providers/auth/AuthProvider";
import { FullPageSpinner } from "@/shared/ui/full.page.spinner";

function assertNonNullish<TValue>(
  value: TValue,
  message: string,
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

type UserProfileStatus =
  | "CHEСKING FOR A PROFILE"
  | "NOT PROFILE"
  | "PROFILE CREATED SUCCESS";

type UserProfileValue = {
  data: UserProfile | null;
  setData: React.Dispatch<SetStateAction<UserProfile | null>>;
  setStatus: React.Dispatch<SetStateAction<UserProfileStatus>>;
};

const UserProfileContext = createContext<UserProfileValue | undefined>(
  undefined,
);

export default function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<UserProfileStatus>(
    "CHEСKING FOR A PROFILE",
  );

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const { getCurrentUser } = useAuthContext();
  const createSession = useCreateSessionUseCase();

  useEffect(() => {
    // if (status !== "CHEСKING FOR A PROFILE") return;

    // const currentUser = getCurrentUser();

    // createSession
    //   .execute(currentUser!)
    //   .then((userProfile) => {
    //     if (userProfile) {
    //       setUserProfile(userProfile);
    //       setStatus("PROFILE CREATED SUCCESS");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setStatus("NOT PROFILE");
    //   });
  }, [status]);

  const value = useMemo(
    () => ({
      data: userProfile,
      setData: setUserProfile,
      setStatus,
    }),
    [userProfile],
  );

  const isLoading = status === 'CHEСKING FOR A PROFILE'

  return (
    <UserProfileContext.Provider value={value}>
      <FullPageSpinner show={isLoading} />
      {status === 'PROFILE CREATED SUCCESS' && children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfile = () => {
  const contextValue = useContext(UserProfileContext);

  if (!contextValue) {
    throw new Error("useUserProfile must be used within a Provider");
  }

  const { data, setData, setStatus } = contextValue;

  const getProfile = () => {
    assertNonNullish(data, "profile not found");
    return data;
  };

  const updateProfileStatus = (status: UserProfileStatus) => {
    setStatus(status);
  };

  return {
    getProfile,
    updateProfileStatus,
  };
};
