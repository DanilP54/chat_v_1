import { useState } from "react";
import { verifyCodeUseCase } from "@/entities/session/_application/use-cases/verify.code.use.case";
import { toast } from "@/shared/ui/use-toast";
import { useAppSession } from "@/entities/session/_ui/session.provider";

type ConfirmProps = {
  onSuccess?: () => void;
  onError: (message: string | null) => ReturnType<typeof toast>;
}

export const useConfirmationCode = ({
  onSuccess,
  onError
}: ConfirmProps) => {
  
  const [isPending, setIsPending] = useState<boolean>(false);
  const { changeSessionStatus } = useAppSession();
  
  const handle = async (otp: string) => {
    
    setIsPending(true);

    try {
      await verifyCodeUseCase.exec(otp);
      changeSessionStatus('authentication in progress')
    } catch (err) {
      
      console.log(err);
      
      if(err instanceof Error) {
        return onError(err.message)
      }

      onError("An error occurred otp")
      
    } finally {
      setIsPending(false);
    }
  };

  return {
    isPending,
    handle,
  };
};
