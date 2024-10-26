import { useState } from "react";
import PhoneNumberEntry from "./_ui/phone.number.entry.tsx";
import VerifyCodeEntry from "./_ui/verify.code.entry.tsx";
import type { TwoFAState } from "./types.ts";

export default function TwoFactorAuthPage() {
  const [step, setNextStep] = useState<TwoFAState>("phone number entry");

  if (step === "phone number entry") {
    return <PhoneNumberEntry setNextStep={setNextStep} />;
  }

  if (step === "verify code entry") {
    return <VerifyCodeEntry />;
  }
}
