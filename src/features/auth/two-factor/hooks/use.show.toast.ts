import { useToast } from "@/shared/ui/use-toast";

export function useShowToast() {
  const { toast } = useToast();

  const showValidPhoneError = (message: string) => {
    return toast({
      variant: "destructive",
      title: "Невалидный номер телефона",
      description: message,
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
