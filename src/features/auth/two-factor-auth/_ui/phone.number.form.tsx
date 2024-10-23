import React, { SetStateAction, useState } from "react";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";
import { useValidationPhone } from "../hooks/useValidationPhone";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { formatPhone } from "../helpers/formatPhone";
import { Loader } from "@/shared/ui/loader";
import { useSignInWithPhone } from "../hooks/useSignInWithPhone.ts";

// types
import { TwoFAState } from "../types.ts";

type PhoneNumberEntryProps = {
  setNextStep: React.Dispatch<SetStateAction<TwoFAState>>;
};

export default function PhoneNumberForm({
  setNextStep,
}: PhoneNumberEntryProps) {
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const validationPhone = useValidationPhone();

  const phoneSignIn = useSignInWithPhone();

  const handleSignInByPhoneNumber = async () => {
    if (!validationPhone.isValid) {
      return toast({
        variant: "destructive",
        title: validationPhone.error?.title,
        description: validationPhone.error?.message,
      });
    }

    const result = await phoneSignIn.signIn(formatPhone(phone));

    console.log(result);

    if (result) return setNextStep("VERIFY CODE ENTRY");

    return toast({
      variant: "destructive",
      title: "Проблема регистрации номера телефона",
      description: "Посмотри компонент PhoneNumberEntry",
    });
  };

  if (phoneSignIn.isPending) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-lg">Введите свой номер телефона</h2>
          <p className="text-sm w-56 text-center text-gray-700">
            Проверьте, что этот номер может SMS - мы используем их для отправки
            кода активации
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
            isValid={(inputNumber, country) =>
              validationPhone.checkValidPhone(inputNumber, country)
            }
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
              onClick={handleSignInByPhoneNumber}
              variant="noShadow"
            >
              Далее
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
