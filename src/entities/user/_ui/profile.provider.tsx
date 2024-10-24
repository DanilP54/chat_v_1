import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { assertNonNullish } from "@/shared/types";
import { UserProfile } from "../profile";
import { useAppSession } from "@/entities/session/model/session.provider";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
// import { getUserProfileUseCase } from "../_application/use-cases/get.user.profile";

type UserProfileStatus =
  | "checking for a profile"
  | "not profile"
  | "profile created";

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
    "checking for a profile",
  );
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const { getCurrentUser } = useAppSession();

  useEffect(() => {
    if (status !== "checking for a profile") return;
  }, [status]);

  const value = useMemo(
    () => ({
      data: userProfile,
      setData: setUserProfile,
      setStatus,
    }),
    [userProfile],
  );

  return (
    <UserProfileContext.Provider value={value}>
      {status === "checking for a profile" ? <FullPageSpinner /> : children}
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
