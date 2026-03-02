import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { global } from '@/components/ui/styles';
import AuthContainer from '../ui/AuthContainer';
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const RenderAccount = () => {

    const { signOut } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
      signOut();
      router.replace("/(auth)");
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState("João Victor Souza");
    const [email, setEmail] = useState("email@email.com");
    const [telefone, setTelefone] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View style={{ flex: 1 }}> 
            <View style={global.screenContainer}> 
                <AuthContainer
                    title="João Souza"
                    subtitle="Atualize seus dados abaixo"
                >
                    <TextField 
                        label="Nome" 
                        icon={{lib: "MaterialCommunityIcons", name: "account"}} 
                        placeholder="Nome completo" 
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

                    <TextField 
                        label="CPF" 
                        icon={{lib: "MaterialCommunityIcons", name: "file-document"}} 
                        placeholder="000.000.000-00" 
                        keyboardType="numeric"
                        isMasked={true}
                        type={'cpf'}
                        value={"000.000.000-00"}
                        style={{ color: "#9b9b9b" }}
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

                    <TouchableOpacity style={[global.secondaryButton]}>
                        <Text style={global.primaryButtonText}>Alterar Dados</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={global.passwordResetDeiv} 
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={global.passwordResetAccount}>Alterar minha senha</Text>
                    </TouchableOpacity>
                    
                    <View>
                        <TouchableOpacity onPress={handleLogout} style={{ alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={global.secondaryButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>

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
                            Alterar Senha
                        </Text>

                        <PasswordField 
                            label="Senha Atual" 
                            placeholder="Digite a senha atual" 
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />
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

export default RenderAccount;