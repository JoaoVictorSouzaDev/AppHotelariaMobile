import { Text, TouchableOpacity, View } from "react-native";
import  AuthContainer  from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import  TextField  from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const RenderRegister = () => {

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
                subtitle="Cadastrar"
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

                <PasswordField
                    label="Confirme sua senha"
                    placeholder="********"
                />

                <TextField
                    label="CPF"
                    icon="file-document"
                    placeholder="999.999.999-99"
                />

                <TextField
                    label="Telefone"
                    icon="phone"
                    placeholder="(99) 9999-9999"
                />

                <TouchableOpacity style={[global.primaryButton]}>
                    <Text style={global.primaryButtonText}>Cadastrar-se</Text>
                </TouchableOpacity>

            </AuthContainer>
        </View>
    )
}

export default RenderRegister;