import { RegistrationProvider } from "@/features/registration";
import { Toaster } from "@/shared/ui/toaster";
import { RegistrationContainer } from "@/widgets/registration-container";


export default function SignIn() {

  return (
    <RegistrationProvider>
      <RegistrationContainer />
      <Toaster />
    </RegistrationProvider>
  )
}