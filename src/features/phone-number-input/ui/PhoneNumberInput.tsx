import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';

export default function PhoneNumberInput() {
  const [phone, setPhone] = useState('')
  return (
    <div>
      <PhoneInput
        country={'us'}
        value={phone}
        // containerStyle={{
        //   height: '50px',
        //   padding: 0,
        //   backgroundColor: 'transparent'
        // }}
        // inputStyle={{
        //   backgroundColor: 'transparent',
        //   height: '100%',
        //   border: 'none',
        //   borderBottom: '1px solid gray',
        //   borderRadius: 0
        // }}
        // buttonStyle={{
        //   backgroundColor: 'transparent',
        //   border: 'none',
        //   borderRadius: 0,
        //   borderBottom: '1px solid gray',
        // }}
        onChange={phone => setPhone(phone)}
      />
    </div>
  )
}
