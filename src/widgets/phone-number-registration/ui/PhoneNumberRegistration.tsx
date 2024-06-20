import { PhoneNumberInput } from "@/features/phone-number-input";
import { Button } from "@/shared/ui/button";



export default function PhoneNumberRegistration() {


  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-lg">Введите свой номер телефона</h2>
        <p className="text-sm w-56 text-center text-gray-700">Проверьте, что этот номер может SMS - мы используем их для отправки кода активации</p>
      </div>
      <div className="flex flex-col items-center gap-5">
        <PhoneNumberInput />
        <div>
          <Button variant="noShadow">Далее</Button>
        </div>
      </div>
    </div>
  )
}
