import React from "react";

type AuthProviderProps = {
    children: React.ReactNode
};

const AuthContext = React.createContext<{} | null>(null);


export const AuthProvider = ({ children }: AuthProviderProps) => {
    
    
    
    const value = {}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

};

// export const useAuth = useContext(AuthContext);



