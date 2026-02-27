import React, { createContext, useState, useEffect, useMemo, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from  '../constants/api';

type AuthContextProps = {
    token: string | null;
    isLoading: boolean;
    signIn: (email: string, senha: string) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem("token");
                if (stored) setToken(stored);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    async function signIn(email: string, senha: string) {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        })
        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || 'Credenciais inválidas');
        }

        const tokenAPI: string = await res.json();

        await AsyncStorage.setItem("token", tokenAPI);
        setToken(tokenAPI);
    }

    //SingOut
    async function signOut() {
        await AsyncStorage.removeItem("token");
        setToken(null);
    }

    const value = useMemo (
        () => ({token, isLoading, signIn, signOut}), [token, isLoading]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}

export default AuthProvider;