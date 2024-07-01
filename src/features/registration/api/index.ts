import { auth } from "@/shared/config/firebase";
import { ActionCreators, Actions, SetStatusAction } from "@/shared/types";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, } from "firebase/auth";
import React, { SetStateAction } from "react";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier
        confirmationResult: ConfirmationResult
    }
}

auth.settings.appVerificationDisabledForTesting = true;


export const signInWithPhone = async (phoneNumber: string) => {
    try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'send-phone-number', {
            size: 'invisible'
        });
        const appVerifier = window.recaptchaVerifier

        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)

        if (confirmationResult) {
            window.confirmationResult = confirmationResult
            return true
        }

        throw new Error('Failed to send OTP')

    } catch (error) {
        console.log(error)
        return false
    }
}


export const sendOtp = async (code: string): Promise<boolean> => {
    try {
        const confirum = await window.confirmationResult.confirm(code)

        console.log(confirum)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

// const newDoc = await registrationUser(confirum.user.uid)

export const useUserAuthentication = (dispatch: React.Dispatch<Actions>, setStatus: ActionCreators["setStatus"]) => {

    async function signIn(phone: string) {
        try {
            dispatch(setStatus(true))
            const formatPhone = `+${phone}`
            const confirmationResult = await signInWithPhone(formatPhone)

            if (!confirmationResult) {
                throw new Error('Возникла ошибка')
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            dispatch(setStatus(false))
        }

    }


    function sendOtp(otp: string) {
        return sendOtp(otp)
    }


    function setUserInfo() {
        return
    }

    return { signIn, sendOtp }
} 