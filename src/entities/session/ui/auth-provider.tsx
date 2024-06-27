import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Viewer } from "../../viewer/domain/viewer"
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<Viewer | null>(null)

export const useAuth = () => {
    return useContext(AuthContext)
}


export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const auth = getAuth()
    const navigation = useNavigate()
    const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                return
            }
            navigation('/signin')
        })
    }, [])



    const value = currentViewer

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
