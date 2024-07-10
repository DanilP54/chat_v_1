import React, {Dispatch, ReactNode} from "react";
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


enum AuthenticationStatus {
    PHONE_NUMBER_ENTRY_IDLE = 'PHONE_NUMBER_ENTRY_IDLE',
    PHONE_NUMBER_ENTRY_PENDING = 'PHONE_NUMBER_ENTRY_PENDING',
    PHONE_NUMBER_ENTRY_ERROR = 'PHONE_NUMBER_ENTRY_ERROR',
    VERIFY_CODE_ENTRY_IDLE = 'VERIFY_CODE_IDLE',
    VERIFY_CODE_ENTRY_PENDING = 'VERIFY_CODE_ENTRY',
    VERIFY_CODE_ENTRY_ERROR = 'VERIFY_CODE_ENTRY_ERROR',
}

type StatePhoneNumberEntryIdle = {
    step: AuthenticationStatus.PHONE_NUMBER_ENTRY_IDLE
}

type StatePhoneNumberEntryPending = () => {
    step: AuthenticationStatus.PHONE_NUMBER_ENTRY_PENDING
}

type StatePhoneNumberEntryError = {
    step: AuthenticationStatus.PHONE_NUMBER_ENTRY_ERROR,
    error: Error
}

type StateVerifyCodeIdle = {
    step: AuthenticationStatus.VERIFY_CODE_ENTRY_IDLE
}

type StateVerifyCodePending = () => {
    step: AuthenticationStatus.VERIFY_CODE_ENTRY_PENDING
}

type StateVerifyCodeError = {
    step: AuthenticationStatus.VERIFY_CODE_ENTRY_ERROR,
    error: Error
}


type State =
    StatePhoneNumberEntryIdle |
    StatePhoneNumberEntryPending |
    StatePhoneNumberEntryError |
    StateVerifyCodeIdle |
    StateVerifyCodePending |
    StateVerifyCodeError

const INITIAL_STATE: State = {
    step: AuthenticationStatus.PHONE_NUMBER_ENTRY_IDLE
}




export routingAuthenticationStatus = (state: AuthenticationState, dispatch: Dispatch<>) => ()
const reducer = (state: State, Actions): State => {
    switch(state) {}
}

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