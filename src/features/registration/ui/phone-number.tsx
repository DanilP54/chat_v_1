import { Button } from "@/shared/ui/button";
import React from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';
import { Action } from "../model";

type PhoneNumberProps = {
  phone: string,
  dispatch: React.Dispatch<Action>
}


export default function PhoneNumberInput({
  phone,
  dispatch
}: PhoneNumberProps) {


  const handleChangePhone = (value: string) => {
    dispatch({ type: 'SET_PHONE_NUMBER', payload: value })
  }


  return (
    <>
      <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-lg">Введите свой номер телефона</h2>
          <p className="text-sm w-56 text-center text-gray-700">Проверьте, что этот номер может SMS - мы используем их для отправки кода активации</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <PhoneInput
            country={'ru'}
            value={phone}
            onChange={handleChangePhone}
          />
          <div>
            <Button onClick={() => dispatch({ type: 'NEXT_STEP' })} variant="noShadow">Далее</Button>
          </div>
        </div>
      </div>
    </>
  )
}
