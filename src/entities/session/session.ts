import { User } from "../user/user";

type SessionId = string;
type SessionStartTime = Date;
type SessionEndTime = Date;

export type Session = {
  sessionId: SessionId;
  startTime: SessionStartTime;
  endTime?: SessionEndTime;
  user: User;
};

export function createSession(sessionId: string, user: User): Session {
  return {
    sessionId,
    startTime: new Date(),
    user,
  };
}
