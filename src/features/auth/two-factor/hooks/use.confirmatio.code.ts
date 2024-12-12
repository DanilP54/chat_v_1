import { verifyCodeUseCase } from "@/entities/session/_application/use-cases/verify.code.use.case";
import { useAppSession } from "@/entities/session/_ui/session.provider";
import { useMutation } from "@tanstack/react-query";

type HookProps = {
  onFailure: (error: Error) => void
}



export const useConfirmationCode = ({
  onFailure
}: HookProps) => {
  
  const { changeSessionStatus } = useAppSession();

  const {isPending, mutate, isError} = useMutation({
    mutationFn: async (otp: string) => await verifyCodeUseCase.exec(otp),
    onSuccess: () => changeSessionStatus('authentication in progress'),
    onError: (error: Error) => onFailure(error)
  })
 

  return { isPending, mutate, isError};
};
