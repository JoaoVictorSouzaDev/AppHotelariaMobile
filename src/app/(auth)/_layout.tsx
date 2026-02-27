import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {

    const {token, isLoading} = useAuth();

    if (isLoading) return null;

    if (token) {
        return <Redirect href="/(tabs)/explorer"/>
    }

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{ title: "Login"}}/>
            <Stack.Screen name="register" options={{ title: "Cadastro"}}/>
            <Stack.Screen 
                name="resetPassword"
                options={{ title: "Esqueci minha senha"}}
            /> 
        </Stack>
    )
}

export default AuthLayout;