import { Text, TouchableOpacity, View, Pressable } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import { global } from "../ui/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from 'react';

const RenderCodeVerification = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View style={{ flex: 1 }}> 
            <View style={global.screenContainer}> 
                <View style={global.divTurnLeft}> 
                    <TouchableOpacity onPress={() => router.push("/(auth)/resetPassword")}> 
                        <MaterialCommunityIcons name="arrow-left" size={25} color="#4b0505" />
                    </TouchableOpacity>
                </View> 

                <AuthContainer
                    title="Grand Hotel Royal"
                    subtitle="Esqueceu a senha?"
                    icon="hotel">

                    <View style={global.divText}>
                        <Text style={global.text}>
                            Insira o código de verificação enviado para o seu e-mail.
                        </Text>
                    </View>

                    <TextField
                        label="Codigo de verificação"
                        icon={{lib: "MaterialCommunityIcons", name: "lock"}}
                        placeholder="000000"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TouchableOpacity 
                        style={[global.primaryButton]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={global.primaryButtonText}>Inserir</Text>
                    </TouchableOpacity>
                </AuthContainer>
            </View>

            {modalVisible && (
                <View style={global.absoluteOverlay}>
                    <Pressable 
                        style={global.backgroundTap} 
                        onPress={() => setModalVisible(false)} 
                    />
                    
                    <View style={global.modalCard}>
                        <Text style={[global.title, { marginBottom: 20, textAlign: 'center' }]}>
                            Nova Senha
                        </Text>

                        <PasswordField 
                            label="Nova Senha" 
                            placeholder="Digite a nova senha" 
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <PasswordField 
                            label="Confirme a Nova Senha" 
                            placeholder="Confirme a nova senha" 
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity 
                            style={[global.secondaryButton, { marginTop: 25 }]}
                            onPress={() => {
                                setModalVisible(false);
                                router.push("/(auth)");
                            }}
                            
                        >
                            <Text style={global.primaryButtonText}>Confirmar Senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

export default RenderCodeVerification;