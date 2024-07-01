import {
  PhoneNumber,
  OTPVarification,
  ViewerInfoForm
} from "@/features/registration";
import { useReducer } from "react";
import { ActionCreators, Actions } from "@/shared/types";
import { NEXT_STEP, SET_STATUS } from "@/shared/constants/action-types";

export type State = {
  isPending: boolean,
  step: 'step-one' | 'step-two' | 'step-three'
};

export const INITIAL_STATE: State = {
  isPending: false,
  step: 'step-one'
}

const actions: ActionCreators = {
  nextStep: () => ({ type: NEXT_STEP }),
  setStatus: (status) => ({ type: SET_STATUS, payload: status }),
}

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case NEXT_STEP:
      if (state.step === 'step-one') return { ...state, step: 'step-two' }
      if (state.step === 'step-two') return { ...state, step: 'step-three' }
      return state;
    case SET_STATUS:
      return { ...state, isPending: action.payload }
    default:
      throw new Error(`Unhandled action type: ${(action as { type: string }).type}`);
  }
}


export default function RegistrationContainer() {

  const [{ step, isPending }, dispatch] = useReducer(reducer, INITIAL_STATE)

  if (step === 'step-one') {
    return (
      <div className="h-full">
        <PhoneNumber
          isPending={isPending}
          dispatch={dispatch}
          actions={actions}
        />
      </div>
    )
  };

  if (step === 'step-two') {
    return (
      <div className="h-full">
        <OTPVarification
          dispatch={dispatch}
          actions={actions}
          isPending={isPending}
        />
      </div>
    )
  };

  if (step === 'step-three') {
    return (
      <div className="h-full">
        <ViewerInfoForm />
      </div >
    )
  };
}
