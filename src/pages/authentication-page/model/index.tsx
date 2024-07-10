import {
    useState,
    useContext,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction
} from "react";

type AuthProviderProps = {
    children: ReactNode;
};

type AuthContextType = {
    phoneNumber: string;
    otpCode: string;
    setPhoneNumber: Dispatch<SetStateAction<string>>;
    setOtpCode: Dispatch<SetStateAction<string>>;
};

const INITIAL_STATE: AuthContextType = {
    phoneNumber: '',
    otpCode: '',
    setPhoneNumber: () => { },
    setOtpCode: () => { }
};

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');

    const value = {
        phoneNumber,
        otpCode,
        setPhoneNumber,
        setOtpCode
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
