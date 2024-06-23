import { createContext, useContext } from "react";

type AuthProviderProps = {
    children: React.ReactNode
}





const AuthContext = createContext({})


export const AuthProvider = ({ children }: AuthProviderProps) => {
    const value = {}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = useContext(AuthContext)



