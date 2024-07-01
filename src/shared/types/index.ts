import { NEXT_STEP, SET_STATUS } from "../constants/action-types";

export type NextStepAction = { type: typeof NEXT_STEP }
export type SetStatusAction = { type: typeof SET_STATUS, payload: boolean }

export type Actions = NextStepAction | SetStatusAction

export type ActionCreators = {
    nextStep: () => NextStepAction,
    setStatus: (status: boolean) => SetStatusAction
}

