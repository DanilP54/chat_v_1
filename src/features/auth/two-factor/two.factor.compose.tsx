import { useState } from "react";
import { PhoneNumberForm } from "./_ui/phone.number.form.tsx";
import { VerifyCodeForm } from "./_ui/verify.code.form.tsx";
import type { TwoFAState } from "./types.ts";

export const TwoFactorCompose = () => {
  const [step, setStep] = useState<TwoFAState>("phone number entry");

  if (step === "phone number entry") {
    return <PhoneNumberForm setNextStep={setStep} />;
  }

  if (step === "verify code entry") {
    return <VerifyCodeForm setPrevStep={setStep} />;
  }
}
