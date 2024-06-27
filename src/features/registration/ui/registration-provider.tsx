import { ReactNode, useReducer } from "react";
import { INITIAL_STATE, RegistrationContext, reducer } from "../model/registration-context";

export default function RegistrationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)


  

  const value = {
    state,
    dispatch
  }


  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  )
}
