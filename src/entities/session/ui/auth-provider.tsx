import { Viewer } from "../../viewer/domain/viewer";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<Viewer | null>(null)

export const useAuth = () => {
    return useContext(AuthContext)
}


export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [currentViewer, setCurrentViewer] = useState<Viewer | null>(null)


    useEffect(() => {
        // запрос на сервер для получения данных о текущем пользователe

        

    }, [])

    const value = currentViewer

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
