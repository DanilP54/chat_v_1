import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { INITIAL_STATE, reducer } from "../model/reducer";
import type { State, Action } from "../model";

const RegistrationContext = createContext<{ state: State, dispatch: Dispatch<Action> } | undefined>(undefined)


export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext)

  if (!context) {
    throw new Error('useRegistrationContext must be used within a RegistrationProvider')
  }

  return context
}

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
