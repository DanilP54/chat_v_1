import { useState } from "react"
import { AuthContext } from "./auth-context"
import { Viewer } from "../viewer/domain/viewer"

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)


    


    const value = null

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}