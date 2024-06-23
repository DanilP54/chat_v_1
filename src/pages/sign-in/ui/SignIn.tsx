import { OtpVarification } from "@/widgets/otp-varification";
import { PhoneNumberRegistration } from "@/widgets/phone-number-registration";
import { useState } from "react";


type Step = 'step-one' | 'step-two';

export default function SignIn() {

  const [step, setStep] = useState<Step>("step-one");

  if (step === 'step-one') {
    return (
      <div className="h-full">
        <PhoneNumberRegistration setStep={setStep} />
      </div>
    )
  }

  if (step === 'step-two') {
    return (
      <div className="h-full">
        <OtpVarification />
      </div>
    )
  }

}



