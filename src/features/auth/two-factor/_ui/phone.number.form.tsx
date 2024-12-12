import React from "react";
import { FullPageLoader } from "@/shared/ui/full-page-loader.tsx";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import { useValidationPhone } from "../hooks/use.validation.phone.ts";
import { useSignInWithPhone } from "../hooks/use.sign.in.with.phone.ts";
import type { TwoFAState } from "../types.ts";
import { AuthSubmitButton } from "./auth.button.tsx";
import { useNotfication } from "@/shared/lib/notification.ts";

type ComponentProps = {
  setNextStep: React.Dispatch<React.SetStateAction<TwoFAState>>;
};

export const PhoneNumberForm = ({ setNextStep }: ComponentProps) => {
  
  const { showNotification } = useNotfication();

  const validationPhone = useValidationPhone({
    initialPhoneValue: "",
  });

  const { mutate: signIn, isPending} = useSignInWithPhone({
    onSuccess: setNextStep,
    onFailure: (error: Error) => {
      showNotification(
        {
          title: error?.message,
        },
        "error",
      );
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validationPhone.execute();

    if (!result.isValid) {
      return showNotification(
        {
          title: "Невалидный номер телефона",
          description: result.issue,
        },
        "error",
      );
    }

    signIn(result.phone);

  };

  if (isPending) {
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
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
          <PhoneInput
            inputProps={{
              name: "phone",
              autoFocus: true,
              required: true,
            }}
            value={validationPhone.phoneValue}
            onChange={(value, data, __, formattedValue) =>
              validationPhone.handleOnChangePhoneInput(value, data, formattedValue)
            }
            country={"ru"}
            containerStyle={{
              backgroundColor: "transparent",
            }}
            inputStyle={{
              backgroundColor: "transparent",
              color: "white",
            }}
          />
          <AuthSubmitButton text="Отправить" />
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </>
  );
};
