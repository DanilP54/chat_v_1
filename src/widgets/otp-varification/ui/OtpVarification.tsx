import { InputOtp } from "@/features/input-otp";
import { Button } from "@/shared/ui/button";
import { formatTime } from "../lib/formatTime";

export default function OtpVarification() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-10 justify-center">


      <div className="flex flex-col items-center gap-2">
        <h2 className=" font-thin text-lg">Активация учётная записи</h2>
        <span className="text-gray-900 font-thin">{formatTime(60)}</span>
      </div>
      <div className="flex flex-col items-center gap-8">
        <InputOtp />
        <Button variant="default" className="bg-yellow-100">Активировать</Button>
      </div>
    </div>
  )
}
