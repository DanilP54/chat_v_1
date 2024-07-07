import { User } from "firebase/auth";
import React, { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { viewerService } from "@/entities/viewer/interfaces/viewer.services";
import { Viewer } from "@/entities/viewer/viewer.model";


type AuthProviderProps = {
    viewer: Viewer | null;
    setIsProcessingAuth: React.Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthProviderProps | undefined>(undefined)

export const useAuthState = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthState must be used within a CountProvider')
    }
    return context
}


export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)
    const [isProcessingAuth, setIsProcessingAuth] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = authService.onAuthState(async (viewer: User) => {
            try {
                if (viewer && !isProcessingAuth) {
                    const docRef = await viewerService.getViewerById(viewer.uid)
                    if (docRef) {
                        setCurrentViewer(docRef)
                        navigate('/home')
                    }
                }
            } catch (error) {
                console.error(error)
            }
        })
        return () => unsubscribe()
    }, [])

    const value: AuthProviderProps = {
        viewer: currentViewer,
        setIsProcessingAuth,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
