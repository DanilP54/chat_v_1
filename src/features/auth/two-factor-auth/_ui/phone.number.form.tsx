import React, { SetStateAction, useState } from "react";
// ui
import { FullPageLoader } from "@/shared/ui/full-page-loader.tsx";
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
import { AuthButton } from "./auth.button.tsx";

export default function PhoneNumberForm({
  setNextStep,
}: {
  setNextStep: React.Dispatch<SetStateAction<TwoFAState>>;
}) {
  const [phone, setPhone] = useState("");

  const toast = useShowToast();

  const validationPhone = useValidationPhone();

  const signIn = useSignInWithPhone({
    onSuccess: setNextStep,
  });

  const handlePhoneNumberSubmit = async () => {
    if (!validationPhone.isValid) {
      toast.showValidPhoneError(validationPhone.error);
      return;
    }

    await signIn.handle(formatPhone(phone));

    if (signIn.isError) {
      toast.showSignInPhoneError(signIn.errorMessage);
    }

  };

  if (signIn.isPending) {
    return <FullPageLoader />;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-lg text-white font-bold">
            Введите свой номер телефона
          </h2>
          <p className="text-sm w-56 text-center text-white font-mono">
            Код подтверждения будет отправлен на этот номер
          </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <PhoneInput
            data-testId={"phone-input"}
            inputProps={{
              name: "phone",
              autoFocus: true,
              required: true,
            }}
            country={"ru"}
            regions={"europe"}
            value={phone}
            onChange={setPhone}
            isValid={validationPhone.handle}
            containerStyle={{
              backgroundColor: "transparent",
            }}
            inputStyle={{
              backgroundColor: "transparent",
              color: "white",
            }}
          />
          <AuthButton text="Отправить" onClick={handlePhoneNumberSubmit} />
        </div>
        <div id="recaptcha_container"></div>
      </div>
    </>
  );
}
