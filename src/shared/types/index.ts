import { NEXT_STEP, SET_STATUS, SET_USER_ID } from "../constants/action-types";

export type NextStepAction = { type: typeof NEXT_STEP }
export type SetStatusAction = { type: typeof SET_STATUS, payload: boolean }
export type SetUserAction = { type: typeof SET_USER_ID, payload: UniqueId }
export type Actions = NextStepAction | SetStatusAction | SetUserAction

export type ActionCreators = {
    nextStep: () => NextStepAction,
    setStatus: (status: boolean) => SetStatusAction,
    setUserId: (userId: UniqueId) => SetUserAction
}

