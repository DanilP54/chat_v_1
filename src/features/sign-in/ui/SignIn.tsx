import { auth } from "@/shared/config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


export default function SignIn() {

  const handleAuth = () => {
   
    try {
      auth.settings.appVerificationDisabledForTesting = true;

      var phoneNumber = "+79935169017";
      var testVerificationCode = "998098";
      var appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container');

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((res) => {
          console.log(res);
          return res.confirm(testVerificationCode);
        })
        .catch((error) => {
          console.error("Error during phone number sign-in:", error);
        });
    } catch (error) {
      console.error("Error setting up authentication:", error);
    }
  }

  return (
    <>
      <div id="recaptcha-container"></div>
      <button onClick={handleAuth} className="border border-black" >Signin</button>
    </>
  )
}
