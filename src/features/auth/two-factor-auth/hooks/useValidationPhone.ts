import { useRef } from "react"

type Error = {
    title: string,
    message: string
}

type ValidationStatusType = {
    isValid: boolean,
    error: Error
}

export const useValidationPhone = () => {

    const validationStatus = useRef<ValidationStatusType>({ isValid: false, error: { title: 'Неверный формат номера', message: 'Введите номер телефона' } })


    const checkValidPhone = (numberPhone: string, country: object) => {

        const checkPhoneFormat = country.format.match(/[.]/g)?.length === numberPhone.length
        const checkPhoneStart = numberPhone.startsWith(country.dialCode)

        if (!checkPhoneFormat && !checkPhoneStart) {
            validationStatus.current = {
                isValid: false,
                error: {
                    title: 'Неверный формат номера',
                    description: `Номер телефона должен начинаться с ${country.dialCode} и содержать ${country.format.match(/[.]/g)?.length} цифр`
                }
            }
            return false
        }

        if (!checkPhoneFormat) {
            validationStatus.current = {
                isValid: false,
                error: {
                    title: 'Неверный формат номера',
                    message: `Номер телефона должен содержать правильный формат`
                }
            }
            return false
        }

        if (!checkPhoneStart) {
            validationStatus.current = {
                isValid: false,
                error: {
                    title: 'Неверный формат номера',
                    message: `Номер телефона должен начинаться с +${country.dialCode}`
                }
            }
            return false
        }

        validationStatus.current = {
            isValid: true,
            error: {
                title: '',
                message: ''
            }
        }

        return true
    }



    return { ...validationStatus.current, checkValidPhone }


}