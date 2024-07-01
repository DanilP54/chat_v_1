import React, { useState } from "react";
// shared
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";
// model
// hooks
import { useValidationPhone } from "../lib/hooks/useValidationPhone";
// api
import { signInWithPhone } from "../api/requests";
// lib
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';
import { DotLoader } from 'react-spinners'
import { ActionCreators, Actions } from "@/shared/types";

type PhoneNumberInputProps = {
  isPending: boolean,
  dispatch: React.Dispatch<Actions>
  actions: ActionCreators
}

export default function PhoneNumberInput({ actions, dispatch, isPending }: PhoneNumberInputProps) {

  const { toast } = useToast()

  const [phone, setPhone] = useState('')
  const { isValid, error, checkValidPhone } = useValidationPhone()


  const submitPhoneNumber = async () => {
    if (!isValid) {
      return toast({
        variant: 'destructive',
        title: error.title,
        description: error.description
      })
    }

    const res = await signInWithPhone(phone)

    if (!res) {
      return toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Возникла ошибка при регистрации номера'
      })
    }

    dispatch(actions.nextStep())
  }

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <DotLoader color="hsla(239, 100%, 35%, 1)" />
      </div>
    )
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
            inputProps={{
              name: 'phone',
              autoFocus: true,
              required: true
            }}
            country={'ru'}
            regions={'europe'}
            value={phone}
            onChange={(value) => setPhone(value)}
            isValid={(inputNumber, country) => {
              const result = checkValidPhone(inputNumber, country)
              return result
            }}
            containerStyle={{
              backgroundColor: 'transparent'
            }}
            inputStyle={{
              backgroundColor: 'transparent',
              color: 'white'
            }}
          />
          <div>
            <Button id="send-phone-number" className="bg-emerald-700" onClick={submitPhoneNumber} variant="noShadow">Далее</Button>
          </div>
        </div>
      </div>
    </>
  )
}
