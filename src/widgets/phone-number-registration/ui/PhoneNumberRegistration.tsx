import { PhoneNumberInput } from "@/features/phone-number-input";
import { Button } from "@/shared/ui/button";
import React, { SetStateAction } from "react";

type Step = 'step-one' | 'step-two';

export default function PhoneNumberRegistration({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<Step>>
}) {


  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-lg">Введите свой номер телефона</h2>
        <p className="text-sm w-56 text-center text-gray-700">Проверьте, что этот номер может SMS - мы используем их для отправки кода активации</p>
      </div>
      <div className="flex flex-col items-center gap-5">
        <PhoneNumberInput />
        <div>
          <Button onClick={() => setStep('step-two')} variant="noShadow">Далее</Button>
        </div>
      </div>
    </div>
  )
}
