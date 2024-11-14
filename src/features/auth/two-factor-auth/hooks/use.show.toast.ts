import { useToast } from "@/shared/ui/use-toast";

interface ValidatePhoneError {
  title: string;
  message: string;
}

export function useShowToast() {
  const { toast } = useToast();

  const showValidPhoneError = (error: ValidatePhoneError) => {
    return toast({
      variant: "destructive",
      title: error.title,
      description: error.message,
    });
  };

  const showSignInPhoneError = (message: string | null) => {
    return toast({
      variant: "destructive",
      title: "Регистрация телефона",
      description: message || "Неизвестная ошибка",
    });
  };

  const showVerifyCodeError = (message: string | null) => {
    return toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
  };

  return {
    showValidPhoneError,
    showSignInPhoneError,
    showVerifyCodeError,
  };
}
