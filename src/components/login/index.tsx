import { Text, TouchableOpacity } from "react-native";
import  AuthContainer  from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import  TextField  from "../ui/TextField";
import { global } from "../ui/styles";



const RenderLogin = () => {
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

            <TouchableOpacity style={[global.primaryButton]}>
                <Text style={global.primaryButtonText}>Entrar</Text>
            </TouchableOpacity>


        </AuthContainer>

    )
}

export default RenderLogin;