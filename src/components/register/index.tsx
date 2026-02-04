import { Text, TouchableOpacity, View } from "react-native";
import  AuthContainer  from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import  TextField  from "../ui/TextField";
import { global } from "../ui/styles";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from 'react';

const RenderRegister = () => {

    const [cpf, setCpf] = useState("");
    const router = useRouter();
    const [telefone, setTelefone] = useState("");

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
                    icon={{lib: "MaterialCommunityIcons", name: "email"}}
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
                    icon={{lib: "MaterialCommunityIcons", name: "file-document"}} 
                    placeholder="000.000.000-00" 
                    keyboardType="numeric"
                    isMasked={true}
                    type={'cpf'}
                    value={cpf}
                    onChangeText={setCpf}
                />

                <TextField 
                    label="Telefone" 
                    icon={{lib: "MaterialCommunityIcons", name: "phone"}} 
                    placeholder="(99) 99999-9999" 
                    keyboardType="numeric"
                    isMasked={true}
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                    value={telefone}
                    onChangeText={setTelefone}
                />

                <TouchableOpacity style={[global.primaryButton]}>
                    <Text style={global.primaryButtonText}>Cadastrar-se</Text>
                </TouchableOpacity>

            </AuthContainer>
        </View>
    )
}

export default RenderRegister;