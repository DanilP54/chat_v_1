import { User, onAuthStateChanged } from "firebase/auth";
import { Viewer } from "../../viewer/domain/viewer";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/shared/config/firebase";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";

const AuthContext = createContext<User | undefined>(undefined)

export const useAuthState = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthState must be used within a CountProvider')
    }
    return context
}


const Loader = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <DotLoader color="hsla(239, 100%, 35%, 1)" />
        </div>
    )
}


export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [currentViewer, setCurrentViewer] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     console.log(user)
        //     if (user) {
        //         setCurrentViewer(user)
        //         navigate('/home')
        //         return
        //     }

        //     navigate('/signin')
        // })

        // return () => unsubscribe()
    }, [])

    const value = undefined

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
