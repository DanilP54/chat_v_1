import { auth, db } from "@/shared/config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import 'react-phone-input-2/lib/style.css'


const registrationUser = async (uid: UserId) => {
  try {
    const registeredUser = createViewer({
      firstName: "Danil",
      lastName: "Putro",
      avatar: undefined,
      userchats: [],
      blocked: []
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

      // if (response) {
      //   const confirum = await response.confirm(testVerificationCode);
      //   const newDoc = await registrationUser(confirum.user.uid)
      //   console.log(newDoc);
      // }
    } catch (error) {
      console.error("Error setting up authentication:", error);
    }
  }


  return (
    <></>
  )
}
