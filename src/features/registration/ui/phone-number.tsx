import { Button } from "@/shared/ui/button";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';
import { Action } from "../model";
import { useToast } from "@/shared/ui/use-toast";
import { useIsValidPhone } from "../lib/hooks/useIsValidPhone";

type PhoneNumberProps = {
  phone: string,
  dispatch: React.Dispatch<Action>
}

export default function PhoneNumberInput({
  phone,
  dispatch
}: PhoneNumberProps) {

  const { toast } = useToast()

  const { isValid, error, checkValidPhone } = useIsValidPhone()

  const handleChangePhone = (value: string) => {
    dispatch({ type: 'SET_PHONE_NUMBER', payload: value })
  }

  const handleClick = () => {
    if (isValid) {
      dispatch({ type: 'NEXT_STEP' })
    } else {
      toast({
        variant: 'destructive',
        title: error.title,
        description: error.description
      })
    }
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
            onChange={handleChangePhone}
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
            <Button className="bg-emerald-700" onClick={handleClick} variant="noShadow">Далее</Button>
          </div>
        </div>
      </div>
    </>
  )
}
