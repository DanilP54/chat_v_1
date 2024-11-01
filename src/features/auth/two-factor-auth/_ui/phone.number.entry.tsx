import React, { SetStateAction, useState } from "react";
// ui
import { Button } from "@/shared/ui/button";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner.tsx";
// lib
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
// hooks
import { useValidationPhone } from "../hooks/use.validation.phone.ts";
import { useSignInWithPhone } from "../hooks/use.sign.in.with.phone.ts";
import { useShowToast } from "../hooks/use.show.toast.ts";
// helpers
import { formatPhone } from "../helpers/format.phone.ts";
// type
import type { TwoFAState } from "../types.ts";

export default function PhoneNumberEntry({
  setNextStep,
}: {
  setNextStep: React.Dispatch<SetStateAction<TwoFAState>>;
}) {
  const [phone, setPhone] = useState("");

  const { showSignInPhoneError, showValidPhoneError } = useShowToast();
  const {
    handleValidPhoneNumber,
    isValid: phoneIsValid,
    error: validError,
  } = useValidationPhone();
  const { signIn, isPending, error: signInError } = useSignInWithPhone();

  const handlePhoneNumberSubmit = async () => {
    if (!phoneIsValid) {
      showValidPhoneError(validError);
      return;
    }

    try {
      await signIn(formatPhone(phone));
      setNextStep("verify code entry");
    } catch {
      showSignInPhoneError(signInError);
    }
  };

  if (isPending) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-lg">Введите свой номер телефона</h2>
          <p className="text-sm w-56 text-center text-gray-700">
            Код подтверждения будет отправлен на этот номер
          </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <PhoneInput
            inputProps={{
              name: "phone",
              autoFocus: true,
              required: true,
            }}
            country={"ru"}
            regions={"europe"}
            value={phone}
            onChange={(value) => setPhone(value)}
            isValid={(inputNumber, country) => {
              return handleValidPhoneNumber(inputNumber, country);
            }}
            containerStyle={{
              backgroundColor: "transparent",
            }}
            inputStyle={{
              backgroundColor: "transparent",
              color: "white",
            }}
          />
          <div id="recaptcha_container"></div>
          <div>
            <Button
              id="send-phone-number"
              className="bg-emerald-700"
              onClick={handlePhoneNumberSubmit}
            >
              Далее
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
