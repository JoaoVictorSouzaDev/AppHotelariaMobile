import React, { createContext, useState, useEffect, useMemo, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from  '../constants/api';
import { jwtDecode } from "jwt-decode";

type User = { id: number; nome: string; email: string; telefone?: string; cpf?: string; };

type AuthContextProps = {
    token: string | null;
    isLoading: boolean;
    user: User | null;
    signIn: (email: string, senha: string) => Promise<void>;
    signOut: () => void;
    createAccount: (nome: string, email: string, senha: string, cpf: string, telefone: string) => Promise<void>;
    searchRoom: (inicio: string, fim: string, qtdPessoas: number) => Promise<any[]>;
    updateClient: (id: number, data: object) => Promise<void>;
    createReserve: (pagamento: string, adicionais: number, quartos: any[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    (async () => {
        try {
            const storedToken = await AsyncStorage.getItem("token");
            const storedUser = await AsyncStorage.getItem("user");
            if (storedToken) setToken(storedToken);
            if (storedUser) setUser(JSON.parse(storedUser));
        } finally {
            setIsLoading(false);
        }
        })();
    }, []);

    //SignIn
    async function signIn(email: string, senha: string) {
        const res = await fetch(`${API_URL}/client/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });

        if (!res.ok) throw new Error('Erro no login');

        const tokenAPI = await res.json();

        const decoded: any = jwtDecode(tokenAPI);
        
        const userData = {
            id: decoded.id, 
            nome: decoded.nome || "", 
            email: decoded.email || ""
        };

        await AsyncStorage.setItem("token", tokenAPI);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        
        setToken(tokenAPI);
        setUser(userData);
    }

    //SingOut
    async function signOut() {
        await AsyncStorage.removeItem("token");
        setToken(null);
    }

    //CreateAccount
    async function createAccount(nome: string, email: string, senha: string, cpf: string, telefone: string) {
        const res = await fetch(`${API_URL}/client`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, cpf, telefone }),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || 'Erro ao criar conta');
        }
        const tokenAPI: string = await res.json();
        await AsyncStorage.setItem("token", tokenAPI);
        setToken(tokenAPI);
        
    }

    //Consultar Disponilidade 
    async function searchRoom(inicio: string, fim: string, qtdPessoas: number) {
        const res = await fetch(`${API_URL}/room`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inicio, fim, qtdPessoas }),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || err?.mensagem || 'Erro ao buscar quartos');
        }

        return await res.json();
    }
    
    //Update client
    async function updateClient(id: number, data: object) {
        try {
            const res = await fetch(`${API_URL}/client/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.erro || 'Erro ao atualizar dados');
            }

            const updatedUser = { ...user, ...data } as User;
            setUser(updatedUser);
            await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

            console.log("Sucesso:", result.mensagem);
        } catch (error: any) {
            console.error("ERRO NO UPDATE_CLIENT:", error);
            throw error;
        }
    }



    async function createReserve(pagamento: string, adicionais: number, quartos: any[]) {
        if (!token) throw new Error("Usuário não autenticado");

        try {
            const res = await fetch(`${API_URL}/reserve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // O token que você já tem no context
                },
                body: JSON.stringify({
                    pagamento,
                    adicionais,
                    quartos
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Erro ao realizar reserva');
            }

            return data;
        } catch (error: any) {
            console.error("Erro na reserva:", error);
            throw error;
        }
    }
    

    const value = useMemo (
        () => ({token, isLoading, signIn, signOut, createAccount, searchRoom, updateClient, user, createReserve}), [token, isLoading]
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