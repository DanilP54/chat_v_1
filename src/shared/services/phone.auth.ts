import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/shared/config/firebase";
import { AuthorizatoinError } from "../lib/error";

export interface PhoneAuthProvider<T, E> {
  sendPhone(phone: string): Promise<T>;
  sendOtp(otp: string): Promise<E>;
}

export class PhoneAuthService {
  private confirmation: ConfirmationResult | null = null;

  async signIn(phone: string) {
    try {
      const appVerify = new RecaptchaVerifier(auth, "recaptcha-container");

      const result = await signInWithPhoneNumber(auth, phone, appVerify);

      this.confirmation = result;

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new AuthorizatoinError(error.message);
      }
    }
  }
  async verify(otp: string) {
    try {
      
      if (!this.confirmation) {
        throw new Error('No Confirmation')
      }

      const result = await this.confirmation.confirm(otp);

      this.confirmation = null;

      return result;
    
    } catch (error) {
      
      if(error instanceof Error) {
        throw new AuthorizatoinError(error.message)
      }
       
    }
  }
}
