import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";
import { Viewer } from "@/entities/viewer/viewer.model";




const AuthContext = createContext<User | undefined>(undefined)

export const useAuthState = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthState must be used within a CountProvider')
    }
    return context
}



export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)
    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    const value = undefined

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
