/*Define o fluxo de navegação entre as telas de autentificação
Empilhamento de telas: Stack Navigator, 3 funções para manipular a sobreposição:
push(): empilha uma tela encima da outra
back(): retorna a tela anterior empilhada
replace(): substitui uma tela por outra*/

import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";

const AuthLayout = () => {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{ title: "Login"}}/>
            {/* <Stack.Screen name="register" options={{ title: "Cadastro"}}/> */}
            {/* <Stack.Screen name="ressetPassword options={{ title: "Esqueci minha senha"}}/> */}
        </Stack>
    )
}

export default AuthLayout;