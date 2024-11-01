import React, { createContext, useContext, useEffect, useState } from "react";
import { assertNonNullish } from "@/shared/types";
import { User, createUser } from "@/entities/user/user";
import { auth } from "@/shared/config/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";
import { Session, createSession } from "../session";
import { useMemo } from "react";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { useNavigate } from "react-router-dom";
import { createId } from "@/shared/lib/id";

type SessionStatus =
  | "authentication in progress"
  | "unauthenticated"
  | "authenticated";

type SessionValue = {
  user: User | undefined;
  setStatus: React.Dispatch<React.SetStateAction<SessionStatus>>;
};

const SessionContext = createContext<SessionValue | undefined>(undefined);

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<SessionStatus>(
    "authentication in progress",
  );

  const [session, setSession] = useState<Session | null>(null);

  const navigation = useNavigate();

  useEffect(() => {
    if (status === "unauthenticated") return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setStatus("unauthenticated");
        return navigation("/auth");
      }

      const { uid, phoneNumber } = user;

      assertNonNullish(phoneNumber, "User phone number not found");

      const createdUser = createUser(uid, phoneNumber);
      const createdSession = createSession(createId(), createdUser);

      setSession(createdSession);
      setStatus("authenticated");
      navigation("/");
    });

    return () => unsubscribe();
  }, [status]);

  const value = useMemo(
    () => ({
      user: session?.user,
      setStatus,
    }),
    [session?.user, setStatus],
  );

  return (
    <SessionContext.Provider value={value}>
      {status === "authentication in progress" ? <FullPageSpinner /> : children}
    </SessionContext.Provider>
  );
}

export const useAppSession = () => {
  const contextValue = useContext(SessionContext);

  if (!contextValue) {
    throw new Error("useAuthState must be used within a Provider");
  }

  const { user, setStatus } = contextValue;

  const getUser = () => {
    assertNonNullish(user, "Current user not found");
    return user;
  };

  const changeSessionStatus = (status: SessionStatus) => {
    setStatus(status);
  };

  return {
    getUser,
    changeSessionStatus,
  };
};
