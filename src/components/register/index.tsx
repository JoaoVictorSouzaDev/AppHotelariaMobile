import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useAuth } from "@/context/AuthContext";

const RenderRegister = () => {
    const { createAccount } = useAuth();
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!nome || !email || !senha || !cpf || !telefone) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        if (senha !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        try {
            setLoading(true);
            await createAccount(
                nome.trim(), 
                email.trim(), 
                senha.trim(), 
                cpf.replace(/\D/g, ''),
                telefone.replace(/\D/g, '')
            );

            Alert.alert("Sucesso", "Conta criada com sucesso!");
            router.replace("/(tabs)/explorer"); 
        } catch (erro: any) {
            Alert.alert("Erro", erro.message || "Falha ao tentar cadastrar!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={global.screenContainer}> 
            <View style={global.divTurnLeft}> 
                <TouchableOpacity onPress={() => router.back()}> 
                    <MaterialCommunityIcons name="arrow-left" size={25} color="#4b0505" />
                </TouchableOpacity>
            </View> 

            <AuthContainer
                title="Grand Hotel Royal"
                subtitle="Cadastrar"
                icon="hotel">

                <TextField
                    label="Nome Completo"
                    icon={{lib: "MaterialCommunityIcons", name: "account"}}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={setNome}
                />

                <TextField
                    label="E-mail"
                    icon={{lib: "MaterialCommunityIcons", name: "email"}}
                    placeholder="email@email.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <PasswordField
                    label="Senha"
                    placeholder="********"
                    value={senha}
                    onChangeText={setPassword}
                />

                <PasswordField
                    label="Confirme sua senha"
                    placeholder="********"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
                    value={telefone}
                    onChangeText={setTelefone}
                />

                <TouchableOpacity 
                    style={[global.primaryButton, loading && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={global.primaryButtonText}>Cadastrar-se</Text>
                    )}
                </TouchableOpacity>

            </AuthContainer>
        </View>
    );
}

export default RenderRegister;