import {
  PhoneNumber,
  OTPVarification,
  ViewerInfoForm
} from "@/features/registration";
import { useReducer } from "react";
import { ActionCreators, Actions } from "@/shared/types";
import { NEXT_STEP, SET_STATUS, SET_USER_ID } from "@/shared/constants/action-types";

export type State = {
  isPending: boolean,
  step: 'step-one' | 'step-two' | 'step-three',
  userId: UniqueId | null
};

export const INITIAL_STATE: State = {
  isPending: false,
  step: 'step-one',
  userId: null
}

const actions: ActionCreators = {
  nextStep: () => ({ type: NEXT_STEP }),
  setStatus: (status) => ({ type: SET_STATUS, payload: status }),
  setUserId: (userId) => ({ type: SET_USER_ID, payload: userId })
}


export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case NEXT_STEP:
      if (state.step === 'step-one') return { ...state, step: 'step-two' }
      if (state.step === 'step-two') return { ...state, step: 'step-three' }
      return state;
    case SET_STATUS:
      return { ...state, isPending: action.payload }
    case SET_USER_ID:
      return { ...state, userId: action.payload }
    default:
      throw new Error(`Unhandled action type: ${(action as { type: string }).type}`);
  }
}


export default function RegistrationContainer() {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  if (state.step === 'step-one') {
    return (
      <div className="h-full">
        <PhoneNumber
          isPending={state.isPending}
          dispatch={dispatch}
          actions={actions}
        />
      </div>
    )
  };

  if (state.step === 'step-two') {
    return (
      <div className="h-full">
        <OTPVarification
          dispatch={dispatch}
          actions={actions}
          isPending={state.isPending}
        />
      </div>
    )
  };

  if (state.step === 'step-three') {
    return (
      <div className="h-full">
        <ViewerInfoForm
          dispatch={dispatch}
          actions={actions}
        />
      </div >
    )
  };
}
