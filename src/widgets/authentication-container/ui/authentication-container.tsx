import { routingAuthentication } from "./authentication-state-machine/routing.authentication.tsx";
import { useReducer } from "react";
import { AuthenticationSteps, AuthenticationState, AuthenticationActions } from "@/shared/types";

const INITIAL_STATE: AuthenticationState = {
    step: AuthenticationSteps.PHONE_NUMBER_ENTRY,
}

const reducer = (state: AuthenticationState, action: AuthenticationActions): AuthenticationState => {
    switch (action.type) {
        case AuthenticationSteps.PHONE_NUMBER_ENTRY:
            return { ...state, step: AuthenticationSteps.PHONE_NUMBER_ENTRY};
        case AuthenticationSteps.VERIFY_CODE_ENTRY:
            return { ...state, step: AuthenticationSteps.VERIFY_CODE_ENTRY};
        default:
            throw new Error('Action not found')
    }
}

export default function AuthenticationContainer() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    console.log('Локальный стейт: ', state)
    return routingAuthentication(state, dispatch)
}
