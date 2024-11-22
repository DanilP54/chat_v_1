import { useRef } from "react";

export interface ValidationStatus {
  isValid: boolean;
  error: string;
}

export const useValidationPhone = () => {
  
  const state = useRef<ValidationStatus>({
    isValid: false,
    error: "",
  });

  const handle = (phoneNumber: string, country: object): boolean => {

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

      state.current = {
        isValid: false,
        error: errorMessage,
      };

      return false;
    }

    state.current = {
      isValid: true,
      error: "",
    };

    return true;
  };

  return { handle, ...state.current };
};
