import { NEXT_STEP, SET_STATUS, SET_TEMP_USER_CREDENTIAL, SET_USER_ID } from "../constants/action-types";

type TempUserCedential = {
    userId: UniqueId,
    phone: string | null,
}


export type NextStepAction = { type: typeof NEXT_STEP }
export type SetStatusAction = { type: typeof SET_STATUS, payload: boolean }
export type SetUserAction = { type: typeof SET_USER_ID, payload: UniqueId }
export type SetTempUserCedential = { type: typeof SET_TEMP_USER_CREDENTIAL, payload: TempUserCedential }


export type Actions = NextStepAction | SetStatusAction | SetTempUserCedential

export type ActionCreators = {
    nextStep: () => NextStepAction,
    setStatus: (status: boolean) => SetStatusAction,
    setTempUserCedential: (credential: TempUserCedential) => SetTempUserCedential
}

