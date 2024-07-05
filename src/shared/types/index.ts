import { NEXT_STEP, SET_STATUS, SET_TEMP_USER_CREDENTIAL, SET_USER_ID } from "../constants/action-types";

type TempUserCredential = {
    userId: UniqueId,
    phone: string | null,
}


export type NextStepAction = { type: typeof NEXT_STEP }
export type SetStatusAction = { type: typeof SET_STATUS, payload: boolean }
export type SetUserAction = { type: typeof SET_USER_ID, payload: UniqueId }
export type SetTempUserCredential = { type: typeof SET_TEMP_USER_CREDENTIAL, payload: TempUserCredential }


export type Actions = NextStepAction | SetStatusAction | SetTempUserCredential

export type ActionCreators = {
    nextStep: () => NextStepAction,
    setStatus: (status: boolean) => SetStatusAction,
    setTempUserCredential: (credential: TempUserCredential) => SetTempUserCredential
}

