import { auth, db } from "@/shared/config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

const codeNumerCountry = {
  russian: {
    flag: '😎',
    code: "+7",
    name: "Russian Federation",
    phoneNumberLength: 10,
  },
  ukraine: {
    flag: '🥴',
    code: "+380",
    name: "Ukraine",
    phoneNumberLength: 9,
  }
};




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

  const [phone, setPhone] = useState('');
  console.log(phone)


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
    <div className="w-full h-full flex flex-col justify-center">
      {/* <div id="recaptcha-container"></div> */}
      <div>
        <PhoneInput
          country={'us'}
          value={phone}
          containerStyle={{
            margin: '20px',
            height: '50px'
          }}
          inputStyle={{
            backgroundColor: 'transparent',
            height: '100%',
          }}
          onChange={phone => setPhone(phone)}
        />
      </div>

    </div>
  )
}
