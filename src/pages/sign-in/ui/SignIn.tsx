import { RegistrationProvider } from "@/features/registration";
import { RegistrationContainer } from "@/widgets/registration-container";


export default function SignIn() {

  return (
    <RegistrationProvider>
      <RegistrationContainer />
    </RegistrationProvider>
  )
}