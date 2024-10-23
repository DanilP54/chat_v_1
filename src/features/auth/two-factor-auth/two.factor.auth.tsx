import { useState } from "node_modules/react-resizable-panels/dist/declarations/src/vendor/react";
import PhoneNumberForm from "./_ui/phone.number.form.tsx";
import VerifyCodeForm from "./_ui/verify.code.form.tsx";

// types
import { TwoFAState } from "./types.ts";

export default function TwoFactorAuthPage() {
  const [step, setNextStep] = useState<TwoFAState>("PHONE NUMBER ENTRY");

  if (step === "PHONE NUMBER ENTRY") {
    return <PhoneNumberForm setNextStep={setNextStep} />;
  }

  if (step === "VERIFY CODE ENTRY") {
    return <VerifyCodeForm />;
  }
}
