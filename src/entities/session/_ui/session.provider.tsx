import React, { createContext, useContext, useEffect, useState } from "react";
import { User, createUser } from "@/entities/user/user";
import { auth } from "@/shared/config/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";
import { Session, createSession } from "./entities";
import { nanoid } from "nanoid";
import { useMemo } from "node_modules/react-resizable-panels/dist/declarations/src/vendor/react";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { useNavigate } from "react-router-dom";

function assertNonNullish<TValue>(
  value: TValue,
  message: string,
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

type SessionStatus =
  | "AUTHENTICATION IN PROGRESS"
  | "UNAUTHENTICATED"
  | "AUTHENTICATED";

type SessionValue = {
  currentUser: User | undefined;
  setStatus: React.Dispatch<React.SetStateAction<SessionStatus>>;
};

const SessionContext = createContext<SessionValue | undefined>(undefined);

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<SessionStatus>(
    "AUTHENTICATION IN PROGRESS",
  );
  const [session, setSession] = useState<Session | null>(null);

  const navigation = useNavigate();

  useEffect(() => {
    if (status === "UNAUTHENTICATED") return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setStatus("UNAUTHENTICATED");
        return navigation("/auth");
      }

      const { uid, phoneNumber } = user;

      assertNonNullish(phoneNumber, "User phone number not found");

      const createdUser = createUser(uid, phoneNumber);
      const createdSession = createSession(nanoid(), createdUser);

      setSession(createdSession);
      setStatus("AUTHENTICATED");
    });

    return () => unsubscribe();
  }, [status]);

  const value = useMemo(
    () => ({
      currentUser: session?.currentUser,
      setStatus,
    }),
    [session?.currentUser, setStatus],
  );

  return (
    <SessionContext.Provider value={value}>
      {status === "AUTHENTICATION IN PROGRESS" ? <FullPageSpinner /> : children}
    </SessionContext.Provider>
  );
}

export const useAppSession = () => {
  const contextValue = useContext(SessionContext);

  if (!contextValue) {
    throw new Error("useAuthState must be used within a Provider");
  }

  const { currentUser, setStatus } = contextValue;

  const getCurrentUser = () => {
    assertNonNullish(currentUser, "Current user not found");
    return currentUser;
  };

  const changeSessionStatus = (status: SessionStatus) => {
    setStatus(status);
  };

  return {
    getCurrentUser,
    changeSessionStatus,
  };
};
