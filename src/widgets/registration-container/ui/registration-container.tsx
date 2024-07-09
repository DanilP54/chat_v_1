import { OTPVerification, PhoneNumber } from "@/features/registration";
import { Loader } from "@/shared/ui/loader";
import { Dispatch, SetStateAction, useReducer } from "react";


export enum AuthenticationSteps {
    PHONE_NUMBER_ENTRY = 'PHONE_ENTRY',
    VERIFY_CODE_ENTRY = 'VERIFY_CODE_ENTRY',
}

type ActionPhoneNumber = { type: AuthenticationSteps.PHONE_NUMBER_ENTRY }
type ActionVerifyCode = { type: AuthenticationSteps.VERIFY_CODE_ENTRY }
type Actions = ActionPhoneNumber | ActionVerifyCode


type StatePhoneNumber = {
    step: AuthenticationSteps.PHONE_NUMBER_ENTRY
}

type StateVerifyCode = {
    step: AuthenticationSteps.VERIFY_CODE_ENTRY
}


type State = StatePhoneNumber | StateVerifyCode

const INITIAL_STATE: State = {
    step: AuthenticationSteps.PHONE_NUMBER_ENTRY,
}

type StateCreator<T extends State> = (state: T, dispatch: Dispatch<Actions>) => React.ReactNode

const createStatePhoneNumber: StateCreator<StatePhoneNumber> = (state, dispatch) => <PhoneNumber state={state} dispatch={dispatch} />
const createVerifyCode: StateCreator<StateVerifyCode> = (state, dispatch) => <OTPVerification state={state} dispatch={dispatch} />

const routingAuthentication = (state: State, dispatch: Dispatch<Actions>): React.ReactNode => {
    switch (state.step) {
        case AuthenticationSteps.PHONE_NUMBER_ENTRY:
            return createStatePhoneNumber(state, dispatch);
        case AuthenticationSteps.VERIFY_CODE_ENTRY:
            return createVerifyCode(state, dispatch);
        default:
            throw new Error('Action not found');

    }
}



const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case AuthenticationSteps.PHONE_NUMBER_ENTRY:
            return { ...state, step: AuthenticationSteps.PHONE_NUMBER_ENTRY };
        case AuthenticationSteps.VERIFY_CODE_ENTRY:
            return { ...state, step: AuthenticationSteps.VERIFY_CODE_ENTRY };
        default:
            throw new Error('Action not found')
    }
}



export default function RegistrationContainer() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    return routingAuthentication(state, dispatch)
}
