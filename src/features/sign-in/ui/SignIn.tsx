import { createNewUser } from "@/entities/user";
import { auth, db } from "@/shared/config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";



const registrationUser = async (uid: UserId) => {
  try {
    const registeredUser = createNewUser({
      firstName: "Danil",
      lastName: "Putro",
      avatar: null,
    })

    const docRef = await setDoc(doc(db, 'users', uid), registeredUser)
    return docRef
  } catch (error) {
    console.log(error)
  }
}

export default function SignIn() {

  const handleAuth = async () => {
    try {
      auth.settings.appVerificationDisabledForTesting = true;

      var phoneNumber = "+79935169017";
      var testVerificationCode = "998098";
      var appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container');

      const response = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      if (response) {
        const confirum = await response.confirm(testVerificationCode);
        const newDoc = await registrationUser(confirum.user.uid)
        console.log(newDoc);
      }
    } catch (error) {
      console.error("Error setting up authentication:", error);
    }
  }
  return (
    <div className="w-11">
      <div id="recaptcha-container"></div>
      
    </div>
  )
}
