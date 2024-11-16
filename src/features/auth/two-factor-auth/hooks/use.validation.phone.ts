import { useRef } from "react";

interface ValidatePhoneError {
  title: string;
  message: string;
}

interface ValidationStatus {
  isValid: boolean;
  error: ValidatePhoneError;
}

export const useValidationPhone = () => {
  const validationStatus = useRef<ValidationStatus>({
    isValid: false,
    error: {
      title: "Неверный формат номера",
      message: "Введите номер телефона",
    },
  });

  const handleValidPhoneNumber = (
    phoneNumber: string,
    country: object,
  ): boolean => {
    const expectedLength = country.format.replace(/[^.]/g, "").length;
    const isValidFormat = phoneNumber.length === expectedLength;
    const isValidDialCode = phoneNumber.startsWith(country.dialCode);

    if (!isValidFormat || !isValidDialCode) {
      const errorMessage =
        !isValidFormat && !isValidDialCode
          ? `Номер телефона должен начинаться с ${country.dialCode} и содержать ${expectedLength} цифр`
          : !isValidFormat
            ? "Номер телефона должен содержать правильный формат"
            : `Номер телефона должен начинаться с +${country.dialCode}`;

      validationStatus.current = {
        isValid: false,
        error: { title: "Неверный формат номера", message: errorMessage },
      };
      return false;
    }

    validationStatus.current = {
      isValid: true,
      error: { title: "", message: "" },
    };

    return true;
  };

  return { ...validationStatus.current, handleValidPhoneNumber };
};
