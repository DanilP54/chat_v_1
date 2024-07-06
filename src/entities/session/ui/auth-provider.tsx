import {User} from "firebase/auth";
import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {authService} from "../services/auth.service";
import {Viewer, viewerService} from "@/entities/viewer/viewer.model";


const AuthContext = createContext<User | undefined>(undefined)

export const useAuthState = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthState must be used within a CountProvider')
    }
    return context
}


export default function AuthProvider({children}: { children: React.ReactNode }) {

    const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = authService.onAuthState(async (viewer: User) => {
            try {
                if (viewer) {
                    const docRef = await viewerService.getViewerById(viewer.uid)
                    if (docRef) {
                        setCurrentViewer(docRef)
                        // navigate('/home')
                    }
                }
            } catch (error) {
                console.error(error)
            }
        })
        return () => unsubscribe()
    }, [])

    const value = undefined

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
