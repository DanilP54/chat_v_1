import { useCallback, useState } from "react";

export interface ValidationState {
  isValid: boolean;
  issue?: string;
  phone?: string;
}

type PhoneData = {
  formattedPhone: string;
  dialCode: string;
  format: string;
};

export const useValidationPhone = ({
  initialPhoneValue
}: {initialPhoneValue: string}) => {

  const [phoneValue, setPhoneValue] = useState(initialPhoneValue) 
  
  const [phoneData, setPhoneData] = useState<PhoneData>({
    formattedPhone: "",
    dialCode: "",
    format: "",
  });

  const handleOnChangePhoneInput = (value: string, data: any, formattedValue: string) => {
    const { dialCode, format } = data;
    
    setPhoneData({
      dialCode,
      format,
      formattedPhone: formattedValue,
    });

    setPhoneValue(value)
  };

  const execute = () => {
    const formatErrorMessage = checkCorrectFormat(
      phoneData.format,
      phoneData.formattedPhone,
    );
    const dialCodeErrorMessage = checkCorrectDialCode(
      phoneData.dialCode,
      phoneData.formattedPhone,
    );

    if (formatErrorMessage) {
      return  validationResult(false, formatErrorMessage);
    }

    if (dialCodeErrorMessage) {
      return  validationResult(false, dialCodeErrorMessage);
    }

    return validationResult(true, phoneData.formattedPhone);
  }

  return { execute, handleOnChangePhoneInput, phoneValue };
};

function checkCorrectFormat(format: string, phoneNumber: string) {
  if (!(phoneNumber.length === format.length) || phoneNumber.length === 0) {
    return "Номер телефона должен содержать правильный формат";
  }
}

function checkCorrectDialCode(dialCode: string, phoneNumber: string) {
  if (!phoneNumber.startsWith(`+${dialCode}`)) {
    return `Номер телефона должен начинаться с +${dialCode}`;
  }
}

function validationResult(
  isValid: false,
  issue: string,
): { isValid: false; issue: string };
function validationResult(
  isValid: true,
  phone: string,
): { isValid: true; phone: string };

function validationResult(
  isValid: boolean,
  issueOrPhone: string,
): ValidationState {
  if (isValid) {
    return {
      isValid,
      phone: issueOrPhone,
    };
  } 

    return {
      isValid,
      issue: issueOrPhone,
    };
  
}
