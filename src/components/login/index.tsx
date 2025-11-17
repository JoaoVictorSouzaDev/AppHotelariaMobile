import { Text, TouchableOpacity, View } from "react-native";
import  AuthContainer  from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import  TextField  from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";

const RenderLogin = () => {

    const router = useRouter();

    return (

        <AuthContainer
            title="Grand Hotel Royal"
            subtitle="Login"
            icon="hotel">

            <TextField
                label="E-mail"
                icon="email"
                placeholder="email@email.com"
                keyboardType="email-address"
            />

            <PasswordField
                label="Senha"
                placeholder="********"
            />

            <View>
                <Text style={global.defaultText}>
                    Não possui uma conta? {''}
                    <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                    <Text style={global.registerLinkText}>
                        Cadastre-se.
                    </Text>
                    </TouchableOpacity>
                </Text>
            </View>

            <TouchableOpacity style={[global.primaryButton]}>
                <Text style={global.primaryButtonText}>Entrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={global.passwordResetDeiv} onPress={() => router.push("/(auth)/resetPassword")}>
                <Text style={global.passwordReset}>Esqueci minha senha</Text>
            </TouchableOpacity>

        </AuthContainer>

    )
}

export default RenderLogin;