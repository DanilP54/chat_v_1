import {
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
  } from "firebase/auth";
  import { auth } from "@/shared/config/firebase";

  export interface PhoneAuthProvider<T, E> {
    sendPhone(phone: string): Promise<T>;
    sendOtp(otp: string): Promise<E>;
  }
  
  export class PhoneAuthService {
    private confirmation: ConfirmationResult | null = null;
  
    async signIn(phone: string) {
      const appVerify = new RecaptchaVerifier(auth, "recaptcha-container");
  
      const result = await signInWithPhoneNumber(auth, phone, appVerify).catch(error => {
        console.log(error)
      });
  
      if (!result) {
        throw new Error("Error with signInWithPhoneNumber");
      }
  
      this.confirmation = result;


      // await fetch('http://localhost:9099/emulator/v1/projects/talkwave-bf8ef/verificationCodes').then(response => {
      //   const data = response.json()
      //   console.log(data)
      // }).catch((err) => {
      //   console.log(err)
      // })
  
      return result;
    }
    async verify(otp: string) {
      if (!this.confirmation) {
        throw new Error("No confirmation result");
      }
  
      const result = await this.confirmation.confirm(otp);
  
      if (!result) {
        throw new Error("Error with confirm");
      }
  
      this.confirmation = null;
      return result;
    }
  }