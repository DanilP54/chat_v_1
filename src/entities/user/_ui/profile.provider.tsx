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
import { useAppSession } from "@/entities/session/_ui/session.provider";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../_queries/get.user.profile";

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

  const [status, setStatus] = useState<UserProfileStatus>("checking for a profile");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const navigate = useNavigate();

  const { getUser } = useAppSession();

  const userId = getUser().id

  const {data, isPending} = useQuery({
    ...getUserProfile(userId),
    retry: 0,
    enabled: !!userId
  })


  useEffect(() => {
    if (isPending) return

    if (!data) {
      setStatus('not profile')
      return navigate('/create-profile')
    }
    setUserProfile(data)
    setStatus('profile created')
    return navigate('/')

  }, [data, isPending])

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
      {status === 'checking for a profile' ? <FullPageSpinner /> : children}
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
