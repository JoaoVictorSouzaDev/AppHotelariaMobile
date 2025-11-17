import { Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const RenderResetPassword = () => {
    
    const router = useRouter();

    return (
        <View style={global.screenContainer}> 

            <View style={global.divTurnLeft}> 
                <TouchableOpacity onPress={() => router.push("/(auth)")}> 
                    <MaterialCommunityIcons name="arrow-left" size={25} color="#4b0505" />
                </TouchableOpacity>
            </View> 

            <AuthContainer
                title="Grand Hotel Royal"
                subtitle="Esqueçeu a senha?"
                icon="hotel">

                <View style={global.divText}>
                    <Text style={global.text}>
                        Insira seu e-mail abaixo para receber o link de redefinição de senha.
                    </Text>
                </View>

                <TextField
                    label="E-mail"
                    icon="email"
                    placeholder="email@email.com"
                    keyboardType="email-address"
                />

                <TouchableOpacity style={[global.primaryButton]}>
                    <Text style={global.primaryButtonText}>Redefinir Senha</Text>
                </TouchableOpacity>

            </AuthContainer>

        </View>
    )
}

export default RenderResetPassword;