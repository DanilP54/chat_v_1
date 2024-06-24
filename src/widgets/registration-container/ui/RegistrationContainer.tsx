import {
  PhoneNumber,
  OTPVarification,
  useRegistrationContext
} from "@/features/registration";
import { EntryViewerInfo } from "@/features/registration";


export default function RegistrationContainer() {

  const { state, dispatch } = useRegistrationContext();

  if (state.step === 'step-one') {
    return (
      <div className="h-full">
        <PhoneNumber
          phone={state.phoneNumber}
          dispatch={dispatch}
        />
      </div>
    )
  }

  if (state.step === 'step-two') {
    return (
      <div className="h-full">
        <OTPVarification
          dispatch={dispatch}
        />
      </div>
    )
  }

  if (state.step === 'step-three') {
    return (
      <div className="h-full">
        <EntryViewerInfo />
      </div >
    )
  }
}
