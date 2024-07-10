import React from "react";
import {
    AuthenticationActions,
    AuthenticationState,
    AuthenticationSteps,
} from "@/shared/types";
import {Verification, PhoneNumberEntry } from '@/features/authentication'


type createStatePhoneNumberEntry = (dispatch: React.Dispatch<AuthenticationActions>) => React.ReactNode
type createVerification= () => React.ReactNode



const createStatePhoneNumberEntry: createStatePhoneNumberEntry =
    ( dispatch) => <PhoneNumberEntry  dispatch={dispatch}/>

const createVerification: createVerification=
    () => <Verification />

//
// enum AuthenticationStatus {
//     IDLE = 'IDLE',
//     PENDING = 'PENDING',
//     ERROR = 'ERROR',
// }

export const routingAuthentication = (state: AuthenticationState, dispatch: React.Dispatch<AuthenticationActions>): React.ReactNode => {
    switch (state.step) {
        case AuthenticationSteps.PHONE_NUMBER_ENTRY:
            return createStatePhoneNumberEntry(dispatch);
        case AuthenticationSteps.VERIFY_CODE_ENTRY:
            return createVerification();
        default:
            throw new Error('Action not found');
    }
}