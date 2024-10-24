import { User } from "../user/user";

type SessionId = string;
type SessionStartTime = Date;
type SessionEndTime = Date;

export type Session = {
  sessionId: SessionId;
  startTime: SessionStartTime;
  endTime?: SessionEndTime;
  currentUser: User;
};

export function createSession(sessionId: string, currentUser: User): Session {
  return {
    sessionId,
    startTime: new Date(),
    currentUser,
  };
}
