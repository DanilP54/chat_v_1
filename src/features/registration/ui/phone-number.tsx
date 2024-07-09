import React, { SetStateAction, useState } from "react";
// shared
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";
// hooks
import { useValidationPhone } from "../lib/hooks/useValidationPhone";
// api
import { authService } from "@/entities/session/services/auth.service";
// lib
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';
import { formatPhone } from "../lib/formatPhone";
import { Loader } from "@/shared/ui/loader";

export enum AuthenticationSteps {
  PHONE_NUMBER_ENTRY = 'PHONE_ENTRY',
  VERIFY_CODE_ENTRY = 'VERIFY_CODE_ENTRY',
}

type StatePhoneNumberEntry = {
  step: AuthenticationSteps.PHONE_NUMBER_ENTRY
}

type StateVerifyCodeEntry = {
  step: AuthenticationSteps.VERIFY_CODE_ENTRY
}


type State = StatePhoneNumberEntry | StateVerifyCodeEntry

type ActionPhoneNumber = { type: AuthenticationSteps.PHONE_NUMBER_ENTRY }
type ActionVerifyCode = { type: AuthenticationSteps.VERIFY_CODE_ENTRY }
type Actions = ActionPhoneNumber | ActionVerifyCode

type PhoneNumberInputProps = {
  state: State,
  dispatch: React.Dispatch<Actions>
}

export default function PhoneNumberInput({ state, dispatch }: PhoneNumberInputProps) {

  const { toast } = useToast()
  const [phone, setPhone] = useState('')
  const { isValid, error, checkValidPhone } = useValidationPhone()
  const [isPending, setIsPending] = useState(false)


  const submitPhoneNumber = async () => {
    if (!isValid) {
      return toast({
        variant: 'destructive',
        title: error.title,
        description: error.description
      })
    }
    setIsPending(true)

    const res = await authService.signInWithPhone(formatPhone(phone))

    if (!res) {
      setIsPending(false)
      return toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Возникла ошибка при регистрации номера'
      })
    }
    dispatch({ type: AuthenticationSteps.VERIFY_CODE_ENTRY })
  }

  if (isPending) <Loader />


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
            isValid={(inputNumber, country) => checkValidPhone(inputNumber, country)}
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
